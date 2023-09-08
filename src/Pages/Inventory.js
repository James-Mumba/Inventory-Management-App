import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { app, db } from "../Firebase";
import { useNavigate } from "react-router";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useRef } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//

// import swal from "sweetalert";
// import { text } from "@fortawesome/fontawesome-svg-core";
// import { text } from "@fortawesome/fontawesome-svg-core";

function Inventory() {
  //code for checking if user is logged in
  const auth = getAuth(app);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  }); //if the user is not logged in, navigate the user to the log in page
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //
  // FETCHING DATA FROM FIRESTORE
  //

  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;

        const fetchData = async () => {
          const q = query(
            collection(db, "inventory-Data"),
            where("userId", "==", userId)
          );
          let inventoryItems = [];
          const querySnapshot = await getDocs(q);

          querySnapshot.forEach((inventoryDoc) => {
            inventoryItems.push({
              id: inventoryDoc.id,
              ...inventoryDoc.data(),
            });
            setInventory([...inventoryItems]);
          });
        };
        fetchData();
      }
    });
  }, []);

  //
  // STATRT OF DELETE
  const deleteEntry = async (id) => {
    toast("Deleting...");
    try {
      const docid = id;

      await deleteDoc(doc(db, "inventory-Data", docid));
      toast("Deleted!");
      window.location.reload();
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  // Sending data to firestore
  const nameRef = useRef();
  const amountRef = useRef();
  const quantityRef = useRef();

  function send() {
    const Name = nameRef.current.value;
    const Amount = amountRef.current.value;
    const Quantity = quantityRef.current.value;
    const Total = Amount * Quantity;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userId = user.uid;
        console.log(userId);

        const newInventory = doc(collection(db, "inventory-Data"));

        setDoc(newInventory, {
          userId: userId,
          Name: Name,
          Amount: Amount,
          Quantity: Quantity,
          Total: Total,
        })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      }
    });
  }
  // fetching

  //
  // UPDATE INVENTORY
  const [update, updateShow] = useState(false);
  const handleUpdateClose = () => updateShow(false);
  const handleUpdateShow = () => updateShow(true);

  // const updateEntry = async (id, newData) => {
  //   try {
  //     const docRef = doc(db, "inventory-Data", id);

  //     await updateDoc(docRef, newData);
  //     window.location.reload();
  //   } catch (error) {
  //     const errorMessage = error.message;
  //     console.log(errorMessage);
  //   }
  // };

  const updateInventory = async (id, newData) => {
    toast("Updating...");
    try {
      const docid = id;

      const docRef = doc(db, "inventory-Data", docid);

      await updateDoc(docRef, newData);
      toast("Successfully!!!");
      window.location.reload();
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
    handleUpdateShow();

    window.updateInventory = function () {
      const Name = nameRef.current.value;
      const Amount = amountRef.current.value;
      const Quantity = quantityRef.current.value;
      const Total = Amount * Quantity;

      const updateInventory = doc(db, "inventory-Data", id);
      updateDoc(updateInventory, {
        Name: Name,
        Amount: Amount,
        Quantity: Quantity,
        Total: Total,
      })
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    };
  };
  //END OF UPDATE INVENTORY
  //

  return (
    <div className="inventory">
      <Sidebar />
      <div className="greet">
        <Navbar />
        <div className="temp">
          <Button variant="primary" onClick={handleShow}>
            Launch static backdrop modal
          </Button>

          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* Same as */}
          <ToastContainer />

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Inventory Management System</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="name">Name</label>
              <br />
              <input type="text" id="name" ref={nameRef} />
              <br />
              <label htmlFor="amount">Amount</label>
              <br />
              <input type="number" id="number" ref={amountRef} />
              <br />
              <label htmlFor="quantity">No. of pcs</label>
              <br />
              <input type="number" id="qty" ref={quantityRef} />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={send}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>
          {/*  */}
          {/* SECOND MODAL WITH THE UPDATE FUNCTION */}
          {/*  */}
          <Modal
            show={update}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Inventory Management System Update</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="name">Name</label>
              <br />
              <input type="text" id="name" ref={nameRef} />
              <br />
              <label htmlFor="amount">Amount</label>
              <br />
              <input type="number" id="number" ref={amountRef} />
              <br />
              <label htmlFor="quantity">Quantity</label>
              <br />
              <input type="number" id="qty" ref={quantityRef} />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleUpdateClose}>
                Close
              </Button>
              <Button variant="primary" onClick={window.updateInventory}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
          {/*  */}
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((inventoryDoc) => (
                <tr key={inventoryDoc.id}>
                  <td>{inventoryDoc.Name}</td>
                  <td>{inventoryDoc.Amount}</td>
                  <td>{inventoryDoc.Quantity}</td>
                  <td>{inventoryDoc.Total}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => updateInventory(inventoryDoc.id)}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteEntry(inventoryDoc.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
