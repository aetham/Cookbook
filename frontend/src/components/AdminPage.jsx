import { Container, Navbar, Nav } from 'react-bootstrap'
import React, { Component } from "react";

export default class AdminPage extends Component {
  // On logout button click, clear local storage from all data.
  logOut = () => {
    localStorage.clear();
  };
  render() {
    return (
      <Navbar expand="lg" variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="/admin/usertable">Admin Panel</Navbar.Brand>
          <Nav.Link href="/admin/usertable">Users</Nav.Link>
          <Nav.Link href="/admin/ingredientstable">Ingredients </Nav.Link>
          <Nav.Link href="/admin/recipestable">Recipes </Nav.Link>
          <Nav.Link href="/" onClick={this.logOut}>Log out</Nav.Link>
        </Container>
      </Navbar>
    );
  }
}
