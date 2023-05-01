import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import AdminLayout from '~/layouts/AdminLayout';

const cx = classNames.bind(styles);

function Products() {
    const dispatch = useDispatch();
    const products = useSelector(function (state) {
        return state.product;
    });

    useEffect(() => {
        // 1. call API get list product
        async function getListProduct() {
            const response = await axios.get('auth/admin/product');
            // 2. save list product to store -> state change -> rerender app
            dispatch({
                type: 'GET_PRODUCT_LIST',
                payload: response.data,
            });
        }
        getListProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Delete product
    const handleDeleteProduct = async (idProduct) => {
        await axios.delete(`/auth/admin/product/delete/${idProduct}`);
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: idProduct,
        });
        alert(`Bạn đã xóa sản phẩm thành công`);
    };

    const time = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
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
        <AdminLayout>
            <div className={cx('wrapper')}>
                <div className={cx('report-container')}>
                    <h1 className={cx('report-name')}>Danh sách sản phẩm</h1>
                    <div className={cx('report-header')}>
                        <div className={cx('search')}>
                            <input
                                type="search"
                                placeholder="Tìm kiếm theo tên và mô tả..."
                                onChange={handleChangeSearchTerm}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <button className={cx('create-btn')}>
                            <Link to="/admin/product/create">
                                <FontAwesomeIcon icon={faPlus} /> Tạo
                            </Link>
                        </button>
                    </div>
                    {productList.length > 0 ? (
                        <>
                            <div className={cx('report-body')}>
                                <div className={cx('report-topic')}>
                                    <h3 className={cx('th-report')}>Hình ảnh</h3>
                                    <h3 className={cx('th-report')}>Tên</h3>
                                    <h3 className={cx('th-report', 'th-report-description')}>
                                        Description
                                    </h3>
                                    <h3 className={cx('th-report')}>Giá</h3>
                                    <h3 className={cx('th-report', 'th-report-createdAt')}>
                                        Thời gian tạo
                                    </h3>
                                    <h3 className={cx('th-report')}>Xử lý</h3>
                                </div>
                                {productList.map((product) => {
                                    return (
                                        <div className={cx('items')} key={product._id}>
                                            <div className={cx('item1')}>
                                                <h3 className={cx('item-content')}>
                                                    <img
                                                        src={product.image}
                                                        className={cx('img-product')}
                                                        alt="product"
                                                    />
                                                </h3>
                                                <h3 className={cx('item-content')}>
                                                    {product.name}
                                                </h3>
                                                <h3
                                                    className={cx(
                                                        'item-content',
                                                        'tem-content-description',
                                                    )}
                                                >
                                                    {product.description}
                                                </h3>
                                                <h3 className={cx('item-content')}>
                                                    {product.price
                                                        .toString()
                                                        .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}{' '}
                                                    vnđ
                                                </h3>
                                                <h3
                                                    className={cx(
                                                        'item-content',
                                                        'item-content-createdAt',
                                                    )}
                                                >
                                                    {time(product.createdAt)}
                                                </h3>
                                                <h3 className={cx('item-content')}>
                                                    <button className={cx('edit-btn', 'handle')}>
                                                        <Link
                                                            to={`/admin/product/edit/${product._id}`}
                                                        >
                                                            <FontAwesomeIcon icon={faPen} /> Sửa
                                                        </Link>
                                                    </button>
                                                    <button
                                                        className={cx('delete-btn', 'handle')}
                                                        onClick={() =>
                                                            handleDeleteProduct(product._id)
                                                        }
                                                    >
                                                        <FontAwesomeIcon icon={faTrash} /> Xóa
                                                    </button>
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <h3 className={cx('no-user')}>
                            Không có sản phẩm phù hợp với kết quả tìm kiếm
                        </h3>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default Products;
