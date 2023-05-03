const intialStateContact = [];

function contactReducer(state = intialStateContact, action) {
    switch (action.type) {
        case 'GET_CONTACT_LIST':
            return [...action.payload];
        default:
            return state;
    }
}

export default contactReducer;
