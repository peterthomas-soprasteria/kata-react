import React, {useState, useEffect} from 'react';
import axios from "axios";
import '../styles/BookList.css'

const BookList = ({addToCart}) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");

        axios
            .get("http://localhost:8080/books" , {
                headers: {
                Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setBooks(response.data))
            .catch((error) => {
                if (error.response.status === 401) {
                    alert("Session expired, please login again");
                    window.location.href = "/login";
                }else{
                    console.error("An error occurred while fetching books", error);
                }
            });
    }, []);

    return (
        <div>
            <h2>Available Books</h2>
            <div className="book-list">
                {books.map((book) => (
                    <div key={book.id} className="book-item">
                        <h3>{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>Price: ${book.price}</p>
                        <button onClick={() => addToCart(book)}>Add to Cart</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;