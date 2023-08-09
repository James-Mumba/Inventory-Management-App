import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { app } from "../Firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router";

function Signup() {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const auth = getAuth(app);
  const navigate = useNavigate();

  function register() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    createUserWithEmailAndPassword(auth, email, password).then(
      (usercredential) => {
        const userId = usercredential.user.uid;
        console.log(userId);

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
        <Button type="submit" variant="warning" onClick={register}>
          Sign up
        </Button>
      </div>
    </div>
  );
}

export default Signup;
