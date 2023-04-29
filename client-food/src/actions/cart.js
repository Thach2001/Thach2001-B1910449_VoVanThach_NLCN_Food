import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_QUANTITY } from '../actionTypes/actionTypes';

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
