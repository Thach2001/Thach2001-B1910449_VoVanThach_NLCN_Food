import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import LandingPage from '~/components/LandingPage/LandingPage';

import { addToCart } from '../../actions/cart';

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

    // add products to cart
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    // search
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const searchProducts = () => {
        return products.filter(
            (product) =>
                product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                product.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    };

    const productList = searchProducts();

    return (
        <div className={cx('wrapper')}>
            <LandingPage />
            <div className={cx('inner')}>
                <h1 className={cx('heading')}>
                    <span>Thức ăn nhanh</span>
                </h1>
                <form className={cx('search-form')}>
                    <input
                        type="search"
                        placeholder="Tìm kiếm sản phẩm..."
                        onChange={handleChangeSearchTerm}
                    />
                    <label>
                        <FontAwesomeIcon icon={faSearch} />
                    </label>
                </form>
                <div className={cx('products')}>
                    {productList.map((product) => (
                        <ul className={cx('product-box')} key={product._id}>
                            <li>
                                <img src={product.image} alt={product.name} />
                                <h3>{product.name}</h3>
                                <div className={cx('price')}>
                                    {product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                    vnđ
                                </div>
                                <div className={cx('description')}>{product.description}</div>
                                <button
                                    className={cx('cart-btn')}
                                    onClick={() => handleAddToCart(product)}
                                >
                                    Thêm vào giỏ hàng
                                </button>
                            </li>
                        </ul>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
