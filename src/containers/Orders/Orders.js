import React, { Component } from 'react'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                const fetchedOrders = []
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                })
            })
            .catch(err => {
                this.setState({
                    loading: false
                })
            })
    }

    render() {
        console.log(this.state.orders);
        const orders = this.state.orders.map(
            order =>
                <li key={order.id}>
                    <Order ingredients={order.ingredients} price={order.price} />
                </li>
        )
        return (
            <ul>
                { orders }
            </ul>
        )
    }
}

export default withErrorHandler(Orders, axios)