import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';

import AdminLayout from '~/layouts/AdminLayout';

const cx = classNames.bind(styles);

function Order() {
    const dispatch = useDispatch();
    const orders = useSelector(function (state) {
        return state.order;
    });

    useEffect(() => {
        async function getListOrder() {
            const response = await axios.get('auth/admin/order');
            dispatch({
                type: 'GET_ORDER_LIST',
                payload: response.data,
            });
        }
        getListOrder();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const time = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    // search
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleDeleteOrder = async (orderId) => {
        await axios.delete(`/auth/admin/order/delete/${orderId}`);
        dispatch({
            type: 'REMOVE_ORDER',
            payload: orderId,
        });
        alert(`Bạn đã hủy đơn hàng thành công`);
    };

    const searchOrders = () => {
        return orders.filter(
            (order) =>
                order.username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                order.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    };

    const orderList = searchOrders();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const articlesPerPage = 6;
    const totalArticles = orderList.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = orderList.slice(indexOfFirstArticle, indexOfLastArticle);

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
        <AdminLayout>
            <div className={cx('wrapper')}>
                <div className={cx('report-container')}>
                    <h1 className={cx('report-name')}>Đơn hàng</h1>
                    <div className={cx('report-header')}>
                        <div className={cx('search')}>
                            <input
                                type="search"
                                placeholder="Tìm kiếm theo tên và email..."
                                onChange={handleChangeSearchTerm}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                    {currentArticles.length > 0 ? (
                        <>
                            <div className={cx('report-body')}>
                                {currentArticles.map((order) => {
                                    return (
                                        <div className={cx('items')} key={order._id}>
                                            <div className={cx('item')}>
                                                <div className={cx('item-heading')}>
                                                    <h3>{order.username}</h3>
                                                    <h3>{time(order.createdAt)}</h3>
                                                </div>
                                                <h3>{order.email}</h3>
                                                <div className={cx('cart-container')}>
                                                    {order.cart.map((item) => (
                                                        <div
                                                            key={item._id}
                                                            className={cx('list-cart')}
                                                        >
                                                            <img
                                                                src={item.image}
                                                                alt={item.productname}
                                                            />
                                                            <p>{item.productname}</p>
                                                            <p>
                                                                {item.price
                                                                    .toString()
                                                                    .replace(
                                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                                        '.',
                                                                    )}
                                                            </p>
                                                            <p> x {item.quantity}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className={cx('actions')}>
                                                    <h3>
                                                        Tổng:{' '}
                                                        {order.totalPrice
                                                            .toString()
                                                            .replace(
                                                                /\B(?=(\d{3})+(?!\d))/g,
                                                                '.',
                                                            )}{' '}
                                                        vnđ
                                                    </h3>
                                                    <div>
                                                        <button
                                                            className={cx('delete-btn')}
                                                            onClick={() =>
                                                                handleDeleteOrder(order._id)
                                                            }
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} /> Hủy
                                                        </button>
                                                        <button className={cx('check-btn')}>
                                                            <FontAwesomeIcon icon={faCheck} /> Xác
                                                            nhận
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={cx('pagination')}>{pageItems}</ul>
                        </>
                    ) : (
                        <h3 className={cx('no-user')}>Không có kết quả tìm kiếm</h3>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default Order;
