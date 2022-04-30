import React, { Component } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import '../App.css';

export default class HistoryPage extends Component {
    // Data requested from the backend API will be stored in the user array.
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
        var user = localStorage.getItem('email')
        const userInfo = {
            name: user
        }
        axios.post("http://localhost:4000/recipes/basket/gethistory", userInfo)
            .then(response => response.data)
            .then((data) => {
                var test = data.array
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
                <h2 style={{textAlign:'left', paddingTop:'2rem',paddingBottom:'1rem'}}>History Page</h2>
                <Table >
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.info.map((info, index) => (
                                <tr key={index}>
                                    <td>{info.date}</td>
                                    <td>{info.name}</td>
                                    <td>{info.price}</td>
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
