import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faCartShopping,
  faChartLine,
  faHouse,
  faPerson,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../Firebase";

function Sidebar() {
  const navigate = useNavigate();
  const auth = getAuth(app);

  function out() {
    signOut(auth)
      .then(() => {
        navigate("/Signin");
        //Sign-out successfull
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div className="sidebar">
      <div className="logo">
        <div className="icon">
          <Link className="name" to={"/"}>
            <FontAwesomeIcon className="log" icon={faChartLine} />
            FA SALES LINE
          </Link>
        </div>
      </div>

      <Link className="link" to={"/"}>
        <FontAwesomeIcon className="awesome order" icon={faHouse} />
        Home
      </Link>
      <Link className="link" to={"/Inventory"}>
        <FontAwesomeIcon className="awesome" icon={faBriefcase} />
        Inventory
      </Link>
      <Link className="link" to={"/Orders"}>
        <FontAwesomeIcon className="awesome order" icon={faCartShopping} />
        Orders
      </Link>
      <Link className="link" to={"/Customers"}>
        <FontAwesomeIcon className="awesome" icon={faPerson} />
        Customers
      </Link>
      <Link onClick={out} className="out">
        <FontAwesomeIcon className="awesome" icon={faRightFromBracket} />
        Logout
      </Link>
    </div>
  );
}

export default Sidebar;
