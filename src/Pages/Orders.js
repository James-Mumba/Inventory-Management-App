import { getAuth, onAuthStateChanged } from "firebase/auth";
import React from "react";
import { app } from "../Firebase";
import { useNavigate } from "react-router";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";

function Orders() {
  //code for checking if user is logged in
  const auth = getAuth(app);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  }); //if the user is not logged in, navigate the user to the log in page
  return (
    <div className="Orders">
      <div className="container">
        <Sidebar />
        <div className="greet">
          <Navbar />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
