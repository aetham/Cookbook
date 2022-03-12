import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form } from 'react-bootstrap';
import axios from 'axios';

export default class AddRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: [],
            holding: [],
            recipeName: '',
            recipeDescription: ''
        }
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

    addToLocalArray(itemID, itemName, itemPrice, itemImage) {
        var getItems = {
            food_id: itemID,
            name: itemName,
            price: itemPrice,
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
        const information = {
            name: this.state.recipeName,
            description: this.state.recipeDescription,
            array: this.state.holding
        }
        console.log(this.state.holding)
        axios.post("http://localhost:4000/recipes/newrecipe/", information)
    }

    render() {
        return (
            <div>
                <h1>Make Recipes Page</h1>
                <Container style={{ paddingBottom: '75px' }}>
                    <Row>
                        <Col xs={6} md={4}>
                            <h1>Ingredient name</h1>
                            <Card style={{ width: '30rem', padding: '15 rem', borderstyle: 'solid', marginRight: '10rem', borderRadius: '50' }}>
                                <Card.Body >
                                    <Card.Title>Ingredient name</Card.Title>
                                    <Card.Text>
                                        {
                                            this.state.ingredients.map((ingredients) => (
                                                <ListGroup key={ingredients.id} style={{ margin: '10px' }}>
                                                    <ListGroup.Item>Name: {ingredients.name}</ListGroup.Item>
                                                    <ListGroup.Item>Category: {ingredients.category}</ListGroup.Item>
                                                    <ListGroup.Item>Price: {ingredients.price}</ListGroup.Item>
                                                    <ListGroup.Item>Amount of ingredient</ListGroup.Item>
                                                    <Button variant="primary" onClick={() => this.addToLocalArray(ingredients.id, ingredients.name, ingredients.price, ingredients.image)}>Add</Button>
                                                </ListGroup>
                                            ))}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={8}>
                            <h1>Recipe</h1>
                            <Container style={{ borderStyle: 'solid', borderColor: 'gray', width: '35rem', marginLeft: '10rem' }}>
                                <Form onSubmit={this.submitUser} id="userFormId">
                                <Button variant="primary" type="button" onClick={() => this.saveToDatabase()} >Add Recipe</Button>
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
                                                    <ListGroup.Item>Price: {holding.price}</ListGroup.Item>
                                                    <ListGroup.Item>Amount of ingredient</ListGroup.Item>
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