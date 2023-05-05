import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Contact.module.scss';

import AdminLayout from '~/layouts/AdminLayout';

const cx = classNames.bind(styles);

function Contact() {
    const dispatch = useDispatch();
    const contacts = useSelector(function (state) {
        return state.contact;
    });

    useEffect(() => {
        async function getListContact() {
            const response = await axios.get('auth/admin/contact');
            dispatch({
                type: 'GET_CONTACT_LIST',
                payload: response.data,
            });
        }
        getListContact();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const time = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString();
    };

    // search
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangeSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    };

    const searchContacts = () => {
        return contacts.filter(
            (contact) =>
                contact.fullname.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                contact.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
                contact.feedback.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
        );
    };

    const contactList = searchContacts();

    // pagination
    const [currentPage, setCurrentPage] = useState(1);

    const articlesPerPage = 6;
    const totalArticles = contactList.length;
    const totalPages = Math.ceil(totalArticles / articlesPerPage);
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = contactList.slice(indexOfFirstArticle, indexOfLastArticle);

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
                    <h1 className={cx('report-name')}>Liên hệ và góp ý</h1>
                    <div className={cx('report-header')}>
                        <div className={cx('search')}>
                            <input
                                type="search"
                                placeholder="Tìm kiếm theo tên và email..."
                                onChange={handleChangeSearchTerm}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                    {currentArticles.length > 0 ? (
                        <>
                            <div className={cx('report-body')}>
                                <div className={cx('report-topic')}>
                                    <h3>Họ và tên</h3>
                                    <h3>Email</h3>
                                    <h3>Thời gian tạo</h3>
                                    <h3>Liên hệ & Góp ý</h3>
                                </div>
                                {currentArticles.map((contact) => {
                                    return (
                                        <div className={cx('items')} key={contact._id}>
                                            <div className={cx('item')}>
                                                <h3>{contact.fullname}</h3>
                                                <h3>{contact.email}</h3>
                                                <h3>{time(contact.createdAt)}</h3>
                                                <h3>{contact.feedback}</h3>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            <ul className={cx('pagination')}>{pageItems}</ul>
                        </>
                    ) : (
                        <h3 className={cx('no-user')}>Không có kết quả tìm kiếm</h3>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

export default Contact;
