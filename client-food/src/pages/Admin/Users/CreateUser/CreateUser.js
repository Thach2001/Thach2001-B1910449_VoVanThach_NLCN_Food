import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './CreateUser.module.scss';

const cx = classNames.bind(styles);

function CreateUser() {
    const navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleChangeUserName = (event) => {
        setUserName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleChangeRole = (event) => {
        setRole(event.target.value);
    };

    const handleSubmitAddUser = async (event) => {
        event.preventDefault();
        const response = await axios.post('auth/admin/user/create', {
            username: username,
            email: email,
            password: password,
            role: role,
        });

        if (response.status === 200) {
            alert(`Tạo tài khoản ${username.toUpperCase()} thành công`);
            navigate('/admin/user');
        }
    };

    function handleCancel() {
        navigate('/admin/user');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-create-user')}>
                <form>
                    <h2>Thêm tài khoản</h2>
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
                    <div className={cx('form-group')}>
                        <select
                            className={cx('select-option')}
                            value={role}
                            onChange={handleChangeRole}
                        >
                            <option value="Hỗ trợ">Hỗ trợ</option>
                            <option value="Khách hàng">Khách hàng</option>
                        </select>
                    </div>
                    <button className={cx('create-btn')} onClick={handleSubmitAddUser}>
                        Thêm mới
                    </button>
                    <button className={cx('cancel-btn')} onClick={handleCancel}>
                        Quay lại
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateUser;
