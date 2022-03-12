import React, { Component } from "react";
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default class UserEdit extends Component {
  // Data requested from the backend API will be stored in the users array.
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
    this.submitEdit = this.submitEdit.bind(this);
    this.userChange = this.userChange.bind(this);

  }
  // Method that triggers automatically based on the user ID in the URL and gets the needed information from database.
  componentDidMount() {
    axios.get("http://localhost:4000/users/user/" + this.props.match.params.id)
      .then(response => response.data)
      .then((data) => {
        this.setState({ users: data });
      })
  }
  // Variable to save the user input onto previously made this.state variables using the bind method.
  submitEdit = () => {
    const user = {
      f_name: this.state.f_name,
      l_name: this.state.l_name,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
    }
    // Using axios we will pass on needed information to update user information in database.
    // this.props.match.params.id contains the id of the user and user contains user inserted data.
    axios.put("http://localhost:4000/users/edit/" + this.props.match.params.id, user)
      .then(response => {
        if (response.data != null) {
          this.props.history.push('/admin/usertable');
        }
      });
  }
    // Method which constantly targets the values that are in the Form.
    // With this method we can read values written in the form.
    // I have also used Bind in the constructor to bind user values into state variables.
  userChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { f_name, l_name, email, password, role } = this.state.users;
    return (
      <Container>
        {
          this.state.users.map((users) => (
            <Form onSubmit={this.submitEdit} id="userFormId">
              <Form.Group controlId="formBasicFirst">
                <Form.Label>User First Name</Form.Label>
                <Form.Control type="f_name" name="f_name" value={f_name} onChange={this.userChange} placeholder={users.f_name} />
              </Form.Group>

              <Form.Group controlId="formBasicLast">
                <Form.Label>User Last name </Form.Label>
                <Form.Control type="l_name" name="l_name" value={l_name} onChange={this.userChange} placeholder={users.l_name} />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>User Email</Form.Label>
                <Form.Control type="email" name="email" value={email} onChange={this.userChange} placeholder={users.email} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>User password</Form.Label>
                <Form.Control type="password" name="password" value={password} onChange={this.userChange} placeholder={users.password} />
              </Form.Group>

              <Form.Group controlId="formBasicRole">
                <Form.Label>User role</Form.Label>
                <Form.Control type="role" name="role" value={role} onChange={this.userChange} placeholder={users.role} />
              </Form.Group>

              <Button variant="primary" type="button" onClick={this.submitEdit.bind()}>Submit</Button>
            </Form>
          ))
        }
      </Container>
    )
  }
}