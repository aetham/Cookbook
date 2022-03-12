import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

// Looked how to post with axios
// https://github.com/axios/axios#nodejs
// Looked for an example on how to post with axios
// https://stackoverflow.com/questions/53866158/how-to-post-with-axios-in-react
// Looked how to handle forms
// https://reactjs.org/docs/forms.html
// Looked up how to handle events
// https://reactjs.org/docs/handling-events.html

export default class SignUp extends Component {
    // This.state with variables are placeholders for future data.
    constructor(props) {
        super(props);
        this.state = { email: '', password: '', f_name: '', l_name: '', role: '' };
        this.handleChange = this.handleChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }
    // Method to save the user input onto previously made this.state variables.
    submitUser = () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            role: this.state.role
        }
        // Using axios we will pass on needed information to insert a new user into a database.
        // The backend, will check if the user details allready exist or not.
        // If they dont, a new user will be inserted into database.
        axios.post("http://localhost:4000/users/newuser", user)
            .then(response => {
                if (response.data != null) {
                    alert("User added to DB!")
                }
            });
    }
    // Method which constantly targets the values that are in the Form.
    // With this method we can read values written in the form.
    // I have also used Bind in the constructor to bind user values into state variables.
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    // React bootstrap form is used to display boxes where user can type requested data. 
    // Values written will be stored in the state variables and later used by the API point.
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

                        <Form.Group controlId="formBasicFirst">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="firstName" name="f_name" value={this.state.f_name} onChange={this.handleChange} placeholder="eg John" />
                        </Form.Group>

                        <Form.Group controlId="formBasicSecond">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="lastName" name="l_name" value={this.state.l_name} onChange={this.handleChange} placeholder="eg Smith" />
                        </Form.Group>

                        <Form.Group controlId="formBasicThird">
                            <Form.Label>Role</Form.Label>
                            <Form.Control type="role" name="role" value={this.state.role} onChange={this.handleChange} placeholder="Type" />
                        </Form.Group>

                        <Button variant="primary" type="button" onClick={this.submitUser.bind()}>Submit</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}