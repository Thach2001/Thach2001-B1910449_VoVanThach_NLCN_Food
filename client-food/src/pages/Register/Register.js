import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Register.module.scss';

const cx = classNames.bind(styles);

function Register() {
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleChangeUserName = (event) => {
        setUserName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('api/auth/register', {
            username: username,
            email: email,
            password: password,
        });

        if (response.status === 200) {
            alert(`Chúc mừng ${username} đã đăng ký tài khoản thành công`);
            navigate('/login');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-register')}>
                <form onSubmit={handleSubmit}>
                    <h2>Đăng ký</h2>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={handleChangeUserName}
                        />
                        <label>Tên tài khoản</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faUser} />
                    </div>
                    <div className={cx('form-group')}>
                        <input type="email" required value={email} onChange={handleChangeEmail} />
                        <label>Email</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faEnvelope} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={handleChangePassword}
                        />
                        <label>Mật khẩu</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faLock} />
                    </div>
                    <button className={cx('register-btn')}>Đăng ký</button>
                    <div className={cx('login-btn')}>
                        <p>
                            Nếu bạn đã có tài khoản <Link to="/login">Đăng nhập ngay!</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;
