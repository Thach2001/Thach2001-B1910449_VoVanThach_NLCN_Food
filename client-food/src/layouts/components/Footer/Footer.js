import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faSchool } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('content', 'links')}>
                <h2>Đường Dẫn</h2>
                <ul>
                    <li>
                        <Link to="/">Trang Chủ</Link>
                    </li>
                    <li>
                        <Link to="/">Trang Chủ</Link>
                    </li>
                    <li>
                        <Link to="/">Trang Chủ</Link>
                    </li>
                    <li>
                        <Link to="/">Trang Chủ</Link>
                    </li>
                    <li>
                        <Link to="/">Trang Chủ</Link>
                    </li>
                </ul>
            </div>
            <div className={cx('content', 'about')}>
                <h2>Về Chúng Tôi</h2>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit</p>
                <ul className={cx('social-icon')}>
                    <li>
                        <Link to="https://facebook.com">
                            <FontAwesomeIcon icon={faFacebook} />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://twitter.com">
                            <FontAwesomeIcon icon={faTwitter} />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://instagram.com">
                            <FontAwesomeIcon icon={faInstagram} />
                        </Link>
                    </li>
                    <li>
                        <Link to="https://youtube.com">
                            <FontAwesomeIcon icon={faYoutube} />
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={cx('content', 'contact')}>
                <h2>Thông Tin Liên Hệ</h2>
                <ul className={cx('info')}>
                    <li>
                        <Link to="https://ctu.edu.vn">
                            <FontAwesomeIcon icon={faSchool} />
                            <span>Đại học Cần Thơ</span>
                        </Link>
                    </li>
                    <li>
                        <Link>
                            <FontAwesomeIcon icon={faPhone} />
                            <span>+84 123 456 789</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="https://youtube.com">
                            <FontAwesomeIcon icon={faEnvelope} />
                            <span>vovanthach2001@gmail.com</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
export default Footer;
