import { Link } from "react-router-dom";

function Sidebar() {

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">

      <h2 className="text-lg mb-6">
        Menu
      </h2>

      <ul className="space-y-4">

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/chat">
            AI Chat
          </Link>
        </li>
          <li>
         <Link to="/upload">
      Upload Document
  </Link>
</li>
<li>
    <Link to="/rag">
        Document Assistant
    </Link>
</li>
      </ul>

    </div>
  );
}

export default Sidebar;