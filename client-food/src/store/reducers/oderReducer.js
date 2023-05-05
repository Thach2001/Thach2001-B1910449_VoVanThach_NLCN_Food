const intialStateOder = [];

function oderReducer(state = intialStateOder, action) {
    switch (action.type) {
        case 'GET_ODER_LIST':
            return [...action.payload];
        case 'REMOVE_ODER':
            const newState = state.filter(function (item) {
                return item._id !== action.payload;
            });
            return newState;
        default:
            return state;
    }
}

export default oderReducer;
