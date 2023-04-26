import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import LandingPage from '~/components/LandingPage/LandingPage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const cx = classNames.bind(styles);

function Home() {
    const dispatch = useDispatch();
    const products = useSelector(function (state) {
        return state.product;
    });

    useEffect(() => {
        async function getListProduct() {
            const response = await axios.get('auth/admin/product');
            dispatch({
                type: 'GET_PRODUCT_LIST',
                payload: response.data,
            });
        }
        getListProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('wrapper')}>
            <LandingPage />
            <div className={cx('inner')}>
                <h1 className={cx('heading')}>
                    <span>Thức ăn nhanh</span>
                </h1>
                <div className={cx('products')}>
                    {products.map((product) => (
                        <div className={cx('product-box')} key={product._id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <div className={cx('price')}>
                                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ
                            </div>
                            <div className={cx('description')}>{product.description}</div>
                            <Link className={cx('cart-btn')}>Thêm vào giỏ hàng</Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cx('inner')}>
                <h1 className={cx('heading')}>
                    <span>Rau củ</span>
                </h1>
                <div className={cx('products')}>
                    {products.map((product) => (
                        <div className={cx('product-box')} key={product._id}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                            <div className={cx('price')}>
                                {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} vnđ
                            </div>
                            <div className={cx('description')}>{product.description}</div>
                            <Link className={cx('cart-btn')}>Thêm vào giỏ hàng</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
