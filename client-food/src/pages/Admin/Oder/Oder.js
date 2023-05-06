import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Oder.module.scss';

import AdminLayout from '~/layouts/AdminLayout';

const cx = classNames.bind(styles);

function Oder() {
    const dispatch = useDispatch();
    const oders = useSelector(function (state) {
        return state.oder;
    });

    useEffect(() => {
        async function getListOder() {
            const response = await axios.get('auth/admin/oder');
            dispatch({
                type: 'GET_ODER_LIST',
                payload: response.data,
            });
        }
        getListOder();
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

    const handleDeleteOder = async (oderId) => {
        await axios.delete(`/auth/admin/oder/delete/${oderId}`);
        dispatch({
            type: 'REMOVE_ODER',
            payload: oderId,
        });
        alert(`Bạn đã hủy đơn hàng thành công`);
    };

    const searchOders = () => {
        return oders.filter(
            (oder) =>
                oder.username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                oder.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    };

    const oderList = searchOders();

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
                    {oderList.length > 0 ? (
                        <>
                            <div className={cx('report-body')}>
                                {oderList.map((oder) => {
                                    return (
                                        <div className={cx('items')} key={oder._id}>
                                            <div className={cx('item')}>
                                                <div className={cx('item-heading')}>
                                                    <h3>{oder.username}</h3>
                                                    <h3>{time(oder.createdAt)}</h3>
                                                </div>
                                                <h3>{oder.email}</h3>
                                                <div className={cx('list-cart')}>
                                                    <img
                                                        src={oder.cart[0].image}
                                                        alt={oder.cart[0].productname}
                                                    />
                                                    <p>{oder.cart[0].productname}</p>
                                                    <p>
                                                        {' '}
                                                        -{' '}
                                                        {oder.cart[0].price
                                                            .toString()
                                                            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                                                    </p>
                                                    <p> x {oder.cart[0].quantity}</p>
                                                </div>
                                                <div className={cx('actions')}>
                                                    <h3>
                                                        Tổng:{' '}
                                                        {oder.totalPrice
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
                                                                handleDeleteOder(oder._id)
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
                        </>
                    ) : (
                        <h3 className={cx('no-user')}>Không có kết quả tìm kiếm</h3>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default Oder;
