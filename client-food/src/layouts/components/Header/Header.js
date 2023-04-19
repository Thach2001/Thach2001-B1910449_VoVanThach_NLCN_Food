import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('navbar')}>
                <div className={cx('logo')}>
                    <Link href="/">
                        <img
                            src="https://previews.123rf.com/images/samorodinov/samorodinov1705/samorodinov170500039/77440974-hamburger-logo-vector-illustration-vintage-style-badges-and-labels-design-concept-for-american-fast.jpg"
                            alt="logo"
                        />
                    </Link>
                </div>
                <div className={cx('menu')}>
                    <ul>
                        <li>Trang Chủ</li>
                        <li>Sản phẩm</li>
                        <li>Dịch Vụ</li>
                        <li>Liên Hệ</li>
                    </ul>
                </div>
                <div className={cx('login-btn')}>
                    <Link to="/login">Đăng nhập</Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
