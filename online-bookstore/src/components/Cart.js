import React, {useState} from "react";

const Cart = () => {
    const[cart, setCart] = useState([]);

    const addToCart = (bookList) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === bookList.id);
            if(existingItem){
                return prevCart.map((item) =>
                item.bookList.id === bookList.id ? {...item, quantity: item.quantity + 1} : item);
            }else{
                return [...prevCart, {bookList, quantity: 1}];
            }
        });
    }

    const removeFromCart = (bookId) => {
        setCart((prevCart) => prevCart.filter((item) => item.book.id !== bookId));
    }

    const updateQuantity = (bookId, newQuantity) => {
        setCart((prevCart) => prevCart.map((item) =>
            item.book.id === bookId ? {...item, quantity: newQuantity} : item));
    }

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
                <h3>Total: ${cart.reduce((total, item) => total + item.book.price * item.quantity, 0)}</h3>
                <button>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;