import { faBell, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Button, Form } from "react-bootstrap";

function Navbar() {
  return (
    <div className="navbar">
      {/* <h1>NAVBAR</h1> */}
      <div className="search">
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Search</Form.Label>
          <Form.Control
            className="here"
            type="Search"
            placeholder="search here"
          />
        </Form.Group>
        <Button type="submit" className="button">
          Search
        </Button>
      </div>
      <div className="calender">
        <select className="try">
          <option value=""></option>
          <option value="trial 2">trial 2</option>
          <option value="trial 3">trial 3</option>
          <option value="trial 4">trial 4</option>
        </select>
      </div>
      <div className="user">
        <div className="notification">
          <FontAwesomeIcon className="barua" icon={faEnvelope} />
        </div>
        <div className="profile"></div>
        <p>1edqsvfd</p>
      </div>
    </div>
  );
}

export default Navbar;
