import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Firebase";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faReceipt,
  faShip,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";

function Home() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });
  return (
    <div className="home">
        <Sidebar />
     
        <div className="greet">
          <Navbar />
          <div className="top">
            <div className="section1">
              <div className="box tom">
                <div className="packet uno">
                  <FontAwesomeIcon className="awe" icon={faBox} />
                </div>
                <div className="pack">
                  <h3>Picked</h3>
                  <p>1286</p>
                </div>
              </div>
              <div className="box jerry">
                <div className="packet ">
                  <FontAwesomeIcon className="awe" icon={faShip} />
                </div>
                <div className="pack">
                  <h3>Shipped</h3>
                  <p>42</p>
                </div>
              </div>
              <div className="box mouse">
                <div className="packet uno">
                  <FontAwesomeIcon className="awe" icon={faTruckFast} />
                </div>
                <div className="pack">
                  <h3>Delivered</h3>
                  <p>30</p>
                </div>
              </div>
              <div className="box cat">
                <div className="packet">
                  <FontAwesomeIcon className="awe" icon={faReceipt} />
                </div>
                <div className="pack">
                  <h3>Invoice</h3>
                  <p>07</p>
                </div>
              </div>
            </div>
            <div className="section2">
              <div className="pieces"></div>
              <div className="piecez"></div>
            </div>
            <div className="section3">
              <div className="bat"></div>
              <div className="bat"></div>
            </div>
            {/* <p>pppppp</p>
            <h1>hello</h1> */}
          </div>
        </div>
      
    </div>
  );
}

export default Home;
