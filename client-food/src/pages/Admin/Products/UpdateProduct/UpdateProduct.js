import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faImage, faPen, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './UpdateProduct.module.scss';

const cx = classNames.bind(styles);

function UpdateProduct(props) {
    const navigate = useNavigate();
    // Lay id tu url
    const { _id } = useParams();

    const [updateProduct, setUpdateProduct] = useState({
        name: '',
        image: '',
        description: '',
        price: '',
    });

    useEffect(
        function () {
            async function getProductId() {
                try {
                    const response = await axios.get(`auth/admin/product/${_id}`);
                    setUpdateProduct(response.data);
                } catch (error) {
                    console.log(error);
                }
            }
            getProductId();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [props],
    );

    function handleSubmitUpdateProduct(event) {
        event.preventDefault();
        async function updateProductId() {
            try {
                await axios.put(`auth/admin/product/edit/${updateProduct._id}`, updateProduct);
                navigate('/admin/product');
            } catch (error) {
                console.log(error);
            }
        }
        updateProductId();
    }

    function handleChange(event) {
        setUpdateProduct({
            ...updateProduct,
            [event.target.name]: event.target.value,
        });
    }

    function handleCancel() {
        navigate('/admin/product');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-update-product')}>
                <form onSubmit={handleSubmitUpdateProduct}>
                    <h2>Cập nhật sản phẩm</h2>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            name="name"
                            value={updateProduct.name}
                            onChange={handleChange}
                        />
                        <label>Tên sản phẩm</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faPizzaSlice} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            name="image"
                            value={updateProduct.image}
                            onChange={handleChange}
                        />
                        <label>Hình ảnh</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faImage} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            name="description"
                            value={updateProduct.description}
                            onChange={handleChange}
                        />
                        <label>Mô tả</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faPen} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            name="price"
                            value={updateProduct.price}
                            onChange={handleChange}
                        />
                        <label>Giá</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faDollar} />
                    </div>
                    <button type="submit" className={cx('update-btn')}>
                        Cập nhật
                    </button>
                    <button className={cx('cancel-btn')} onClick={handleCancel}>
                        Quay lại
                    </button>
                </form>
            </div>
        </div>
    );
}

export default UpdateProduct;
