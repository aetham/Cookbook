import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, ListGroup} from 'react-bootstrap';
import axios from 'axios';

export default class AddRecipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: []
        }
    }
    componentDidMount() {
        axios.get("http://localhost:4000/ingredients/all/")
            .then(response => response.data)
            .then((data) => {
                this.setState({ ingredients: data });
                console.log(data)
            })
    }
    newpage(path) {
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                <h1>Make Recipes Page</h1>
                <Button variant="primary" onClick={() => this.newpage('/recipes/make')}>Make a recipe</Button>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <h1>Ingredient name</h1>
                            <Card style={{ width: '30rem', padding: '15 rem', borderstyle: 'solid', marginRight:'10rem'}}>
                                <Card.Body>
                                    <Card.Title>Ingredient name</Card.Title>
                                    <Card.Text>
                                        {
                                            this.state.ingredients.map((ingredients) => (
                                                <ListGroup  key={ingredients.id} style={{margin:'10px' }}>
                                                    <ListGroup.Item>Name: {ingredients.name}</ListGroup.Item>
                                                    <ListGroup.Item>Category: {ingredients.category}</ListGroup.Item>
                                                    <ListGroup.Item>Price: {ingredients.price}</ListGroup.Item>
                                                    <ListGroup.Item>Amount of ingredient</ListGroup.Item>
                                                    <Button variant="primary">Add</Button>
                                                </ListGroup>
                                            ))}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={8}>
                            <h1>Big screen</h1>
                            <Card style={{ width: '35rem', marginLeft:'10rem' }}>
                                <Card.Body>
                                    <Card.Title>Title of the recipe</Card.Title>
                                    <Card.Text>
                                        Mini description goes here.<br />
                                        1.Get components.<br />
                                        2.Cook.<br />
                                        3.Eat!.<br />
                                    </Card.Text>
                                    <Button variant="primary">Add to basket</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}