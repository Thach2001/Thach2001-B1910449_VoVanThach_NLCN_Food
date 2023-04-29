import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { removeFromCart, adjustQuantity } from '../../actions/cart';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart() {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleChangeQuantity = (productId, newQuantity) => {
        dispatch(adjustQuantity(productId, newQuantity));
    };

    const handleCheckout = () => {
        alert('Thanh toán');
    };

    const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>Giỏ hàng</h1>

            <div className={cx('inner')}>
                {cartItems.length > 0 ? (
                    <>
                        <table className={cx('cart-table')}>
                            <tr>
                                <th>Tên sản phẩm</th>
                                <th>Hình ảnh</th>
                                <th>Mô tả</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Xử lý</th>
                            </tr>
                            <tr>
                                {cartItems.map((item) => (
                                    <>
                                        <td key={item._id}>{item.name}</td>
                                        <td>
                                            <img
                                                className={cx('img')}
                                                src={item.image}
                                                alt={item.name}
                                            />
                                        </td>
                                        <td>{item.description}</td>
                                        <td>
                                            <input
                                                type="number"
                                                className={cx('quantity')}
                                                value={item.quantity}
                                                min="1"
                                                onChange={(e) =>
                                                    handleChangeQuantity(item.id, e.target.value)
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
                                                onClick={() => handleRemoveFromCart(item.id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} /> Xóa
                                            </button>
                                        </td>
                                    </>
                                ))}
                            </tr>
                        </table>
                        <div className={cx('total-checkout')}>
                            <p className={cx('total-price')}>
                                Tổng giá tiền:{' '}
                                <span>
                                    {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                    vnđ
                                </span>{' '}
                            </p>
                            <button className={cx('checkout-btn')} onClick={handleCheckout}>
                                Thanh toán
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={cx('no-cart')}>
                        <p>Không có sản phẩm trong giỏ hàng</p>
                        <button>Thêm sản phẩm</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
