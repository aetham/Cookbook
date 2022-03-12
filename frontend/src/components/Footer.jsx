import { Container, Navbar, Nav } from 'react-bootstrap'
import React, { Component } from "react";

export default class Footer extends Component {
  // Custom Footer for the webapge so that the user could easily navigate to other places.
  // TODO Icons and links to subpages.
  render() {
    return (
      <div>
        <Navbar sticky="bottom" bg="dark" variant="dark" style={{ position: 'fixed', bottom: 0, width: "100%" }}>
          <Container>
            <Nav className="me-auto">
            </Nav>
            <Nav>
              <Nav.Link href="/#facebook">Facebook</Nav.Link>
              <Nav.Link href="/#twitter">Twitter</Nav.Link>
              <Nav.Link href="/#instagram" >Instagram</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}