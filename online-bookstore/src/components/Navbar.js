import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({onLogout}) => {
    return(
        <nav>
            <h1>Online Bookstore</h1>
            <Link to={"/books"}>Books</Link>
            <Link to={"/cart"}>Cart</Link>
            <button onClick={onLogout}>Logout</button>
        </nav>
    );
};

export default Navbar;
