import classNames from 'classnames/bind';
import styles from './LandingPage.module.scss';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

function LandingPage() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h3>
                    Cung cấp thức trái cây và rau củ <span>sạch và organic</span> cho bạn
                </h3>
                <p>
                    Được sản xuất và chế biến một cách tự nhiên, không sử dụng bất kỳ loại hóa chất
                    hay chất bảo quản nào. Sản phẩm được sản xuất và giữ gìn bằng các phương pháp
                    hữu cơ, bao gồm sử dụng phân bón và thuốc trừ sâu tự nhiên để giúp bảo vệ và
                    phát triển cây trồng
                </p>
                <Button className={cx('shop-btn')} to="/products" large outline>
                    Mua ngay{' '}
                </Button>
            </div>
        </div>
    );
}

export default LandingPage;
