import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import cogoToast from 'cogo-toast';
import classNames from 'classnames/bind';

import styles from './Products.module.scss';
import AdminLayout from '~/layouts/AdminLayout';
import Button from '~/components/Button/Button';

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
    const handleDeleteProduct = async (ProductId) => {
        await axios.delete(`/auth/admin/product/delete/${ProductId}`);
        dispatch({
            type: 'REMOVE_PRODUCT',
            payload: ProductId,
        });
        cogoToast.success('Sản phẩm đã được xóa', { position: 'top-right' });
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
                (product.productname &&
                    product.productname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) ||
                product.category.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                product.description.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    };

    const productList = searchProducts();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const articlesPerPage = 4;
    const totalArticles = productList.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = productList.slice(indexOfFirstArticle, indexOfLastArticle);

    const pageItems = [];
    for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
            <li key={i}>
                <button
                    className={i === currentPage ? cx('active') : ''}
                    onClick={() => setCurrentPage(i)}
                >
                    {i}
                </button>
            </li>,
        );
    }

    return (
        <AdminLayout>
            <div className={cx('wrapper')}>
                <div className={cx('report-container')}>
                    <h1 className={cx('report-name')}>Danh sách sản phẩm</h1>
                    <div className={cx('report-header')}>
                        <div className={cx('search')}>
                            <input
                                type="search"
                                placeholder="Tìm kiếm theo tên, loại và mô tả..."
                                onChange={handleChangeSearchTerm}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                        <Button
                            to="/admin/product/create"
                            leftIcon={<FontAwesomeIcon icon={faPlus} />}
                            secondary
                        >
                            Tạo
                        </Button>
                    </div>
                    {currentArticles.length > 0 ? (
                        <>
                            <div className={cx('report-body')}>
                                <div className={cx('report-topic')}>
                                    <h3 className={cx('th-report')}>Hình ảnh</h3>
                                    <h3 className={cx('th-report')}>Tên</h3>
                                    <h3 className={cx('th-report')}>Loại</h3>
                                    <h3 className={cx('th-report', 'th-report-description')}>
                                        Mô tả
                                    </h3>
                                    <h3 className={cx('th-report')}>Giá</h3>
                                    <h3 className={cx('th-report', 'th-report-createdAt')}>
                                        Thời gian tạo
                                    </h3>
                                    <h3 className={cx('th-report')}>Xử lý</h3>
                                </div>
                                {currentArticles.map((product) => {
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
                                                    {product.productname}
                                                </h3>
                                                <h3 className={cx('item-content')}>
                                                    {product.category}
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
                                                    <Button
                                                        to={`/admin/product/edit/${product._id}`}
                                                        leftIcon={<FontAwesomeIcon icon={faPen} />}
                                                        small
                                                        secondary
                                                    >
                                                        Sửa
                                                    </Button>
                                                    <Button
                                                        leftIcon={
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        }
                                                        onClick={() =>
                                                            handleDeleteProduct(product._id)
                                                        }
                                                        small
                                                        primary
                                                    >
                                                        Xóa
                                                    </Button>
                                                </h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={cx('pagination')}>{pageItems}</ul>
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
