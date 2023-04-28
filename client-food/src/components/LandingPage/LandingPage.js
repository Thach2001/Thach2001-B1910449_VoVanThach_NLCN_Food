import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './LandingPage.module.scss';

const cx = classNames.bind(styles);

function LandingPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h3>
                    Cung cấp thức ăn nhanh, rau củ và trái cây <span>sạch và organic</span> cho bạn
                </h3>
                <p>Cung cấp thức ăn nhanh, rau củ và trái cây sạch và organic cho bạn</p>
                <Link to="/products" className={cx('shop-btn')}>
                    Mua ngay
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;