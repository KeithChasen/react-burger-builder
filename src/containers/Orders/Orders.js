import React, { Component } from 'react'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'
import Spinner from '../../components/UI/Spinner/Spinner'

import * as actions from '../../store/actions/index'

import { connect } from 'react-redux'

class Orders extends Component {
     componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        let orders = <Spinner/>

        if (!this.props.loading) {
            orders = this.props.ords.map(
                order =>
                    <li key={order.id}>
                        <Order ingredients={order.ingredients} price={order.price} />
                    </li>
            )
        }

        return (
            <ul>
                { orders }
            </ul>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

const mapStateToProps = state => {
    return {
        ords: state.order.orders
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))