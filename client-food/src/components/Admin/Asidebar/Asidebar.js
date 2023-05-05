import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faContactBook,
    faHome,
    faPieChart,
    faShoppingCart,
    faSignOut,
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Asidebar.module.scss';

const cx = classNames.bind(styles);

function Asidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/');
    };
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('nav')}>
                <div className={cx('nav-option')}>
                    <h3 className={cx('content')}>
                        <Link to="/home">
                            <button className={cx('btn-icon')}>
                                <FontAwesomeIcon icon={faHome} />
                            </button>
                            Trang chủ
                        </Link>
                    </h3>
                </div>
                <div className={cx('nav-option')}>
                    <h3 className={cx('content')}>
                        <Link to="/admin/user">
                            <button className={cx('btn-icon')}>
                                <FontAwesomeIcon icon={faUsers} />
                            </button>
                            Tài khoản
                        </Link>
                    </h3>
                </div>
                <div className={cx('nav-option')}>
                    <h3 className={cx('content')}>
                        <Link to="/admin/product">
                            <button className={cx('btn-icon')}>
                                <FontAwesomeIcon icon={faPieChart} />
                            </button>
                            Sản phẩm
                        </Link>
                    </h3>
                </div>
                <div className={cx('nav-option')}>
                    <h3 className={cx('content')}>
                        <Link to="/admin/oder">
                            <button className={cx('btn-icon')}>
                                <FontAwesomeIcon icon={faShoppingCart} />
                            </button>
                            Đơn hàng
                        </Link>
                    </h3>
                </div>
                <div className={cx('nav-option')}>
                    <h3 className={cx('content')}>
                        <Link to="/admin/contact">
                            <button className={cx('btn-icon')}>
                                <FontAwesomeIcon icon={faContactBook} />
                            </button>
                            Liên hệ & Góp ý
                        </Link>
                    </h3>
                </div>
                <div className={cx('nav-option')}>
                    <h3 className={cx('content')} onClick={handleLogout}>
                        <button className={cx('btn-icon')}>
                            <FontAwesomeIcon icon={faSignOut} />
                        </button>
                        Đăng xuất
                    </h3>
                </div>
            </nav>
        </div>
    );
}

export default Asidebar;
