import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';

import Navbar from '~/components/Admin/Navbar';
import Asidebar from '~/components/Admin/Asidebar';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Navbar />
            <div className={cx('main-container')}>
                <Asidebar />
                {children}
            </div>
        </div>
    );
}

export default AdminLayout;
