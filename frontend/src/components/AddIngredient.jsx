import React, { Component } from 'react';
import { Form, Button, Container, Modal, Table } from 'react-bootstrap';
import axios from 'axios';

let mass =
    { "data": { "id": 3828, "id2": 12775555, "business": 1, "business_name": "Coop Eesti Keskühistu", "ean": "4740125120059", "name": "Alma piim 2.5% 1.5L", "slug": "alma-piim-25-15l", "producer": "Valio Eesti AS", "country": null, "image": "https://ecoop.ee/assets/img/data/1/products/12775555-alma-piim-25-15l-1646874237608.jpg", "thumbnail": "https://ecoop.ee/assets/img/data/1/products/12775555-alma-piim-25-15l-1646874237608.jpg", "vat_rate": 20, "price": 1.29, "base_price": 0.86, "price_sale": 1.09, "base_price_sale": 0.73, "price_sale_mbr": null, "base_price_sale_mbr": null, "price_sale_mbr_plus": null, "base_price_sale_mbr_plus": null, "campaign_start": "2022-01-16T22:00:00.000Z", "campaign_end": "2022-04-02T21:00:00.000Z", "measurement_step": 1, "minimum_measurement_step": null, "quantity": 1, "base_quantity": 1, "unit": "pcs", "base_unit": "l", "deleted_at": null, "deposit_count": null, "deposit_price": null, "favourited": null, "replaceable": false, "can_call": null, "alcohol": null, "avg_weight": null, "submarket_label": "supermarket", "description": null, "information": null, "instructions": null, "ingredients": "PIIM\r\n", "allergens": null, "category": { "id": 21, "name": "Piim" }, "category_position": null, "fish": null, "wine": null, "green_grocery_quality": null, "cart_quantity": 0, "cart_unit": null, "cart_product_id": 0, "preorder_time": null, "similar": [{ "id": 6977364, "id2": 22957267, "business": null, "business_name": "Coop Eesti Keskühistu", "ean": null, "name": "Tere joogipiim 1.8% 1.5L", "slug": "tere-joogipiim-18-15l", "producer": "Eesti", "country": null, "image": "https://ecoop.ee/assets/img/data/1/products/22957267-tere-joogipiim-18-15l-1646874232674.jpg", "thumbnail": "https://ecoop.ee/assets/img/data/1/products/22957267-tere-joogipiim-18-15l-1646874232674.jpg", "vat_rate": null, "price": 1.29, "base_price": 0.86, "price_sale": null, "base_price_sale": null, "price_sale_mbr": null, "base_price_sale_mbr": null, "price_sale_mbr_plus": null, "base_price_sale_mbr_plus": null, "campaign_start": null, "campaign_end": null, "measurement_step": 1, "minimum_measurement_step": null, "quantity": 1, "base_quantity": 1, "unit": "pcs", "base_unit": "l", "deleted_at": null, "deposit_count": null, "deposit_price": null, "favourited": null, "replaceable": false, "can_call": null, "alcohol": null, "avg_weight": null }, { "id": 5201, "id2": 22386031, "business": null, "business_name": "Coop Eesti Keskühistu", "ean": null, "name": "Farmi Rjaženka 750g", "slug": "farmi-rjazenka-750g", "producer": "Farmi Piimatööstus AS", "country": null, "image": "https://ecoop.ee/assets/img/data/1/products/22386031-farmi-rjazenka-750g-1646874927249.jpg", "thumbnail": "https://ecoop.ee/assets/img/data/1/products/22386031-farmi-rjazenka-750g-1646874927249.jpg", "vat_rate": null, "price": 1.29, "base_price": 1.72, "price_sale": null, "base_price_sale": null, "price_sale_mbr": null, "base_price_sale_mbr": null, "price_sale_mbr_plus": null, "base_price_sale_mbr_plus": null, "campaign_start": null, "campaign_end": null, "measurement_step": 1, "minimum_measurement_step": null, "quantity": 1, "base_quantity": 1, "unit": "pcs", "base_unit": "kg", "deleted_at": null, "deposit_count": null, "deposit_price": null, "favourited": null, "replaceable": false, "can_call": null, "alcohol": null, "avg_weight": null }, { "id": 3829, "id2": 12775570, "business": null, "business_name": "Coop Eesti Keskühistu", "ean": null, "name": "Alma piim 2.5% 0.5L", "slug": "alma-piim-25-05l", "producer": "Valio Eesti AS", "country": null, "image": "https://ecoop.ee/assets/img/data/1/products/12775570-alma-piim-25-05l-1646874267740.jpg", "thumbnail": "https://ecoop.ee/assets/img/data/1/products/12775570-alma-piim-25-05l-1646874267740.jpg", "vat_rate": null, "price": 0.55, "base_price": 1.1, "price_sale": null, "base_price_sale": null, "price_sale_mbr": null, "base_price_sale_mbr": null, "price_sale_mbr_plus": null, "base_price_sale_mbr_plus": null, "campaign_start": null, "campaign_end": null, "measurement_step": 1, "minimum_measurement_step": null, "quantity": 1, "base_quantity": 1, "unit": "pcs", "base_unit": "l", "deleted_at": null, "deposit_count": null, "deposit_price": null, "favourited": null, "replaceable": false, "can_call": null, "alcohol": null, "avg_weight": null }, { "id": 6246616, "id2": 22926083, "business": null, "business_name": "Coop Eesti Keskühistu", "ean": null, "name": "MO Saaremaa Täispiim šokolaadiga 500ml", "slug": "mo-saaremaa-taispiim-sokolaadiga-500ml", "producer": "Saaremaa PT", "country": null, "image": "https://ecoop.ee/assets/img/data/1/products/22926083-mo-saaremaa-taispiim-sokolaadiga-500ml-1646874953897.jpg", "thumbnail": "https://ecoop.ee/assets/img/data/1/products/22926083-mo-saaremaa-taispiim-sokolaadiga-500ml-1646874953897.jpg", "vat_rate": null, "price": 1.25, "base_price": 2.5, "price_sale": null, "base_price_sale": null, "price_sale_mbr": null, "base_price_sale_mbr": null, "price_sale_mbr_plus": null, "base_price_sale_mbr_plus": null, "campaign_start": null, "campaign_end": null, "measurement_step": 1, "minimum_measurement_step": null, "quantity": 1, "base_quantity": 1, "unit": "pcs", "base_unit": "l", "deleted_at": null, "deposit_count": null, "deposit_price": null, "favourited": null, "replaceable": false, "can_call": null, "alcohol": null, "avg_weight": null }], "additives_free": false, "domestic": false, "ecological": false, "fairtrade": false, "gluten_free": false, "gmo_free": false, "soy_free": false, "salt_free": false, "lactose_free": false, "sugar_free": false, "organic": false, "vegan": false, "healthy": false, "estonian": false, "nutrition": [{ "name": "calories", "value": 55 }, { "name": "fat", "value": 2.5 }, { "name": "saturated_fat", "value": 1.7 }, { "name": "carbohydrate", "value": 4.8 }, { "name": "sugar", "value": 5 }, { "name": "protein", "value": 3.2 }, { "name": "salt", "value": 0.1 }], "categories": [] } }

