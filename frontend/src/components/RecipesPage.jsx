import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Form, FormControl } from 'react-bootstrap';
import axios from 'axios';

export default class RecipesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipies: [],
            holding: [],
            allitems: [],
            searchTerm: ''
        }
    }

    componentDidMount() {
        axios.get("http://localhost:4000/recipes/all")
            .then(response => response.data)
            .then((data) => {
                this.setState({ recipies: data });
            })
    }

    goTo = () => {
        this.props.history.push("/recipes/make")
    }

    addToLocalArray(itemID, itemName, itemPrice, itemSecondPrice, itemImage) {
        var getItems = {
            recipe_id: itemID,
            name: itemName,
            price: itemPrice,
            secondprice: itemSecondPrice,
            image: itemImage
        }
        const dbquery = {
            id: itemID
        }
        axios.post("http://localhost:4000/recipes/items", dbquery)
            .then(response => response.data)
            .then((data) => {
                this.setState({ allitems: data });
            })
        this.state.holding.push(getItems)
        this.forceUpdate()
    }

    deleteFromArray = (index) => {
        const reducedArr = [...this.state.holding];
        reducedArr.splice(index, 1);
        this.setState({ holding: reducedArr })
    }

    addTobasket() {
        var secondMaxPrice = 0
        var maxPrice = 0
        for (let i = 0; i < this.state.holding.length; i++) {
            maxPrice += this.state.holding[i].price
            secondMaxPrice += this.state.holding[i].secondprice
        }
        const items = {
            name: this.state.holding,
            price: maxPrice,
            secondprice: secondMaxPrice,
        }
        localStorage.setItem('cart', JSON.stringify(items))
        this.props.history.push("/basket")
    }
    search() {
        const found = this.state.recipies.filter(recipie => recipie.name.toLowerCase().includes(this.state.searchTerm))
        return <div>
            {found.map((found) => (
                <ListGroup key={found.id} style={{ margin: '10px' }}>
                    <ListGroup.Item>Name: {found.name}</ListGroup.Item>
                    <ListGroup.Item>Category: {found.description}</ListGroup.Item>
                    <ListGroup.Item>Coop: {found.price}</ListGroup.Item>
                    <ListGroup.Item>Prisma: {found.secondprice}</ListGroup.Item>
                    <Button variant="primary" onClick={() => this.addToLocalArray(found.id, found.name, found.price, found.secondprice)}>Add</Button>
                </ListGroup>
            ))}
        </div>
    }
    handleSearch = (name) => {
        this.setState({ searchTerm: name.target.value });
    }

    render() {
        return (
            <div>
                <Container style={{ paddingBottom: '75px' }}>
                <h2 style={{ textAlign: 'left', paddingTop: '2rem', paddingBottom: '1rem', }}>Recipes page</h2>
                <Button variant="primary" onClick={this.goTo} style={{ marginRight:'72rem'}}>Make a recipe!</Button>
                    <Row>
                        <Col xs={6} md={4}>
                            <h4 style={{ paddingTop: '2rem', paddingBottom: '1rem', alignSelf: 'flex-end' }}>Recipies names</h4>
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
                                    <Card.Title>Recipies name</Card.Title>
                                    <Card.Text>
                                        {this.state.searchTerm == '' ? (
                                            this.state.recipies.map((recipies) => (
                                                <ListGroup key={recipies.id} style={{ margin: '10px' }}>
                                                    <ListGroup.Item>Name: {recipies.name}</ListGroup.Item>
                                                    <ListGroup.Item>Description: {recipies.description}</ListGroup.Item>
                                                    <ListGroup.Item>Coop: {recipies.price}</ListGroup.Item>
                                                    <ListGroup.Item>Prisma: {recipies.secondprice}</ListGroup.Item>
                                                    <Button variant="primary"
                                                        onClick={() => this.addToLocalArray(recipies.id, recipies.name, recipies.price, recipies.secondprice, recipies.image)}>Add</Button>
                                                </ListGroup>
                                            ))
                                        ) : this.search()
                                        }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col xs={12} md={8}>
                            <h2 style={{ paddingTop: '2rem', paddingBottom: '1rem' }}>Recipe</h2>
                            <Container style={{ borderStyle: 'solid', borderColor: 'gray', width: '35rem', marginLeft: '10rem' }}>
                                <Form onSubmit={this.submitUser} id="userFormId">
                                    <Button variant="primary" type="button" style={{ marginRight:'20rem', marginTop:'1rem', marginBottom:'1rem'}} onClick={() => this.addTobasket() } >Add to basket</Button>
                                    <Container>
                                        {
                                            this.state.holding.map((holding, index) => (
                                                <ListGroup key={index} style={{ margin: '10px' }}>
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