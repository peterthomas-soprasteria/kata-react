import React,{useState} from "react";
import BookList from "./components/BookList";
import Cart from "./components/Cart";

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (book) => {
        setCart((prevCart) => {
          const existingItem = prevCart.find((item) => item.id === book.id);
          if(existingItem){
            return prevCart.map((item) =>
            item.book.id === book.id ? {...item, quantity: item.quantity + 1} : item);
          }else{
            return [...prevCart, {book, quantity: 1}];
          }
        });
    }

    return (
        <div>
            <h1>Online Bookstore</h1>
            <BookList addToCart={addToCart} />
            <Cart cart={cart} setCart={setCart}/>
        </div>
    );
}

export default App;
