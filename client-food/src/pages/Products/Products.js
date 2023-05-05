import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { addToCart } from '../../actions/cart';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Products.module.scss';

const cx = classNames.bind(styles);

function Products() {
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
                product.productname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                product.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                product.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    };

    const productList = searchProducts();

    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h1 className={cx('heading')}>
                    <span>Sản phẩm</span>
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
                    {productList.length > 0 ? (
                        <>
                            {productList.map((product) => (
                                <ul className={cx('product-box')} key={product._id}>
                                    <li>
                                        <img src={product.image} alt={product.productname} />
                                        <h3>{product.productname}</h3>
                                        <div className={cx('price')}>
                                            {product.price
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                            vnđ
                                        </div>
                                        <div className={cx('description')}>
                                            {product.description}
                                        </div>
                                        <button
                                            className={cx('cart-btn')}
                                            onClick={() => handleAddToCart(product)}
                                        >
                                            Thêm vào giỏ hàng
                                        </button>
                                    </li>
                                </ul>
                            ))}
                        </>
                    ) : (
                        <h3 className={cx('no-product')}>
                            Không có sản phẩm phù hợp với kết quả tìm kiếm
                        </h3>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Products;
