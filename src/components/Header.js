import React from "react";
import { Nav, Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Navbar.Brand href="/">Danske</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/database">Database</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
