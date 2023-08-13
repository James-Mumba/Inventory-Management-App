import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../Firebase";
import { useNavigate } from "react-router";

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
      <div className="container">
        <Sidebar />
        <div className="greet">
          <Navbar />
          <div className="top">
            <div className="section1">
              <div className="box tom">
                <div className="packet"></div>
                <div className="pack"></div>
              </div>
              <div className="box jerry">
                <div className="packet"></div>
                <div className="pack"></div>
              </div>
              <div className="box mouse">
                <div className="packet"></div>
                <div className="pack"></div>
              </div>
              <div className="box cat">
                <div className="packet"></div>
                <div className="pack"></div>
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
    </div>
  );
}

export default Home;
