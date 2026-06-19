import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

            alert("Invalid Credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Enterprise GenAI
                </h1>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Login
                </h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                    Login
                </button>

                <p className="text-center mt-4">
                    Don't have an account?
                </p>

                <button
                    onClick={() => navigate("/register")}
                    className="w-full mt-2 border border-blue-600 text-blue-600 py-3 rounded-lg hover:bg-blue-50"
                >
                    Register
                </button>

            </div>

        </div>
    );
}
export default Login;