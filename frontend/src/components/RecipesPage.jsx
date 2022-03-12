import React, { Component } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

export default class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: []
        }
    }
    newpage(path) {
        this.props.history.push(path);
    }
    render() {
        return (
            <div>
                <h1>Recipes Page</h1>
                <Button variant="primary" onClick={() => this.newpage('/recipes/make')}>Make a recipe</Button>
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            Items search box here
                            <Card style={{ width: '30rem' }}>
                                <Card.Body>
                                    <Card.Title>Recipe name</Card.Title>
                                    <Card.Text>
                                        Mini description goes here.<br />
                                        1.Get components.<br />
                                        2.Cook.<br />
                                        3.Eat!.<br />
                                    </Card.Text>
                                    <Button variant="primary">Modify</Button>
                                    <Button variant="primary">Delete</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={8}>
                            Big display here
                            <Card style={{ width: '50rem', padding: '5 rem' }}>
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