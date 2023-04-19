import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import AdminLayout from '~/layouts/AdminLayout';

const cx = classNames.bind(styles);

function Admin() {
    const dispatch = useDispatch();
    const users = useSelector(function (state) {
        return state.user;
    });

    useEffect(() => {
        // 1. call API get list user
        async function getListUser() {
            const response = await axios.get('auth/admin/user');
            // 2. save list user to store -> state change -> rerender app
            dispatch({
                type: 'GET_USER_LIST',
                payload: response.data,
            });
        }
        getListUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Delete user
    const handleDeleteUser = async (idUser) => {
        await axios.delete(`/auth/admin/user/delete/${idUser}`);
        dispatch({
            type: 'REMOVE_USER',
            payload: idUser,
        });
        alert(`Bạn đã xóa tài khoản thành công`);
    };
    return (
        <AdminLayout>
            <div className={cx('wrapper')}>
                <div className={cx('report-container')}>
                    <div className={cx('report-header')}>
                        <h1 className={cx('report-name')}>List Users</h1>
                        <button className={cx('create-btn')}>
                            <Link to="/user/create">Create</Link>
                        </button>
                    </div>
                    <div className={cx('report-body')}>
                        <div className={cx('report-topic')}>
                            <h3>Username</h3>
                            <h3>Email</h3>
                            <h3>Role</h3>
                            <h3>CreateAt</h3>
                            <h3>Handle</h3>
                        </div>
                        {users.map((user) => {
                            return (
                                <div className={cx('items')} key={user._id}>
                                    <div className={cx('item1')}>
                                        <h3 className={cx('item-content')}>{user.username}</h3>
                                        <h3 className={cx('item-content')}>{user.email}</h3>
                                        <h3 className={cx('item-content')}>{user.role}</h3>
                                        <h3 className={cx('item-content')}>11:38 PM 4/18/2023</h3>
                                        <h3 className={cx('item-content')}>
                                            <button className={cx('edit-btn', 'handle')}>
                                                <Link to={`/user/edit/${user._id}`}>Edit</Link>
                                            </button>
                                            <button
                                                className={cx('delete-btn', 'handle')}
                                                onClick={() => handleDeleteUser(user._id)}
                                            >
                                                Delete
                                            </button>
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Admin;
