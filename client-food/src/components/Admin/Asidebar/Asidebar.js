import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faSignOut, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Asidebar.module.scss';

const cx = classNames.bind(styles);

function Asidebar() {
    return (
        <div className={cx('wrapper')}>
            <nav className={cx('nav')}>
                <div className={cx('nav-option')}>
                    <button className={cx('btn-icon')}>
                        <FontAwesomeIcon icon={faUsers} />
                    </button>
                    <h3 className={cx('content')}>
                        <Link to="/admin">List Users</Link>
                    </h3>
                </div>
                <div className={cx('nav-option')}>
                    <button className={cx('btn-icon')}>
                        <FontAwesomeIcon icon={faPizzaSlice} />
                    </button>
                    <h3 className={cx('content')}>
                        <Link to="/admin/product">List Products</Link>
                    </h3>
                </div>
                <div className={cx('nav-option')}>
                    <button className={cx('btn-icon')}>
                        <FontAwesomeIcon icon={faSignOut} />
                    </button>
                    <h3 className={cx('content')}>Logout</h3>
                </div>
            </nav>
        </div>
    );
}

export default Asidebar;
