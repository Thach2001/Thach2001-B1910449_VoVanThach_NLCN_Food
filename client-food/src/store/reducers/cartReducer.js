import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    ADJUST_QUANTITY,
    SET_CART_ITEMS,
} from '../../actionTypes/actionTypes';

const initialState = { cartItems: [], itemCount: 0 };

// Hàm xử lý thêm sản phẩm vào giỏ hàng
const addToCart = (state, product) => {
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa?
    const existingItem = state.cartItems.find((item) => item._id === product._id);
    if (existingItem) {
        // Nếu đã có rồi thì tăng số lượng lên 1
        const newCartItems = state.cartItems.map((item) =>
            item._id === existingItem._id ? { ...item, quantity: item.quantity + 1 } : item,
        );
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return {
            ...state,
            cartItems: newCartItems,
            itemCount: state.itemCount + 1,
        };
    } else {
        // Nếu chưa có thì thêm sản phẩm mới vào giỏ hàng
        const newCartItems = [...state.cartItems, { ...product, quantity: 1 }];
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));
        return {
            ...state,
            cartItems: newCartItems,
            itemCount: state.itemCount + 1,
        };
    }
};

// Hàm xử lý xoá sản phẩm khỏi giỏ hàng
const removeFromCart = (state, productId) => {
    const removeCartItems = state.cartItems.filter((item) => item._id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(removeCartItems));
    return {
        ...state,
        cartItems: removeCartItems,
    };
};

// Hàm xử lý thay đổi số lượng sản phẩm trong giỏ hàng
const adjustQuantity = (state, productId, newQuantity) => {
    const adjustCartItems = state.cartItems.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item,
    );
    localStorage.setItem('cartItems', JSON.stringify(adjustCartItems));
    return {
        ...state,
        cartItems: adjustCartItems,
    };
};

const setCartItems = (state, cartItems) => {
    return {
        ...state,
        cartItems: cartItems,
    };
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return addToCart(state, action.payload.product);

        case REMOVE_FROM_CART:
            return removeFromCart(state, action.payload.productId);

        case ADJUST_QUANTITY:
            return adjustQuantity(state, action.payload.productId, action.payload.newQuantity);

        case SET_CART_ITEMS:
            return setCartItems(state, action.payload.cartItems);

        default:
            return state;
    }
};

export default cartReducer;
