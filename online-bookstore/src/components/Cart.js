import React, {useState} from "react";

const Cart = ({cart, setCart}) => {
    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId));
    }

    const updateQuantity = (bookId, newQuantity) => {
        setCart((prevCart) => prevCart.map((item) =>
            item.book.id === bookId ? {...item, quantity: newQuantity} : item));
    }

    const totalPrice = cart.reduce((total, item) => total + item.book.price * item.quantity, 0);

    return(
        <div>
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map((item)=>(
                    <li key={item.book.id}>
                        <p>{item.book.title} - {item.quantity} x ${item.book.price}</p>
                        <button onClick={() => removeFromCart(item.book.id)}>Remove from Cart</button>
                        <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.book.id, e.target.value)} />
                    </li>
                ))}
            </ul>
            <div>
                <h3>Total: ${totalPrice}</h3>
                <button>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;