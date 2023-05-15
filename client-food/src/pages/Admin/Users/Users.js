import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import classNames from 'classnames/bind';

import styles from './Users.module.scss';
import AdminLayout from '~/layouts/AdminLayout';
import Button from '~/components/Button/Button';

const cx = classNames.bind(styles);

function Users() {
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
        cogoToast.success('Tài khoản đã được xóa', { position: 'top-right' });
    };

    const time = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    // search
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const searchUsers = () => {
        return users.filter(
            (user) =>
                user.username.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    };

    const userList = searchUsers();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const articlesPerPage = 6;
    const totalArticles = userList.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = userList.slice(indexOfFirstArticle, indexOfLastArticle);

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
                    <h1 className={cx('report-name')}>Danh sách tài khoản</h1>
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
                        <Button
                            to="/user/create"
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            secondary
                        >
                            Tạo
                        </Button>
                    </div>
                    {currentArticles.length > 0 ? (
                        <>
                            <div className={cx('report-body')}>
                                <div className={cx('report-topic')}>
                                    <h3 className={cx('th-report')}>Tên tài khoản</h3>
                                    <h3 className={cx('th-report', 'th-report-email')}>Email</h3>
                                    <h3 className={cx('th-report')}>Vai trò</h3>
                                    <h3 className={cx('th-report', 'th-report-createdAt')}>
                                        Thời gian tạo
                                    </h3>
                                    <h3 className={cx('th-report')}>Xử lý</h3>
                                </div>
                                {currentArticles.map((user) => {
                                    return (
                                        <div className={cx('items')} key={user._id}>
                                            <div className={cx('item1')}>
                                                <h3 className={cx('item-content')}>
                                                    {user.username}
                                                </h3>
                                                <h3
                                                    className={cx(
                                                        'item-content',
                                                        'item-content-email',
                                                    )}
                                                >
                                                    {user.email}
                                                </h3>
                                                <h3 className={cx('item-content')}>{user.role}</h3>
                                                <h3
                                                    className={cx(
                                                        'item-content',
                                                        'item-content-createdAt',
                                                    )}
                                                >
                                                    {time(user.createdAt)}
                                                </h3>
                                                <h3 className={cx('item-content')}>
                                                    <Button
                                                        to={`/user/edit/${user._id}`}
                                                        leftIcon={<FontAwesomeIcon icon={faPen} />}
                                                        small
                                                        secondary
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        leftIcon={
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        }
                                                        small
                                                        primary
                                                    >
                                                        Xóa
                                                    </Button>
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={cx('pagination')}>{pageItems}</ul>
                        </>
                    ) : (
                        <h3 className={cx('no-user')}>
                            Không có tài khoản phù hợp với kết quả tìm kiếm
                        </h3>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default Users;
