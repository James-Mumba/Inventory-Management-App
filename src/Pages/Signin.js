import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { app } from "../Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
function Signin() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();
  const auth = getAuth(app);

  function enter() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userId = userCredential.user.uid;
        console.log(userId);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div>
      <div>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            ref={emailRef}
            placeholder="name@example.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            ref={passwordRef}
            placeholder="*******"
          />
        </Form.Group>
        <Button>Signin</Button>
        <p onClick={() => navigate("/Signup")}>Don't have an account?</p>
      </div>
    </div>
  );
}

export default Signin;
