import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPaperPlane, faPhone, faSchool } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

const cx = classNames.bind(styles);

function Contact() {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedBack] = useState('');

    const handleChangeFullName = (event) => {
        setFullName(event.target.value);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangeFeedback = (event) => {
        setFeedBack(event.target.value);
    };

    const handleSubmitAddContact = async (event) => {
        event.preventDefault();
        const response = await axios.post('auth/admin/contact/create', {
            fullname: fullname,
            email: email,
            feedback: feedback,
        });
        if (response.status === 200) {
            alert(`Cảm ơn ${fullname.toUpperCase()} đã liên hệ và góp ý`);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>
                <span>Liên hệ</span>
            </h1>
            <div className={cx('inner')}>
                <form className={cx('contact-form')}>
                    <div>
                        <input
                            type="text"
                            required
                            placeholder="Họ và tên"
                            value={fullname}
                            onChange={handleChangeFullName}
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            required
                            placeholder="Email"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                    </div>
                    <div>
                        <textarea
                            rows="10"
                            required
                            placeholder="Lời nhắn hoặc góp ý"
                            value={feedback}
                            onChange={handleChangeFeedback}
                        ></textarea>
                    </div>
                    <button type="submit" className={cx('send')} onClick={handleSubmitAddContact}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                        <span>Gửi</span>
                    </button>
                </form>

                <div className={cx('contact-info')}>
                    <div className={cx('links')}>
                        <ul>
                            <li className={cx('link')}>
                                <Link to="https://ctu.edu.vn">
                                    <FontAwesomeIcon icon={faSchool} />
                                    <span>Đại học Cần Thơ</span>
                                </Link>
                            </li>
                            <li className={cx('link')}>
                                <Link>
                                    <FontAwesomeIcon icon={faPhone} />
                                    <span>+84 123 456 789</span>
                                </Link>
                            </li>
                            <li className={cx('link')}>
                                <Link to="https://youtube.com">
                                    <FontAwesomeIcon icon={faEnvelope} />
                                    <span>vovanthach2001@gmail.com</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className={cx('contact-about')}>
                        <ul className={cx('social-icon')}>
                            <li>
                                <Link to="https://facebook.com">
                                    <FontAwesomeIcon icon={faFacebook} />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://twitter.com">
                                    <FontAwesomeIcon icon={faTwitter} />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://instagram.com">
                                    <FontAwesomeIcon icon={faInstagram} />
                                </Link>
                            </li>
                            <li>
                                <Link to="https://youtube.com">
                                    <FontAwesomeIcon icon={faYoutube} />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
