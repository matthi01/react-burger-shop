// actions creators for an order
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    };
};

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
            .then(response => {
                console.log(response.data);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_INIT
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

// action creator to execute the async code for fetching orders from firebase
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());

        // filter orders by the given user Id
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

        axios.get('/orders.json/' + queryParams)
            .then(response => {
                console.log(response.data); // comes back as an object - turn this into an array of objects (orders)
                let ordersArr = [];
                for (let key in response.data) {
                    ordersArr.push({
                        ...response.data[key], // distribute the object data
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(ordersArr));
            })
            .catch(err => {
                // errors are caught with global withErrorHandler()
                dispatch(fetchOrdersFail(err));
            });
    };
};