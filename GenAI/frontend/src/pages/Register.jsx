import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [username, setUsername] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleRegister =
        async () => {

            try {

                await api.post(
                    "/auth/register",
                    {
                        username,
                        email,
                        password
                    }
                );

                alert(
                    "Registration Successful"
                );

                navigate("/");

            } catch (error) {

                console.error(error);

                alert(
                    "Registration Failed"
                );
            }
        };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

                <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
                    Enterprise GenAI
                </h1>

                <h2 className="text-xl font-semibold text-center mb-6">
                    Register
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full border rounded-lg p-3 mb-4"
                />

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
                    onClick={handleRegister}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                >
                    Register
                </button>

                <button
                    onClick={() => navigate("/")}
                    className="w-full mt-3 border border-gray-400 py-3 rounded-lg"
                >
                    Back to Login
                </button>

            </div>

        </div>
    );
}

export default Register;