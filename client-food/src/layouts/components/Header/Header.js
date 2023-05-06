import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRegistered,
    faSearch,
    faShoppingCart,
    faSignOut,
    faStore,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const itemCount = useSelector((state) => state.cart.itemCount);
    const authState = useSelector((state) => state.auth);

    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleAccount, setToggleAccount] = useState(false);

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
                if (error.response.status === 401) {
                    navigate('/');
                }
            }
        }

        getUserlogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // []: chi chay 1 lan duy nhat khi return chay xong
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/home" className={cx('logo')}>
                    <FontAwesomeIcon className={cx('icon-logo')} icon={faStore} /> FOODStore
                </Link>
                <nav className={cx('navbar')}>
                    <Link to="/home">Trang chủ</Link>
                    <Link to="/products">Sản phẩm</Link>
                    <Link to="/cart">Giỏ hàng</Link>
                    <Link to="/contact">Liên hệ</Link>
                    <Link to="/feedback">Đánh giá</Link>
                </nav>
                <div className={cx('actions')}>
                    <div
                        className={cx('action-btn')}
                        onClick={() => setToggleSearch(!toggleSearch)}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                    <div className={cx('action-btn')}>
                        <Link to="/cart">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            <span className={cx('badge')}>{itemCount}</span>
                        </Link>
                    </div>

                    {authState.user.role === 'admin' ? (
                        <button className={cx('admin-btn')}>
                            <Link to="/admin/user">{authState.user.username}</Link>
                        </button>
                    ) : (
                        <div
                            className={cx('action-btn')}
                            onClick={() => setToggleAccount(!toggleAccount)}
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    )}
                </div>
                {toggleSearch && (
                    <form className={cx('search-form')}>
                        <input type="search" placeholder="Tìm kiếm..." />
                        <label>
                            <FontAwesomeIcon icon={faSearch} />
                        </label>
                    </form>
                )}
                {toggleAccount && (
                    <div className={cx('account')}>
                        <div className={cx('account-btn')}>
                            <FontAwesomeIcon
                                className={cx('icon-register')}
                                icon={faRegistered}
                            ></FontAwesomeIcon>
                            <Link to="/register">Đăng ký</Link>
                        </div>
                        <div className={cx('account-btn')} onClick={handleLogout}>
                            <FontAwesomeIcon
                                className={cx('icon-singout')}
                                icon={faSignOut}
                            ></FontAwesomeIcon>
                            <Link>Đăng xuất</Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
