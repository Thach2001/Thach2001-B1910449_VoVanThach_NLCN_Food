import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Navbar.module.scss';

const cx = classNames.bind(styles);

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const authState = useSelector((state) => state.auth);

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
                    navigate('/login');
                }
            }
        }

        getUserlogin();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // []: chi chay 1 lan duy nhat khi return chay xong

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
                <button className={cx('role-name')}>
                    <Link to="/admin" className="btn btn-success">
                        {authState.user.username}
                    </Link>
                </button>
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
