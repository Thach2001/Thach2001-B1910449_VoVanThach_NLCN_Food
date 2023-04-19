const intialStateUser = [];

function userReducer(state = intialStateUser, action) {
   switch (action.type) {
      case "GET_USER_LIST":
         return [...action.payload];
      case "REMOVE_USER":
         const newState = state.filter(function (item) {
            return item._id !== action.payload;
         });
         return newState;
      default:
         return state;
   }
}

export default userReducer;
