import React, { Component } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../App.css';

export default class IngredientsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: [],
            oraganizedInfo: [],
            offset: 0,
            perPage: 10,
            currentPage: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
    }
    componentDidMount() {
        axios.get("http://localhost:4000/ingredients/all")
            .then(response => response.data)
            .then((data) => {
                var test = data
                console.log(test)
                var slice = test.slice(this.state.offset, this.state.offset + this.state.perPage)
                console.log(slice)
                this.setState({
                    pageCount: Math.ceil(test.length / this.state.perPage),
                    oraganizedInfo: test,
                    info: slice
                })
            })
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;
        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });
    };
    loadMoreData() {
        const data = this.state.oraganizedInfo;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            info: slice
        })
    }

    render() {
        return (
            <Container>
                    <h2 style={{ textAlign: 'left', paddingTop: '2rem', paddingBottom: '1rem' }}>Ingredients Page</h2>
                <Table >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.info.map((info, index) => (
                                <tr key={index}>
                                    <td>{info.id}</td>
                                    <td>{info.name}</td>
                                    <td>{info.price}</td>
                                    <td><Button variant="primary" style={{ marginLeft: '1rem', marginRight: '1rem' }} >Edit</Button>
                                        <Button variant="danger">Delete</Button></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <div style={{ marginBottom: '5rem' }}>
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={this.handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={this.state.pageCount}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </Container>
        )
    }
}
