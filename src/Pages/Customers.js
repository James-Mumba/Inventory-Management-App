import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { app, db } from "../Firebase";
import { useNavigate } from "react-router";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

import Table from "react-bootstrap/Table";
import { collection, doc, getDocs, setDoc, where } from "firebase/firestore";
import { query } from "firebase/firestore";
// import Inventory from "./Inventory";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useRef } from "react";

function Customers() {
  //
  // Adding users in firestore from customres page
  const auth = getAuth(app);
  const navigate = useNavigate();

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  function add() {
    const person = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(auth, email, password).then(
      (usercredential) => {
        const userId = usercredential.user.uid;
        console.log(userId);

        const guests = doc(collection(db, "customers-Data"));

        setDoc(guests, {
          user: person,
          email: email,
          userId: userId,
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      }
    );
  }
  //code for checking if user is logged in

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  }); //if the user is not logged in, navigate the user to the log in page

  // Fetching the users data

  const [user, setUser] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        // setUser(user);

        const fetchData = async () => {
          const q = query(
            collection(db, "customers-Data"),
            where("userId", "==", userId)
          );
          let customersNames = [];
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((customersDoc) => {
            customersNames.push({
              id: customersDoc.id,
              ...customersDoc.data(),
            });
            setUser(customersNames);
          });
        };
        fetchData();
        // console.log(customersNames);
      }
    });
  }, []);

  return (
    <div className="Customers">
      <Sidebar />
      <div className="greet">
        <Navbar />
        <div className="temp">
          <Button variant="primary" onClick={handleShow}>
            Add Users
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Add New User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="name">User Name</label>
              <br />
              <input type="text" id="name" ref={nameRef} />
              <br />
              <label htmlFor="Email">Email</label>
              <br />
              <input type="email" id="email" ref={emailRef} />
              <br />
              <label htmlFor="password">Password</label>
              <br />
              <input type="password" id="password" ref={passwordRef} />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={add}>
                Register
              </Button>
            </Modal.Footer>
          </Modal>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {user.map((customersDoc) => (
                <tr key={customersDoc.id}>
                  <td>{customersDoc.user}</td>
                  <td>{customersDoc.email}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <ul>
            {user.map((customersDoc) => (
              <li key={customersDoc.id}>{customersDoc.user}</li>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
}

export default Customers;
