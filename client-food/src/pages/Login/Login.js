import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import jwtdecode from 'jwt-decode';
import classNames from 'classnames/bind';

import styles from './Login.module.scss';

const cx = classNames.bind(styles);

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [useInput, setUseInput] = useState({
        email: '',
        password: '',
    });

    const handleChangeInput = (event) => {
        setUseInput({
            ...useInput,
            [event.target.name]: event.target.value, // lay gia tri email va password
        });
    };

    const handleSubmitLogin = async (event) => {
        event.preventDefault(); // ngan chan submit form load lai trang
        // call API login
        const response = await axios.post('api/auth/login', useInput);

        // save user login to store
        if (response.status === 200) {
            const accessToken = response.data.accessToken;
            const userLogin = jwtdecode(accessToken);
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: userLogin,
            });

            // save jwt to local storage
            localStorage.setItem('accessToken', accessToken);

            // navigate to admin page or home page
            if (userLogin.role === 'admin') {
                navigate('/admin/user');
            } else {
                navigate('/home');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-box')}>
                <form onSubmit={handleSubmitLogin}>
                    <h2>Đăng nhập</h2>
                    <div className={cx('input-box')}>
                        <input
                            type="email"
                            required
                            value={useInput.email}
                            name="email"
                            onChange={handleChangeInput}
                        />
                        <label>Email</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faEnvelope} />
                    </div>
                    <div className={cx('input-box')}>
                        <input
                            type="password"
                            required
                            value={useInput.password}
                            name="password"
                            onChange={handleChangeInput}
                        />
                        <label>Mật khẩu</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faLock} />
                    </div>

                    <button className={cx('login-btn')}>Đăng nhập</button>
                    <div className={cx('register')}>
                        <p>
                            Nếu bạn chưa có tài khoản <Link to="/register">Đăng ký ngay!</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
