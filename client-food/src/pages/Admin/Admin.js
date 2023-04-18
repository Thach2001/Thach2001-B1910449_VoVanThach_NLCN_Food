import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';

const cx = classNames.bind(styles);

function Admin() {
    return (
        <AdminLayout>
            <div className={cx('wrapper')}>
                <div className={cx('report-container')}>
                    <div className={cx('report-header')}>
                        <h1 className={cx('report-name')}>List Users</h1>
                        <button className={cx('create-btn')}>Create</button>
                    </div>
                    <div className={cx('report-body')}>
                        <div className={cx('report-topic')}>
                            <h3>ID</h3>
                            <h3>Username</h3>
                            <h3>Image</h3>
                            <h3>CreateAt</h3>
                            <h3>Handle</h3>
                        </div>
                        <div className={cx('items')}>
                            <div className={cx('item1')}>
                                <h3 className={cx('t-op-nextlvl')}>64255147971fa0b0818bb8f8</h3>
                                <h3 className={cx('t-op-nextlvl')}>admin</h3>
                                <img
                                    className={cx('img-user')}
                                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                                    alt="avatar"
                                />
                                <h3 className={cx('t-op-nextlvl')}>11:38 PM 4/18/2023</h3>
                                <h3 className={cx('t-op-nextlvl')}>
                                    <button className={cx('edit-btn', 'handle')}>Edit</button>
                                    <button className={cx('delete-btn', 'handle')}>Delete</button>
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Admin;
