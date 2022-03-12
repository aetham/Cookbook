import React, { Component } from "react";
import { Table, Button, Container } from 'react-bootstrap';
import axios from 'axios';


export default class UserTable extends Component {
    // Data requested from the backend API will be stored in the users array.
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    // Getting all users data from the backend API point. 
    componentDidMount() {
        axios.get("http://localhost:4000/users/getall")
            //.then(response => console.log(response.data));
            .then(response => response.data)
            .then((data) => {
                this.setState({ users: data });
            })
    }
    // Method to move / push the user to a new screen
    edit(path) {
        this.props.history.push(path);
    }
    // Method which uses a BE API point to delete a specific user.
    // API point uses users ID to locate the user in database and execute the command in backend. 
    delete(usersId) {
        axios.delete("http://localhost:4000/users/delete/" + usersId)
        window.location.reload(false);
    }

    render() {
        return (
            <Container>
                <h1>User tabel</h1>
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((users) => (
                                <tr     key={users.id}>
                                    <td>{users.id}</td>
                                    <td>{users.f_name}</td>
                                    <td>{users.l_name}</td>
                                    <td>{users.email}</td>
                                    <td>{users.password}</td>
                                    <td><Button variant="primary" onClick={() => this.edit('/admin/edit/' + users.id)}>Edit</Button>
                                        <Button variant="danger" onClick={() => this.delete(users.id)}>Delete</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>

        )
    }
}