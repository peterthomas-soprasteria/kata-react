import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import BookList from "./components/BookList";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import axios from "axios";

const App = () => {
    const [cart, setCart] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("jwtToken"));

    const fetchCart = async () => {
        const token = localStorage.getItem("jwtToken");
        try {
            const response = await axios.get("http://localhost:8080/cart", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCart(response.data.cartItems);
        }catch (error) {
            console.error("An error occurred while fetching cart", error);
        }
    };

    useEffect(() => {
        const fetchCarData = async () => {
            if(isAuthenticated){
                await fetchCart();
            }
        }
    }, [isAuthenticated]);

    const addToCart = async (book) => {
        const token = localStorage.getItem("jwtToken");
        try{
            const response = await axios.post("http://localhost:8080/cart/add", {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        bookId: book.id,
                        quantity: 1,
                    }
                });
            setCart(response.data.cartItems);
        }catch(error){
            console.error("An error occurred while adding to cart", error);
        }
    };

    const updateCartItem = async (bookId, quantity) => {
        const token = localStorage.getItem("jwtToken");
        try {
            const response = await axios.put("http://localhost:8080/cart/update", {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    bookId,
                    quantity,
                }
            });
            setCart(response.data.cartItems);
        }catch (error) {
            console.error("An error occurred while updating cart item", error);
        }
    };

    const removeFromCart = async (bookId) => {
        const token = localStorage.getItem("jwtToken");
        try {
            const response = await axios.delete(`http://localhost:8080/cart/remove`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    bookId
                }
            });
            setCart(response.data.cartItems);
        }catch (error) {
            console.error("An error occurred while removing from cart", error);
        }
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        setIsAuthenticated(false);
    }

    return (
        <Router>
            {isAuthenticated && <Navbar onLogout={handleLogout}/>}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/books" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login onLogin={handleLogin}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/books" element={
                    <ProtectedRoute>
                        <BookList addToCart={addToCart} />
                    </ProtectedRoute>
                } />
                <Route path="/cart" element={
                    <ProtectedRoute>
                        <Cart cart={cart} setCart={setCart} fetchCart={fetchCart} updateCartItem={updateCartItem} removeFromCart={removeFromCart}/>
                    </ProtectedRoute>
                } />
                <Route path="/orders" element={
                    <ProtectedRoute>
                        <Orders />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
};

export default App;
