import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faRegistered,
    faSearch,
    faShoppingBasket,
    faShoppingCart,
    faSignIn,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();

    const [toggleSearch, setToggleSearch] = useState(false);
    const [toggleAccount, setToggleAccount] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to="/" className={cx('logo')}>
                    <FontAwesomeIcon className={cx('icon-logo')} icon={faShoppingBasket} />{' '}
                    FOODStore
                </Link>
                <nav className={cx('navbar')}>
                    <Link to="/">Trang chủ</Link>
                    <Link to="/products">Sản phẩm</Link>
                    <Link to="/cart">Giỏ hàng</Link>
                    <Link to="/contact">Liên hệ</Link>
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
                            <span className={cx('badge')}>12</span>
                        </Link>
                    </div>
                    <div
                        className={cx('action-btn')}
                        onClick={() => setToggleAccount(!toggleAccount)}
                    >
                        <FontAwesomeIcon icon={faUser} />
                    </div>
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
                                className={cx('icon-singin')}
                                icon={faSignIn}
                            ></FontAwesomeIcon>
                            <Link to="/login">Đăng nhập</Link>
                        </div>
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
