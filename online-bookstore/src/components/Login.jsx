import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({onLogin}) => {
    const[username, setUsername] = useState("");
    const[password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/auth/login", {
                username,
                password,
            });

            const token = response.data.token;
            localStorage.setItem("jwtToken", token);

            onLogin();

            navigate("/books");
        }catch (error) {
            setErrorMessage("Invalid username or password");
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <p>Not registered? <a href="/register">Register here</a></p>
        </div>
    );
};

export default Login;