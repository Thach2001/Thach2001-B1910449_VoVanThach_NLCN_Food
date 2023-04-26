import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';

import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

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
            <section className={cx('home')}>
                <div className={cx('content')}>
                    <h3>
                        Cung cấp thức ăn nhanh, rau củ và trái cây <span>sạch và organic</span> cho
                        bạn
                    </h3>
                    <p>Cung cấp thức ăn nhanh, rau củ và trái cây sạch và organic cho bạn</p>
                    <Link to="/products" className={cx('shop-btn')}>
                        Mua ngay
                    </Link>
                </div>
            </section>
            <section className={cx('products')}>
                <h1 className={cx('heading')}>
                    <span>Thức ăn nhanh</span>
                </h1>

                <div className={cx('product-slider')}>
                    <Swiper
                        loop={true}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 7500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        modules={[Pagination, Autoplay]}
                        className={cx('product-slider', 'mySwiper')}
                    >
                        <div className={cx('product-wrapper')}>
                            {products.map((product) => {
                                return (
                                    <SwiperSlide className={cx('box')} key={product._id}>
                                        <img src={product.image} alt="product" />
                                        <h3>{product.name}</h3>
                                        <div className={cx('price')}>
                                            {product.price
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                            vnđ
                                        </div>
                                        <div className={cx('description')}>
                                            {product.description}
                                        </div>
                                        <Link className={cx('cart-btn')}>Thêm vào giỏ hàng</Link>
                                    </SwiperSlide>
                                );
                            })}
                        </div>
                    </Swiper>
                </div>

                {/* <h1 className={cx('heading')}>
                    <span>Trái cây</span>
                </h1>
                <div className={cx('product-slider')}>
                    <Swiper
                        loop={true}
                        spaceBetween={20}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 7500,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        modules={[Pagination, Autoplay]}
                        className={cx('product-slider', 'mySwiper')}
                    >
                        <div className={cx('product-wrapper')}>
                            {products.map((product) => {
                                return (
                                    <SwiperSlide className={cx('box')} key={product._id}>
                                        <img src={product.image} alt="product" />
                                        <h3>{product.name}</h3>
                                        <div className={cx('price')}>
                                            {product.price
                                                .toString()
                                                .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                            vnđ
                                        </div>
                                        <div className={cx('description')}>
                                            {product.description}
                                        </div>
                                        <Link className={cx('cart-btn')}>Thêm vào giỏ hàng</Link>
                                    </SwiperSlide>
                                );
                            })}
                        </div>
                    </Swiper>
                </div> */}
            </section>
        </div>
    );
}

export default Home;
