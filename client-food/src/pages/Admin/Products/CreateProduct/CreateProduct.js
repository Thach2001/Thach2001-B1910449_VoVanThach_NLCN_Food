import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollar, faImage, faPen, faPizzaSlice } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';

import styles from './CreateProduct.module.scss';

const cx = classNames.bind(styles);

function CreateProduct() {
    const navigate = useNavigate();

    const [productname, setProductName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleChangeProductName = (event) => {
        setProductName(event.target.value);
    };

    const handleChangeProductImage = (event) => {
        setImage(event.target.value);
    };

    const handleChangeProductCategory = (event) => {
        setCategory(event.target.value);
    };

    const handleChangeProductDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleChangeProductPrice = (event) => {
        setPrice(event.target.value);
    };

    const handleSubmitAddProduct = async (event) => {
        event.preventDefault();
        const response = await axios.post('auth/admin/product/create', {
            productname: productname,
            image: image,
            description: description,
            price: price,
        });

        if (response.status === 200) {
            alert(`Tạo sản phẩm ${productname.toUpperCase()} thành công`);
            navigate('/admin/product');
        }
    };

    function handleCancel() {
        navigate('/admin/product');
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-create-product')}>
                <form>
                    <h2>Thêm sản phẩm</h2>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            value={productname}
                            onChange={handleChangeProductName}
                        />
                        <label>Tên sản phẩm</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faPizzaSlice} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            value={image}
                            onChange={handleChangeProductImage}
                        />
                        <label>Hình ảnh</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faImage} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            value={description}
                            onChange={handleChangeProductDescription}
                        />
                        <label>Mô tả</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faPen} />
                    </div>
                    <div className={cx('form-group')}>
                        <input
                            type="text"
                            required
                            value={price}
                            onChange={handleChangeProductPrice}
                        />
                        <label>Giá</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faDollar} />
                    </div>
                    <div className={cx('form-group')}>
                        <select
                            className={cx('select-option')}
                            value={category}
                            onChange={handleChangeProductCategory}
                        >
                            <option value="Trái cây">Trái cây</option>
                            <option value="Rau củ">Rau củ</option>
                        </select>
                    </div>
                    <button className={cx('create-btn')} onClick={handleSubmitAddProduct}>
                        Thêm mới
                    </button>
                    <button className={cx('cancel-btn')} onClick={handleCancel}>
                        Quay lại
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
