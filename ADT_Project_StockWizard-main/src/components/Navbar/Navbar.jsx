import React from "react";
import "./Navbar.css"; // import the CSS file
import Navba from "react-bootstrap/Navbar";
import Container_Boot from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

const Navbar = () => {
  return (
    <Navba bg="dark" variant="dark">
      <Container_Boot>
        <Navba.Brand href="/#Landing">StockWizard</Navba.Brand>
        <Nav className="ml-auto">
          {/* <Nav.Link href="/#Landing">Home</Nav.Link> */}
          {/* <Nav.Link href="/#about">About Us</Nav.Link> */}
          {/* <Nav.Link href="#contact">Contact Us</Nav.Link> */}
          
          <Nav.Link href="./login" id="Login-button">Login</Nav.Link>
          <Nav.Link href="./signup" id="Signup-button">Sign Up</Nav.Link>
          <Nav.Link href="/" id="logout-button">Logout</Nav.Link>
          <Nav.Link href="./chart" >Chart</Nav.Link>
        </Nav>
      </Container_Boot>
    </Navba>
  );
};

export default Navbar;
