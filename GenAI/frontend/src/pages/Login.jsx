import { useState } from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import PasswordInput from "../components/ui/PasswordInput";
import GlassCard from "../components/ui/GlassCard";

import { login } from "../api/auth";
function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        remember: false
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

    };

    const handleLogin = async () => {

        if (!formData.email.trim()) {

            toast.error("Please enter your email");

            return;
        }

        if (!formData.password.trim()) {

            toast.error("Please enter your password");

            return;
        }

        try {

            setLoading(true);

            const response = await login({

                email: formData.email,

                password: formData.password

            });

            localStorage.setItem(
                "token",
                response.access_token
            );

            toast.success("Welcome Back!");

            navigate("/dashboard");

        }

        catch (err) {

            toast.error(

                err?.response?.data?.detail ||

                "Invalid Credentials"

            );

        }

        finally {

            setLoading(false);

        }

    };

    const handleKeyDown = (e) => {

        if (e.key === "Enter") {

            handleLogin();

        }

        if (e.key === "Escape") {

            setFormData({

                email: "",

                password: "",

                remember: false

            });

        }

    };

    return (

        <div className="login-page">

            <motion.div

                initial={{
                    opacity:0,
                    y:50
                }}

                animate={{
                    opacity:1,
                    y:0
                }}

                transition={{
                    duration:.6
                }}

            >

                <GlassCard className="login-card">

                    <div className="login-logo">

                        <Bot size={40}/>

                    </div>

                    <h1 className="login-title">

                        Enterprise GenAI

                    </h1>

                    <p className="login-subtitle">

                        AI Powered Knowledge Platform

                    </p>

                    <Input

                        label="Email"

                        name="email"

                        placeholder="Enter your email"

                        value={formData.email}

                        onChange={handleChange}

                        onKeyDown={handleKeyDown}

                    />

                    <PasswordInput

                        label="Password"

                        name="password"

                        placeholder="Enter your password"

                        value={formData.password}

                        onChange={handleChange}

                        onKeyDown={handleKeyDown}

                    />

                    <div className="login-options">

                        <div className="checkbox-row">

                            <input

                                type="checkbox"

                                name="remember"

                                checked={formData.remember}

                                onChange={handleChange}

                            />

                            <label>

                                Remember Me

                            </label>

                        </div>

                        <span className="forgot-password">

                            Forgot Password?

                        </span>

                    </div>

                    <Button

                        loading={loading}

                        onClick={handleLogin}

                    >

                        Login

                    </Button>

                    <div className="login-footer">

                        Don't have an account?

                        {" "}

                        <span

                            onClick={()=>

                                navigate("/register")

                            }

                        >

                            Register

                        </span>

                    </div>

                </GlassCard>

            </motion.div>

        </div>

    );

}

export default Login;