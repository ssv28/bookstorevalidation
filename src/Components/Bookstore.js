import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Bookstore = () => {
    const [userBooks, setUserBooks] = useState([]);
    const [formState, setFormState] = useState({ bookname: '', bookno: '' });
    const [Edit, setEdit] = useState(false);
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        const logInUser = JSON.parse(localStorage.getItem('logInUser'));
        const allBooks = JSON.parse(localStorage.getItem('books')) || [];

        if (logInUser) {
            const books = allBooks.filter(book => book.userEmail === logInUser.email);
            console.log(books);
            
            setUserBooks(books);
            setFormState({ ...formState, userEmail: logInUser.email });
        }
    }, []);

    const saveBook = (books) => {
        console.log(books);
        
        const allBooks = JSON.parse(localStorage.getItem('books')) || [];
        const updateBook = allBooks.filter(book => book.userEmail !== formState.userEmail).concat(books);
        localStorage.setItem('books', JSON.stringify(updateBook));
    };

    const bookSubmit = (e) => {
        e.preventDefault();

        if (Edit) {
            const updateBook = userBooks.map((book, index) =>
                index === editIndex ? { ...formState } : book
            );
            setUserBooks(updateBook);
            saveBook(updateBook);
            setEdit(false);
            setEditIndex(null);
        } else {
            const newBooks = [...userBooks, { ...formState }];
            setUserBooks(newBooks);
            saveBook(newBooks);
        }

        setFormState({ bookname: '', bookno: '' });
    };

    const bookDelete = (index) => {
        console.log(index);
        
        const updateBook = userBooks.filter((_, i) => i !== index);
        setUserBooks(updateBook);
        saveBook(updateBook);
    };

    const bookEdit = (index) => {
        console.log(index);

        setFormState(userBooks[index]);
        setEdit(true);
        setEditIndex(index);
    };

    return (
        <div>
            <h1>BOOK STORE</h1>

            <form onSubmit={bookSubmit}>
                Book Name : <input
                    type="text"
                    placeholder="bookname"
                    value={formState.bookname}
                    onChange={(e) => setFormState({ ...formState, bookname: e.target.value })}
                    required
                /><br/><br/>
                Book Number :  <input
                    type="number"
                    placeholder="bookno"
                    value={formState.bookno}
                    onChange={(e) => setFormState({ ...formState, bookno: e.target.value })}
                    required
                /><br/><br/>
                <Button type="submit" variant='contained'>
                    {
                        Edit ? 'Update Book' : 'Add Book'
                    }
                </Button>
            </form>



            <table border="1" style={{ width: "50%", marginTop: "20px" }}>

                <tr>
                    <th>Book Name</th>
                    <th>Book no</th>
                    <th>Delete</th>
                    <th>Update</th>

                </tr>


                {
                    userBooks.map((book, index) => (
                        <tr key={index}>
                            <td>{book.bookname}</td>
                            <td>{book.bookno}</td>
                            <td><button onClick={() => bookEdit(index)}>Edit</button></td>
                            <td><button onClick={() => bookDelete(index)}>Delete</button></td>
                        </tr>
                    ))
                }

            </table>


        </div>
    );
};

export default Bookstore;
