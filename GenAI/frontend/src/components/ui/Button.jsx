import "./Button.css";

function Button({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    className = "",
}) {
    return (
        <button
            type={type}
            disabled={disabled || loading}
            onClick={onClick}
            className={`primary-btn ${className}`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;