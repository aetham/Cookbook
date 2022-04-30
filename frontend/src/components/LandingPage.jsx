import { Container, Card, CardGroup, Row } from 'react-bootstrap'
import React, { Component } from "react";
import '../App.css'
import axios from 'axios';
import food1 from '../pictures/food1.jpg'
import food2 from '../pictures/food2.jpg'
import food3 from '../pictures/food3.jpg'
import food4 from '../pictures/food4.jpg'
import food6 from '../pictures/food6.jpg'
import food7 from '../pictures/food7.jpg'
import food8 from '../pictures/food8.jpg'
import food9 from '../pictures/food9.jpg'
import { Link } from "react-router-dom";
import landingpageimage from '../pictures/background.jpg'

var myArray = [
  food1,
  food2,
  food3,
  food4,
  food6,
  food7,
  food8,
  food9
];

function getRandom() {
  var randomItem = myArray[Math.floor(Math.random() * myArray.length)];
  return randomItem
}

export default class LandingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }
  componentDidMount() {
    axios.get("http://localhost:4000/recipes/all")
      .then(response => response.data)
      .then((data) => {
        this.setState({ articles: data });
        console.log(data)
      })
  }

  nextPath(path) {
    this.props.history.push(path);
  }
  render() {
    return (
      <div style={{ background: `url(${landingpageimage})`, backgroundRepeat:'no-repeat', backgroundPosition:'absolute'}}>
      <React.Fragment>
        <Container >
        <h1 style={{color:'white', position:'relative', paddingTop:'10rem'}}>Welcome to Cookbook</h1>
          <CardGroup>
            <Row>
              {
                this.state.articles.map((articles, index) => index < 3 && ( 
                  <Card className="bg-dark text-white" key={index} style={{ width: '25rem', padding: '1px', margin: "15px", marginBottom:'15rem', marginTop:'15rem' }}>
                    <Card.Img src={getRandom()} />
                    <Card.Body >
                      <Card.Title>{articles.name}</Card.Title>
                      <Card.Text>{articles.description.substr(0, 280)}...</Card.Text>
                      <Link to={('/article/' + articles.article_id)} className="btn btn-light">Read More</Link>
                    </Card.Body>
                  </Card>))
              }
            </Row>
          </CardGroup>
        </Container>
      </React.Fragment>
      </div>
    );
  }
}