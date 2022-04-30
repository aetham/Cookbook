import React, { Component } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
        this.submitEdit = this.submitEdit.bind(this);
        this.userChange = this.userChange.bind(this);
    }
    componentDidMount() {
        let getemail = localStorage.getItem("email")
        axios.get("http://localhost:4000/users/user/login/" + getemail)
            .then(response => response.data)
            .then((data) => {
                this.setState({ user: data });
            })
    }

    submitEdit = () => {
        const loggedInUser = {
            f_name: this.state.f_name,
            l_name: this.state.l_name,
            email: this.state.email,
            password: this.state.password,
        }

        axios.put("http://localhost:4000/user/edit/" + this.props.match.params.id, loggedInUser)
            .then(response => {
                if (response.data != null) {
                    this.props.history.push('/admin/usertable');
                }
            });
    }
    userChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { f_name, l_name, email, password } = this.state.user;
        return (
            <div>
                <h1>Profile</h1>
                <Container>
                    {
                        this.state.user.map((user) => (
                            <Form onSubmit={this.submitEdit} id="userFormId">
                                <Form.Group controlId="formBasicFirst">
                                    <Form.Label>User First Name</Form.Label>
                                    <Form.Control type="f_name" name="f_name" value={f_name} onChange={this.userChange} placeholder={user.f_name} />
                                </Form.Group>

                                <Form.Group controlId="formBasicLast">
                                    <Form.Label>User Last name </Form.Label>
                                    <Form.Control type="l_name" name="l_name" value={l_name} onChange={this.userChange} placeholder={user.l_name} />
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>User Email</Form.Label>
                                    <Form.Control type="email" name="email" value={email} onChange={this.userChange} placeholder={user.email} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Change password</Form.Label>
                                    <Form.Control type="password" name="password" value={password} onChange={this.userChange} placeholder='Enter a New password' />
                                </Form.Group>
                                <Button variant="primary" type="button" onClick={this.submitEdit.bind()}>Submit</Button>
                            </Form>
                        ))
                    }
                </Container>
            </div>
        )
    }
}