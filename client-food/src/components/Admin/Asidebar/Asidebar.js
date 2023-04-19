import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPizzaSlice, faSignOut, faUsers } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './Asidebar.module.scss';

const cx = classNames.bind(styles);

function Asidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    };
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
                    <h3 className={cx('content')} onClick={handleLogout}>
                        Logout
                    </h3>
                </div>
            </nav>
        </div>
    );
}

export default Asidebar;
