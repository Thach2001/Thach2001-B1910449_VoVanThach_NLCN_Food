import { useState, useEffect } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart, adjustQuantity, setCartItems } from '../../actions/cart';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart({ cartItems, onSetCartItems }) {
    const dispatch = useDispatch();
    const authState = useSelector((state) => state.auth.user);

    useEffect(() => {
        async function getUserlogin() {
            try {
                const response = await axios.get('api/auth/me');
                const user = response.data;
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: user,
                });
            } catch (error) {
                console.log(error);
            }
        }

        getUserlogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        onSetCartItems(cartItems);
        setItemCount(cartItems.reduce((total, item) => total + item.quantity, 0));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleChangeQuantity = (productId, newQuantity) => {
        dispatch(adjustQuantity(productId, newQuantity));
    };

    const handleCheckout = async (event) => {
        event.preventDefault();

        const data = {
            authState: authState,
            cartItems: cartItems,
            totalPrice: totalPrice,
        };

        const response = await axios.post('auth/admin/oder/create', {
            data,
        });

        if (response.status === 200) {
            alert(`Đơn hàng của bạn đang chờ xử lý`);
            localStorage.removeItem('cartItems');
            window.location.reload();
        }
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const articlesPerPage = 4;
    const totalArticles = cartItems.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = cartItems.slice(indexOfFirstArticle, indexOfLastArticle);

    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
            <li key={i}>
                <button
                    className={i === currentPage ? cx('active') : ''}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            </li>,
        );
    }

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>
                <span>Giỏ hàng</span>
            </h1>
            <div className={cx('inner')}>
                {currentArticles.length > 0 ? (
                    <>
                        <div className={cx('cart-header')}>
                            <button className={cx('continue-btn')}>
                                <Link to="/home">
                                    <FontAwesomeIcon
                                        className={'icon-arrowleft'}
                                        icon={faArrowLeft}
                                    />{' '}
                                    Tiếp tục mua hàng
                                </Link>
                            </button>
                            <h3 className={cx('product-count')}>
                                Số sản phẩm: <span>{itemCount}</span>
                            </h3>
                        </div>
                        <table className={cx('cart-table')}>
                            <tbody>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Mô tả</th>
                                    <th>Số lượng</th>
                                    <th>Giá</th>
                                    <th>Xử lý</th>
                                </tr>
                                {currentArticles.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            <img
                                                className={cx('img')}
                                                src={item.image}
                                                alt={item.productname}
                                            />
                                        </td>
                                        <td>{item.productname}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className={cx('quantity')}
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) =>
                                                    handleChangeQuantity(item._id, e.target.value)
                                                }
                                            />
                                        </td>
                                        <td>
                                            {item.price
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                            vnđ
                                        </td>
                                        <td>
                                            <button
                                                className={cx('remove-btn')}
                                                onClick={() => handleRemoveFromCart(item._id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} /> Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <ul className={cx('pagination')}>{pageItems}</ul>
                        <div className={cx('total-checkout')}>
                            <p className={cx('total-price')}>
                                Tổng giá tiền:{' '}
                                <span>
                                    {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                    vnđ
                                </span>
                            </p>
                            <button className={cx('checkout-btn')} onClick={handleCheckout}>
                                Thanh toán
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={cx('no-cart')}>
                        <p>Không có sản phẩm trong giỏ hàng</p>
                        <button className={cx('add-product')}>
                            <Link to="/home">Thêm sản phẩm</Link>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    cartItems: state.cart.cartItems,
});

const mapDispatchToProps = (dispatch) => ({
    onSetCartItems: (cartItems) => dispatch(setCartItems(cartItems)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
