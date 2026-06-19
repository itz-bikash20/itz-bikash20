import { useNavigate } from "react-router-dom";

function Dashboard() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/");
    };

    return (

        <div className="min-h-screen bg-gray-100">

            {/* Top Navbar */}

            <div className="bg-blue-700 text-white flex justify-between items-center px-8 py-5">

                <h1 className="text-3xl font-bold">
                    Enterprise GenAI
                </h1>

                <button
                    onClick={handleLogout}
                    className="bg-red-500 px-6 py-2 rounded-lg hover:bg-red-600"
                >
                    Logout
                </button>

            </div>

            <div className="flex">

                {/* Sidebar */}

                <div className="w-72 bg-slate-950 text-white min-h-screen p-6">

                    <h2 className="text-2xl mb-8">
                        Menu
                    </h2>

                    <ul className="space-y-5">

                        <li
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() => navigate("/dashboard")}
                        >
                            Dashboard
                        </li>

                        <li
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() => navigate("/chat")}
                        >
                            AI Chat
                        </li>

                        <li
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() => navigate("/upload")}
                        >
                            Upload Document
                        </li>

                        <li
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() => navigate("/rag")}
                        >
                            Document Assistant
                        </li>

                        <li
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() => navigate("/documents")}
                        >
                            My Documents
                        </li>

                        <li
                            className="cursor-pointer hover:text-blue-400"
                            onClick={() => navigate("/history")}
                        >
                            Chat History
                        </li>

                    </ul>

                </div>

                {/* Main Content */}

                <div className="flex-1 p-10">

                    {/* Welcome */}

                    <div className="bg-white rounded-xl shadow-md p-6 mb-8">

                        <h2 className="text-3xl font-bold">
                            Welcome Coder👋
                        </h2>

                        <p className="text-gray-600 mt-2">

                            Manage documents, interact with AI,
                            and retrieve information using RAG.

                        </p>

                    </div>

                    {/* Stats */}

                    <div className="grid md:grid-cols-3 gap-6">

                        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-500">

                            <h3 className="text-gray-500">
                                Total Users
                            </h3>

                            <h1 className="text-4xl font-bold mt-3">
                                1
                            </h1>

                        </div>

                        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-green-500">

                            <h3 className="text-gray-500">
                                Documents
                            </h3>

                            <h1 className="text-4xl font-bold mt-3">
                                2
                            </h1>

                        </div>

                        <div className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-yellow-500">

                            <h3 className="text-gray-500">
                                Queries
                            </h3>

                            <h1 className="text-4xl font-bold mt-3">
                                15
                            </h1>

                        </div>

                    </div>

                    {/* Recent Activity */}

                    <div className="bg-white shadow-lg rounded-xl p-6 mt-10">

                        <h2 className="text-2xl font-bold mb-5">

                            Recent Activity

                        </h2>

                        <ul className="space-y-4">

                            <li>
                                📄 company_policy.pdf uploaded
                            </li>

                            <li>
                                🤖 Asked:
                                How many leaves are allowed?
                            </li>

                            <li>
                                📄 sample.pdf uploaded
                            </li>

                        </ul>

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Dashboard;