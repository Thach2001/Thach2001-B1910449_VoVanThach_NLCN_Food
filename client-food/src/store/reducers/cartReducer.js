import { ADD_TO_CART, REMOVE_FROM_CART, ADJUST_QUANTITY } from '../../actionTypes/actionTypes';

const initialState = [];

// Hàm xử lý thêm sản phẩm vào giỏ hàng
const addToCart = (state, product) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa?
    const existingItem = state.find((item) => item.id === product.id);
    if (existingItem) {
        // Nếu đã có rồi thì tăng số lượng lên 1
        return state.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
    } else {
        // Nếu chưa có thì thêm sản phẩm mới vào giỏ hàng
        return [...state, { ...product, quantity: 1 }];
    }
};

// Hàm xử lý xoá sản phẩm khỏi giỏ hàng
const removeFromCart = (state, productId) => {
    return state.filter((item) => item.id !== productId);
};

// Hàm xử lý thay đổi số lượng sản phẩm trong giỏ hàng
const adjustQuantity = (state, productId, newQuantity) => {
    return state.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item));
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return addToCart(state, action.payload.product);

        case REMOVE_FROM_CART:
            return removeFromCart(state, action.payload.productId);

        case ADJUST_QUANTITY:
            return adjustQuantity(state, action.payload.productId, action.payload.newQuantity);

        default:
            return state;
    }
};

export default cartReducer;
