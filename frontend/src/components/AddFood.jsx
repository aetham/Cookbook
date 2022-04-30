import React, { Component } from 'react';
import { Form, Button, Container, Modal } from 'react-bootstrap';
import axios from 'axios';


export default class AddIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = { special: '', prisma: '', weight: '', weighttype: '', fuck: [], category: [], show: false };
        this.handleChange = this.handleChange.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.specialhandleChange = this.specialhandleChange.bind(this);

    }
    getUserInfo = () => {
        const user = {
            special: this.state.special.split('-')[0],
        }
        var splitUrl = user.special.split('/')[5]

        const coopURL = "https://api.ecoop.ee/supermarket/products/" + splitUrl;
        axios.get(coopURL).then((response) => {
            this.setState({ fuck: response.data.data });
            this.setState({ category: response.data.data.category });
        })
        this.setState({ show: !this.state.show })
        window.location.reload(false);
    }
    submitInfo = () => {
        var foodInformation = {
            name: this.state.fuck.name,
            image: this.state.fuck.image,
            category: this.state.category.name,
            price: this.state.fuck.price,
            secondprice: this.state.prisma,
            weight: this.state.weight,
            weighttype: this.state.weighttype
        }
        axios.post("http://localhost:4000/ingredients/insert/", foodInformation)
            .then(response => {
                if (response.data != null) {
                    this.props.history.push('/food');
                }
            });
        this.setState({ show: !this.state.show })
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    specialhandleChange(event) {
        this.setState({ weighttype: event.target.value });
    }
    render() {
        return (
            <div>
                <Container>
                    <Form onSubmit={this.getUserInfo} id="userFormName">
                        <Form.Group controlId="formBasicspecial">
                            <Form.Label>Coop </Form.Label>
                            <Form.Control name="special" value={this.state.special} onChange={this.handleChange} placeholder="Enter URL" />
                        </Form.Group>
                        <Form.Group controlId="formBasicsName">
                            <Form.Label>Prisma </Form.Label>
                            <Form.Control name="prisma" value={this.state.prisma} onChange={this.handleChange} placeholder="Enter price" />
                        </Form.Group>
                        <Form.Group controlId="formBasicWeight">
                            <Form.Label>weight </Form.Label>
                            <Form.Control name="weight" value={this.state.weight} onChange={this.handleChange} placeholder="Enter weight" />
                        </Form.Group>
                        <Form.Select aria-label="Default select example" value={this.state.weighttype} onChange={this.specialhandleChange}>
                            <option>Open this select menu</option>
                            <option value="kg">Kg</option>
                            <option value="gram">Gram</option>
                            <option value="full unit">Full unit</option>
                        </Form.Select>
                        <Modal show={this.state.show}>
                            <Modal.Header> Food information</Modal.Header>
                            <Modal.Body>FIX THIS STUFF</Modal.Body>
                            <Button onClick={() => { this.submitInfo() }}>Submit</Button>
                        </Modal>
                        <Button variant="primary" type="button" onClick={this.getUserInfo.bind()}>Submit</Button>
                    </Form>
                </Container>
            </div>
        )
    }
}