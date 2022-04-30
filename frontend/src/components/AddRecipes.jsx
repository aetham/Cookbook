import React, { Component, useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default class AddRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            holding: [],
            recipeName: '',
            recipeDescription: '',
            searchTerm: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:4000/ingredients/all/")
            .then(response => response.data)
            .then((data) => {
                this.setState({ ingredients: data });
            })
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value });
    }
    handleSearch = (name) => {
        this.setState({ searchTerm: name.target.value });
    }
    addToLocalArray(itemID, itemName, itemPrice, itemSecondPrice, itemImage) {
        var getItems = {
            food_id: itemID,
            name: itemName,
            price: itemPrice,
            secondprice: itemSecondPrice,
            image: itemImage
        }
        this.state.holding.push(getItems)
        this.forceUpdate()
    }

    deleteFromArray = (index) => {
        const reducedArr = [...this.state.holding];
        reducedArr.splice(index, 1);
        this.setState({ holding: reducedArr })
    }

    saveToDatabase() {
        var maxPrice = 0
        var secondMaxPrice = 0
        for (let i = 0; i < this.state.holding.length; i++) {
            maxPrice += this.state.holding[i].price
            secondMaxPrice += this.state.holding[i].secondprice
        }
        const information = {
            name: this.state.recipeName,
            description: this.state.recipeDescription,
            array: this.state.holding,
            price: maxPrice,
            secondprice: secondMaxPrice
        }
        axios.post("http://localhost:4000/recipes/newrecipe/", information)
    }

    search() {
        const found = this.state.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(this.state.searchTerm))
        return <div>
            {found.map((found) => (
                <ListGroup key={found.id} style={{ margin: '10px' }}>
                    <ListGroup.Item>Name: {found.name}</ListGroup.Item>
                    <ListGroup.Item>Category: {found.category}</ListGroup.Item>
                    <ListGroup.Item>Coop: {found.price}</ListGroup.Item>
                    <ListGroup.Item>Prisma: {found.secondprice}</ListGroup.Item>
                    <Button variant="primary" onClick={() => this.addToLocalArray(found.id, found.name, found.price, found.secondprice, found.image)}>Add</Button>
                </ListGroup>
            ))}
        </div>
    }
    render() {
        return (
            <div>
                <Container style={{ paddingBottom: '75px' }}>
                    <h2 style={{ textAlign: 'left', paddingTop: '2rem', paddingBottom: '1rem' }}>Make a recipe page</h2>
                    <Row>
                        <Col xs={6} md={4}>
                            <h4 style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>Ingredient name</h4>
                            <Form className="d-flex" style={{ paddingBottom: '15px' }}>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    onChange={this.handleSearch}
                                />
                            </Form>
                            <Card style={{ width: '30rem', padding: '15 rem', borderstyle: 'solid', marginRight: '10rem', borderRadius: '50' }}>
                                <Card.Body >
                                    <Card.Title>Ingredient name</Card.Title>
                                    <Card.Text>
                                        {this.state.searchTerm == '' ? (
                                            this.state.ingredients.map((ingredients) => (
                                                <ListGroup key={ingredients.id} style={{ margin: '10px' }}>
                                                    <ListGroup.Item>Name: {ingredients.name}</ListGroup.Item>
                                                    <ListGroup.Item>Category: {ingredients.category}</ListGroup.Item>
                                                    <ListGroup.Item>Coop: {ingredients.price}</ListGroup.Item>
                                                    <ListGroup.Item>Prisma: {ingredients.secondprice}</ListGroup.Item>
                                                    <Button variant="primary" onClick={() => this.addToLocalArray(ingredients.id, ingredients.name, ingredients.price, ingredients.secondprice, ingredients.image)}>Add</Button>
                                                </ListGroup>
                                            ))
                                        ) : this.search()
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={8}>
                            <h4 style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>Recipe</h4>
                            <Container style={{ borderStyle: 'solid', borderColor: 'gray', width: '35rem', marginLeft: '10rem' }}>
                                <Form onSubmit={this.submitUser} id="userFormId">
                                    <Button variant="primary" type="button" style={{ marginRight:'24.9rem', marginTop:'1rem', marginBottom:'1rem'}} onClick={() => this.saveToDatabase()} >Add Recipe</Button>
                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Recipe name</Form.Label>
                                        <Form.Control
                                            type="recipeName"
                                            name="recipeName"
                                            value={this.state.recipeName}
                                            onChange={this.handleChange}
                                            placeholder="E.g. Pancakes" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicrecipeDescription">
                                        <Form.Label>How to make a Recipe</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            type="recipeDescription"
                                            name="recipeDescription"
                                            value={this.state.recipeDescription}
                                            onChange={this.handleChange}
                                            placeholder=" Step 1: Turn Stove on! 
                                            Step 2: ...!" />
                                    </Form.Group>
                                    <Container>
                                        {
                                            this.state.holding.map((holding, index) => (
                                                <ListGroup horizontal key={index} style={{ margin: '10px' }}>
                                                    <ListGroup.Item variant="dark">Name: {holding.name}</ListGroup.Item>
                                                    <ListGroup.Item>Coop: {holding.price}</ListGroup.Item>
                                                    <ListGroup.Item>Prisma: {holding.secondprice}</ListGroup.Item>
                                                    <Button variant="outline-danger" onClick={() => this.deleteFromArray(index)}>Delete</Button>
                                                </ListGroup>
                                            ))
                                        }
                                    </Container>
                                </Form>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}