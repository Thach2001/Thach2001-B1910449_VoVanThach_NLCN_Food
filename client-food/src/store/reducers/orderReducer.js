const intialStateOrder = [];

function orderReducer(state = intialStateOrder, action) {
    switch (action.type) {
        case 'GET_ORDER_LIST':
            return [...action.payload];
        case 'REMOVE_ORDER':
            const newState = state.filter(function (item) {
                return item._id !== action.payload;
            });
            return newState;
        default:
            return state;
    }
}

export default orderReducer;
