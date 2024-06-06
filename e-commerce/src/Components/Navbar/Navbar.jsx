import React from 'react'
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import './Navbar.css';

function ENavbar() {
  return (
    <Navbar bg="light" className="ecommerce-navbar">
      <Container className='nav'>
        <Navbar.Brand href="#">E-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Shop</Nav.Link>
            <Nav.Link href="#">About</Nav.Link>
            <Nav.Link href="#">Contact</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav.Link href="#" className="cart-icon">
            <i className="bi bi-cart"></i>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default ENavbar
