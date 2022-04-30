import React, { Component } from 'react';
import { Container, Button, Table } from 'react-bootstrap';
import axios from 'axios';

export default class Basket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: [],
            price: '',
            secondprice: ''
        }
    }

    componentDidMount() {
        var arr = []
        arr = JSON.parse(localStorage.getItem('cart'))
        if (arr == null) {
            console.log('')
        } else {
            const payload = {
                array: arr.name
            }
            this.setState({ price: arr.price })
            this.setState({ secondprice: arr.secondprice })
            axios.post("http://localhost:4000/recipes/basket/yes", payload)
                .then(response => response.data)
                .then((data) => {
                    this.setState({ cart: data });
                })
        }
    }

    saveToDatabase() {
        localStorage.removeItem('cart')
        var userInfo = localStorage.getItem('email')
        const payload = {
            email: userInfo,
            array: this.state.cart,
            price: this.state.price
        }
        console.log(payload)
        axios.post("http://localhost:4000/recipes/basket/savetohistory", payload)
            .then(response => response.data)
        window.location.reload(false);
    }
    goTo = () => {
        this.props.history.push("/history")
    }

    render() {
        return (
            <div>
                <Container>
                    <h2 style={{ textAlign: 'left', paddingTop: '2rem', paddingBottom: '1rem' }}>Basket Page</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Product name</th>
                                <th>Category</th>
                                <th>Coop</th>
                                <th>Prisma</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cart.map((cart, index) => (
                                <tr key={index} style={{ margin: '10px' }}>
                                    <td>{cart.name}</td>
                                    <td>{cart.category}</td>
                                    <td>{cart.price}</td>
                                    <td>{cart.secondprice}</td>
                                </tr>
                            ))
                            }
                        </tbody>
                    </Table>
                    <p style={{ float: 'right' }}>Prisma Price: {this.state.secondprice}</p>
                    <p style={{ float: 'right', marginRight: '1rem', marginLeft: '1rem' }}>Coop Price: {this.state.price}</p>
                    <Button variant="info" onClick={() => this.goTo()} style={{ marginTop: '5rem' }}>History</Button>
                    <Button variant="primary" onClick={() => this.saveToDatabase()} style={{ marginTop: '5rem', marginLeft: '10px' }}>Save to history</Button>
                </Container>
            </div>
        )
    }
}