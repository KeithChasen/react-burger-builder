import axios from "../../axios-orders";
import { put } from 'redux-saga/effects'
import * as actions from '../actions'

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data, action.orderData))
    } catch(error) {
        yield put(actions.purchaseBurgerFail(error))
    }
}
