import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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

    return (
        <AdminLayout>
            <div className={cx('wrapper')}>
                <div className={cx('report-container')}>
                    <div className={cx('report-header')}>
                        <h1 className={cx('report-name')}>List Products</h1>
                        <button className={cx('create-btn')}>
                            <Link to="/admin/product/create">Create</Link>
                        </button>
                    </div>
                    <div className={cx('report-body')}>
                        <div className={cx('report-topic')}>
                            <h3 className={cx('th-report')}>Name</h3>
                            <h3 className={cx('th-report')}>Image</h3>
                            <h3 className={cx('th-report', 'th-report-description')}>
                                Description
                            </h3>
                            <h3 className={cx('th-report')}>Price</h3>
                            <h3 className={cx('th-report', 'th-report-createdAt')}>CreatedAt</h3>
                            <h3 className={cx('th-report')}>Handle</h3>
                        </div>
                        {products.map((product) => {
                            return (
                                <div className={cx('items')} key={product._id}>
                                    <div className={cx('item1')}>
                                        <h3 className={cx('item-content')}>{product.name}</h3>
                                        <h3 className={cx('item-content')}>
                                            <img
                                                src={product.image}
                                                className={cx('img-product')}
                                                alt="product"
                                            />
                                        </h3>
                                        <h3
                                            className={cx(
                                                'item-content',
                                                'tem-content-description',
                                            )}
                                        >
                                            {product.description}
                                        </h3>
                                        <h3 className={cx('item-content')}>{product.price}</h3>
                                        <h3
                                            className={cx('item-content', 'item-content-createdAt')}
                                        >
                                            {product.createdAt}
                                        </h3>
                                        <h3 className={cx('item-content')}>
                                            <button className={cx('edit-btn', 'handle')}>
                                                <Link to={`/admin/product/edit/${product._id}`}>
                                                    Edit
                                                </Link>
                                            </button>
                                            <button
                                                className={cx('delete-btn', 'handle')}
                                                onClick={() => handleDeleteProduct(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </h3>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export default Products;
