import { WebSocketServer, WebSocket } from "ws";

// Create a WebSocket server on port 8080
const wss = new WebSocketServer({ port: 8080 });

// Track connected users
const users = new Map(); // Map to store user_id -> socket
let userCount = 0;

wss.on("connection", (socket) => {
  // Assign a unique user ID to this connection
  const userId:string = generateUserId();
  userCount++;
  
  // Store the user in our map
  users.set(userId, {
    socket: socket,
    username: `User_${userId}` // Default username
  });
  
  console.log(`User connected. ID: ${userId}. Total users: ${userCount}`);

  // Send the user their ID so they know who they are
  socket.send(JSON.stringify({
    type: "connection_established",
    userId: userId,
    message: "You are now connected to the chat server"
  }));

  // Broadcast the updated user count to all clients
  broadcastUserCount();

  // Handle messages from the client
  socket.on("message", (rawMessage) => {
    try {
      const messageData = JSON.parse(rawMessage.toString());
      console.log("Received:", messageData);
      
      // Handle different message types
      switch (messageData.type) {
        case "chat_message":
          // Add sender information to the message
          const fullMessage = {
            type: "chat_message",
            userId: userId,
            username: users.get(userId).username,
            content: messageData.content,
            timestamp: new Date().toISOString()
          };
          
          // Broadcast the message to all other clients
          broadcastMessage(fullMessage, userId);
          break;
          
        case "set_username":
          // Update the user's username
          if (users.has(userId)) {
            users.get(userId).username = messageData.username;
            
            // Notify everyone about the username change
            broadcastMessage({
              type: "username_changed",
              userId: userId,
              username: messageData.username
            });
          }
          break;
          
        default:
          console.log(`Unknown message type: ${messageData.type}`);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  });

  // Handle client disconnection
  socket.on("close", () => {
    userCount--;
    console.log(`User disconnected. ID: ${userId}. Total users: ${userCount}`);
    
    // Remove user from our map
    users.delete(userId);

    // Broadcast the updated user count to all clients
    broadcastUserCount();
    
    // Notify other users about the disconnection
    broadcastMessage({
      type: "user_left",
      userId: userId,
      timestamp: new Date().toISOString()
    });
  });

  // Handle errors
  socket.on("error", (error) => {
    console.error(`WebSocket error for user ${userId}:`, error);
  });
  
  // Notify other users about the new user
  broadcastMessage({
    type: "user_joined",
    userId: userId,
    username: users.get(userId).username,
    timestamp: new Date().toISOString()
  }, userId);
});

// Function to broadcast the user count to all connected clients
function broadcastUserCount() {
  const data = JSON.stringify({ 
    type: "user_count", 
    count: userCount 
  });
  
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
}

// Function to broadcast a message to all or specific clients
function broadcastMessage(message:any , excludeUserId: string | null = null) {
  const messageStr = JSON.stringify(message);
  
  // Iterate through our users Map
  users.forEach((user, userId) => {
    // Skip the sender if excludeUserId is provided
    if (excludeUserId && userId === excludeUserId) {
      return;
    }
    
    // Send the message if socket is open
    if (user.socket.readyState === WebSocket.OPEN) {
      user.socket.send(messageStr);
    }
  });
}

// Helper function to generate a unique user ID
function generateUserId() {
  return Math.random().toString(36).substring(2, 10);
}

console.log("WebSocket chat server is running on ws://localhost:8080");