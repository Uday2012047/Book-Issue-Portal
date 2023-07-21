import React, { useState } from "react";
import { useSession, getSession } from "next-auth/react";
import axios from "axios";

function Books() {
    const { data: session } = useSession();
    if (session.user.role !== "librarian") {
        return (
            <div>
                <h1>Access Denied</h1>
            </div>
        );
    }
    const [studentid, setStudentid] = useState("")
    const [message, setMessage] = useState("")
    const [student, setStudent] = useState("")
    const [bookid, setBookid] = useState("")
    const [bookname, setBookname] = useState("")
    const [duemonth, setDuemonth] = useState("")
    const [books, setBooks] = useState([])
    console.log(books)
    const searchStudent = (id) => {
        const url = `http://localhost:3000/api/getstudent/?id=${id}`;
        return axios.get(url).then((response) => {
            setMessage(response?.data?.error);
            if (response?.data?.error !== "No student found") {
                setMessage("");
                setBooks(response.data.data);
                setStudent(studentid)
            }
        });
    }
    const addBook = async (e) => {
        if (bookname === "" || duemonth === "" || bookid === "") {
            setMessage("Please enter all details");
            return;
        }
        const ph = await axios.get(
            `http://localhost:3000/api/getstudentnumber/?username=${student}`
        );
        const phone = ph.data.phone;
        const number = "91" + phone
        const chatid = `${number}@c.us`
        const msg = `You have issued book ${bookname}. It is due on ${duemonth}`
        const res = await fetch("https://api.green-api.com/waInstance7103832087/sendMessage/9037e1378e404f429d9b24934c7282c7786a8e8a0ef14ee294", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatId: chatid,
                message: msg,
            }),
        });
        const newBook = {
            name: bookname,
            bookid,
            studentid: student,
            duemonth,
        };
        const saveResponse = await fetch("/api/addbook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });
        let datat = await saveResponse.json();
        if (datat.message) {
            setMessage(datat.message);
        }
        if (datat.message === "Book added successfully.") {
            setMessage("");
        }
        searchStudent(student)
    }
    const deleteBook = async (bookidd) => {
        const newBook = {
            bookid: bookidd,
            studentid: student,
        };
        const saveResponse = await fetch("/api/deletebook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
        });
        const ph = await axios.get(
            `http://localhost:3000/api/getstudentnumber/?username=${student}`
        );
        const phone = ph.data.phone;
        const number = "91" + phone
        const chatid = `${number}@c.us`
        const msg = `You have returned book ${bookname}.`
        const res = await fetch("https://api.green-api.com/waInstance7103832087/sendMessage/9037e1378e404f429d9b24934c7282c7786a8e8a0ef14ee294", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                chatId: chatid,
                message: msg,
            }),
        });
        searchStudent(student)
    }
    return (
        <div>
            <div>

                <input
                    placeholder="Enter Student ID"
                    name="studentid"
                    type="text"
                    onChange={(e) => setStudentid(e.target.value)}
                />
                <button
                    type="submit"
                    onClick={(e) => searchStudent(studentid)}
                >
                    Search
                </button>
                <p>{message}</p>
            </div>
            {student && <div className="maiiinnn">
                <div className="book list">
                    <h2>Issued books</h2>
                    {books?.map((book) => (
                        <div><p>{book.name}</p>
                            <button
                                type="submit"
                                onClick={(e) => deleteBook(book.bookid)}
                            >
                                Delete Book
                            </button>
                        </div>

                    ))}
                </div>
                <div>
                    <h2>Add book</h2>
                    <input
                        placeholder="Enter Book Name"
                        name="bookname"
                        type="text"
                        onChange={(e) => setBookname(e.target.value)}
                    />
                    <input
                        placeholder="Enter Book ID"
                        name="bookid"
                        type="text"
                        onChange={(e) => setBookid(e.target.value)}
                    />
                    <input
                        placeholder="Enter Due month in MM/YYYY"
                        name="duemonth"
                        type="text"
                        onChange={(e) => setDuemonth(e.target.value)}
                    />
                    <p>{message}</p>
                    <button
                        type="submit"
                        onClick={(e) => addBook(e)}
                    >
                        Add Book
                    </button>
                </div>
            </div>}
        </div>
    )
}

export default Books
export async function getServerSideProps(context) {
    const session = await getSession(context);

    return {
        props: {
            session,
        },
    };
}
