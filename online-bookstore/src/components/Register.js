import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/auth/register", {
                username,
                password,
            });

            setSuccessMessage("User registered successfully");
            setErrorMessage("");
            setTimeout(() => navigate("/login"), 2000);
        }catch (error) {
            setErrorMessage("An error occurred while registering the user");
            setSuccessMessage("");
        }
    }

    return(
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            {successMessage && <p>{successMessage}</p>}
            <p>
                Already registered? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Register;