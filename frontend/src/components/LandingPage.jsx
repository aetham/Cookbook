import { Container } from 'react-bootstrap'
import React, { Component } from "react";
import '../App.css'

export default class LandingPage extends Component {

  render() {
    return (
      <React.Fragment >
        <Container>
          <h1>WELCOME TO COOKBOOK!</h1>
        </Container>
      </React.Fragment>
    );
  }
}