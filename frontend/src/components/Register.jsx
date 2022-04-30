import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';

export default class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = { email: '', password: '', f_name: '', l_name: '', role: '' };
        this.handleChange = this.handleChange.bind(this);
        this.submitUser = this.submitUser.bind(this);
    }

    submitUser = () => {
        const user = {
            email: this.state.email,
            password: this.state.password,
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            role: this.state.role
        }

        axios.post("http://localhost:4000/users/newuser", user)
            .then(response => {
                if (response.data != null) {
                    alert("User added to DB!")
                }
            });
    }
    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }

    render() {
        return (
            <div>
                <Container>
                    <h2 style={{ textAlign: 'left', paddingTop: '2rem', paddingBottom: '1rem' }}>Registration Page</h2>
                    <Form onSubmit={this.submitUser} id="userFormId" style={{ marginTop: '1rem' }}>
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

                        <Button variant="primary" type="button" onClick={this.submitUser.bind()} style={{ marginTop: '1rem' }} >Submit</Button >
                    </Form>
                </Container>
            </div>
        )
    }
}