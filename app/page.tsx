import Landingpage from "./components/Landingpage";

export default function Home() {
  return (
    <div className="bg-white min-h-screen">
      <nav className="flex justify-between items-center p-4 bg-gray-100">
        <div className="text-blue-600 text-4xl font-serif pl-28">Attendease</div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
      </nav>
      <Landingpage/>
    </div>
  );
}
