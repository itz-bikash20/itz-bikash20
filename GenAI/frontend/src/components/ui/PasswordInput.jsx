import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import "./Input.css";

function PasswordInput({

    label,

    ...props

}) {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <div className="input-group">

            <label>

                {label}

            </label>

            <div className="password-wrapper">

                <input

                    type={showPassword ? "text" : "password"}

                    {...props}

                />

                <button

                    type="button"

                    className="eye-btn"

                    onClick={() =>
                        setShowPassword(!showPassword)
                    }

                >

                    {showPassword ? (

                        <EyeOff size={18}/>

                    ) : (

                        <Eye size={18}/>

                    )}

                </button>

            </div>

        </div>

    );

}

export default PasswordInput;