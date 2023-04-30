import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADJUST_QUANTITY,
    SET_CART_ITEMS,
} from '../actionTypes/actionTypes';

export const addToCart = (product) => {
    return {
        type: ADD_TO_CART,
        payload: {
            product,
        },
    };
};

export const removeFromCart = (productId) => {
    return {
        type: REMOVE_FROM_CART,
        payload: {
            productId,
        },
    };
};

export const adjustQuantity = (productId, newQuantity) => {
    return {
        type: ADJUST_QUANTITY,
        payload: {
            productId,
            newQuantity,
        },
    };
};

export const setCartItems = (cartItems) => {
    return {
        type: SET_CART_ITEMS,
        payload: {
            cartItems,
        },
    };
};
