import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    return (
        <header>
            <div className={cx('trademark')}>
                <div className={cx('logo')}>FastFood</div>
            </div>

            <div className={cx('search')}>
                <input type="text" placeholder="Tìm kiếm..." />
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>

            <div className={cx('info')}>
                <button className={cx('role-name')}>Admin</button>
                <div className={cx('avatar')}>
                    <img
                        src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                        className={cx('img-avatar')}
                        alt="avatar"
                    />
                </div>
            </div>
        </header>
    );
}

export default Navbar;
