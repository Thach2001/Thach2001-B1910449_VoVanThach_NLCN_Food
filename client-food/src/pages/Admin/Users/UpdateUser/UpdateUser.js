import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './UpdateUser.module.scss';

const cx = classNames.bind(styles);

function UpdateUser(props) {
    const navigate = useNavigate();
    // Lay id tu url
    const { _id } = useParams();

    const [updateUser, setUpdateUser] = useState({
        username: '',
        email: '',
        role: '',
    });

    useEffect(
        function () {
            async function getUserId() {
                try {
                    const response = await axios.get(`auth/admin/user/${_id}`);
                    setUpdateUser(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getUserId();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props],
    );

    function handleSubmitUpdateUser(event) {
        event.preventDefault();
        async function updateUserId() {
            try {
                await axios.put(`auth/admin/user/edit/${updateUser._id}`, updateUser);
                navigate('/admin/user');
            } catch (error) {
                console.log(error);
            }
        }
        updateUserId();
    }

    function handleChange(event) {
        setUpdateUser({
            ...updateUser,
            [event.target.name]: event.target.value,
        });
    }

    function handleCancel() {
        navigate('/admin/user');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-update-user')}>
                <form onSubmit={handleSubmitUpdateUser}>
                    <h2>Cập nhật tài khoản</h2>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            name="username"
                            value={updateUser.username}
                            onChange={handleChange}
                        />
                        <label>Tên tài khoản</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faUser} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="email"
                            required
                            name="email"
                            value={updateUser.email}
                            onChange={handleChange}
                        />
                        <label>Email</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faEnvelope} />
                    </div>
                    {/* <div className={cx('form-group')}>
                        <input type="password" required name="password" value={updateUser.password} onChange={handleChange} />
                        <label>Mật khẩu</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faLock} />
                    </div> */}
                    <div className={cx('form-group')}>
                        <select
                            className={cx('select-option')}
                            name="role"
                            value={updateUser.role}
                            onChange={handleChange}
                        >
                            <option value="Hỗ trợ">Hỗ trợ</option>
                            <option value="Khách hàng">Khách hàng</option>
                        </select>
                    </div>
                    <button type="submit" className={cx('update-btn')}>
                        Cập nhật
                    </button>
                    <button className={cx('cancel-btn')} onClick={handleCancel}>
                        Quay lại
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateUser;
