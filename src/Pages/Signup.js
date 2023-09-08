import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { app, db } from "../Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { collection, doc, setDoc } from "firebase/firestore";

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const auth = getAuth(app);
  const navigate = useNavigate();

  function register() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const person = nameRef.current.value;

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

        navigate("/");
      }
    );
  }
  return (
    <div className="main">
      <div className="input">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>User Name</Form.Label>
          <Form.Control type="text" ref={nameRef} placeholder="john murley" />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            placeholder="name@example.com"
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="*******"
          />
        </Form.Group>
        <br />
        <Button type="submit" variant="warning" onClick={register}>
          Sign up
        </Button>
        <p onClick={() => navigate("/Signin")}>Already have an account?</p>
      </div>
    </div>
  );
}

export default Signup;
