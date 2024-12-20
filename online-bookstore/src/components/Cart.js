import React, {useEffect} from "react";
import axios from "axios";

const Cart = ({cart, setCart, fetchCart,updateCartItem, removeFromCart}) => {

    useEffect(() => {
        fetchCart();
    }, []);

    const handleQuantityChange = (bookId, quantity) => {
        if(quantity < 1){
            removeFromCart(bookId);
        }else{
            updateCartItem(bookId, quantity);
        }
    }

    const totalPrice = cart.reduce((total, item) => total + item.book.price * item.quantity, 0);

    const handleCheckout = async () => {
        const token = localStorage.getItem("jwtToken");

        try {
            const orderData = {
                items: cart.map((item) => ({
                    bookId: item.book.id,
                    quantity: item.quantity,
                })),
                total: totalPrice,
            };

            await axios.post("http://localhost:8080/cart/checkout", orderData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            alert("Order placed successfully! 🙈");
            setCart([]);
        } catch (error) {
            console.log("An error occurred while placing the order", error);
            alert("An error occurred while placing the order");
        }
    };

    return(
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.length === 0 && <p>Your cart is empty</p>}
                {cart.map((item)=>(
                    <li key={item.book.id}>
                        <div>{item.book.title} - {item.quantity} x ${item.book.price}</div>
                        <button onClick={() => removeFromCart(item.book.id)}>Remove from Cart</button>
                        <button onClick={() => handleQuantityChange(item.book.id, item.quantity - 1)}>-</button>
                        <button onClick={() => handleQuantityChange(item.book.id, item.quantity + 1)}>+</button>
                    </li>
                ))}
            </ul>
            <div>
                <h3>Total: ${totalPrice.toFixed(2)}</h3>
                <button onClick={handleCheckout} disabled={cart.length===0}>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;