export default class AddIngredient extends Component {
    constructor(props) {
        super(props);
        this.state = { special: '', weight: '', weighttype: '', fuck: [], category: [], show: false };
        this.handleChange = this.handleChange.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.specialhandleChange = this.specialhandleChange.bind(this);

    }
    getUserInfo = () => {
        const user = {
            special: this.state.special.split('-')[0],
        }
        var splitUrl = user.special.split('/')[5]
        const url = "https://api.ecoop.ee/supermarket/products/" + splitUrl;
        axios.get(url).then((response) => {
            this.setState({ fuck: response.data.data });
            this.setState({ category: response.data.data.category });
            // console.log("🚀 ~ file: AddIngredient.jsx ~ line 32 ~ AddIngredient ~ axios.get ~ response.data.data", response.data.data)
        })
        this.setState({ show: !this.state.show })

    }
    submitInfo = () => {
        var foodInformation = {
            name: this.state.fuck.name,
            image: this.state.fuck.image,
            category: this.state.category.name,
            price: this.state.fuck.price,
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

    // componentDidUpdate = (prevProps, nextProps) => {
    //     if (prevProps.fuck !== nextProps.fuck) {
    //         console.log(prevProps, nextProps, "componentWillBeUpdated")
    //         var foodInformation = {
    //             name: this.state.fuck.name,
    //             image: this.state.fuck.image,
    //             category: this.state.category.name,
    //             price: this.state.fuck.price,
    //             weight: this.state.weight,
    //             weighttype: this.state.weighttype
    //         }
    //     }
    // }

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
                            <Form.Label>Name </Form.Label>
                            <Form.Control name="special" value={this.state.special} onChange={this.handleChange} placeholder="Enter name" />
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