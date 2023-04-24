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

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleChangeProductName = (event) => {
        setName(event.target.value);
    };

    const handleChangeProductImage = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
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
            name: name,
            image: image,
            description: description,
            price: price,
        });

        if (response.status === 200) {
            alert(`Tạo sản phẩm ${name.toUpperCase()} thành công`);
            navigate('/admin/product');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('form-box')}>
                <form>
                    <h2>Create Product</h2>
                    <div className={cx('input-box')}>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={handleChangeProductName}
                        />
                        <label>Name</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faPizzaSlice} />
                    </div>
                    <div className={cx('input-box')}>
                        <input
                            type="file"
                            accept=".jpg, .png"
                            required
                            onChange={handleChangeProductImage}
                        />
                        <img src={image} alt="trai cay" />
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faImage} />
                    </div>
                    <div className={cx('input-box')}>
                        <input
                            type="text"
                            required
                            value={description}
                            onChange={handleChangeProductDescription}
                        />
                        <label>Description</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faPen} />
                    </div>
                    <div className={cx('input-box')}>
                        <input
                            type="text"
                            required
                            value={price}
                            onChange={handleChangeProductPrice}
                        />
                        <label>Price</label>
                        <FontAwesomeIcon className={cx('icon-btn')} icon={faDollar} />
                    </div>
                    <button className={cx('create-btn')} onClick={handleSubmitAddProduct}>
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CreateProduct;
