import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <strong>
                Copyright © 2014-2021
                <a href="https://github.com/" target="blank">
                    {' '}
                    Vo Van Thach B1910449
                </a>
            </strong>
        </footer>
    );
}

export default Footer;
