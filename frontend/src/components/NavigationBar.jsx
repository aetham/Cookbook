import { Navbar, Container, Nav } from 'react-bootstrap'
import React, { Component } from "react";
import '../App.css';

export default class NavigationBar extends Component {
  // Boolean which is used to determine if a user is logged in.
  state = { loggedIn: false }
  // Method that checks if the user is an admin, if localstorage has a user named test@test.ee then it will push the admin user to its correct path.
  // else if the user is not an admin, it will set the current state boolean to true which will cause different elements to render in navigation bar.
  componentDidMount() {
    if (localStorage.getItem('user') === 'admin') {
      this.setState({ loggedIn: true })
      window.location.href = "/admin";

    } else if (localStorage.getItem('isAuthenticated') === 'true') {
      this.setState({ loggedIn: true })
    }
  }
  logOut = () => {
    localStorage.clear();
  };
  render() {
    var email = localStorage.getItem('email');
    const { loggedIn } = this.state
    return (
      <div>
        <Navbar className="NavBar-custom" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/">COOKBOOK!</Navbar.Brand>
            <Nav className="me-auto">
            </Nav>
            <Nav>
              {loggedIn ?
                <Nav>
                  <Nav.Link href="/recipes">My recipes</Nav.Link>
                  <Nav.Link href="/basket">Basket</Nav.Link>
                  <Nav.Link href="/food">Add food</Nav.Link>
                  <Nav.Link href="/history">History</Nav.Link>
                  <Navbar.Text>
                    Welcome back: <a>{email}</a>
                  </Navbar.Text>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/logout" onClick={this.logOut}>Log out</Nav.Link>
                </Nav>
                :
                <Nav>
                  <Nav.Link href="/register">Register</Nav.Link>
                  <Nav.Link href="/login">Log in</Nav.Link>
                </Nav>
              }
            </Nav>
          </Container>
        </Navbar>
      </div>
    );
  }
}
