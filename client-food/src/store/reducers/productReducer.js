const intialStateUser = [];

function productReducer(state = intialStateUser, action) {
   switch (action.type) {
      case "GET_PRODUCT_LIST":
         return [...action.payload];
      case "REMOVE_PRODUCT":
         const newState = state.filter(function (item) {
            return item._id !== action.payload;
         });
         return newState;
      default:
         return state;
   }
}

export default productReducer;
