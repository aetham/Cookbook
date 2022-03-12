import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from "axios";
import { requireAuth } from '../functions/Authentication'

// Looked how to post with axios
// https://github.com/axios/axios#nodejs
// Looked for an example on how to post with axios
// https://stackoverflow.com/questions/53866158/how-to-post-with-axios-in-react
// Looked how to handle forms
// https://reactjs.org/docs/forms.html
// Looked up how to handle events
// https://reactjs.org/docs/handling-events.html

export default class LogIn extends Component {
    // This.state with variables initally will be placeholders for future data.
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
        this.handleChange = this.handleChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }
    // Method to save the user input onto previously made this.state variables.
    // Using axios we will pass on needed information to login in a new user.
    // The backend code will check user credentials and compare the passwords.
    // If the user has entered the correct password, he will be moved to the profile page.
    // RequireAuth will insert user credentials into localstorage, to show that the user is logged in.
    // The stored data will be used in the Navigation bar and the routes that the user can access.
    submitUser = () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:4000/users/login", user)
            .then(response => {
                if (response.data != null) {
                    requireAuth(response.data.accountrole, this.state.email);
                    this.setState(this.initialState)
                    window.location = "/" + response.data.accountrole
                }
            })
    }
    // Method which constantly targets the values that are in the Form.
    // With this method we can read values written in the form.
    // I have also used Bind in the constructor to bind user values into state variables.
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.submitUser} id="userFormId">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" value={this.state.email} onChange={this.handleChange} placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" />
                        </Form.Group>
                        <Button variant="primary" type="button" onClick={this.submitUser.bind()}>
                            Login
                        </Button>
                    </Form>
                </Container>
            </div>
        );
    }
}