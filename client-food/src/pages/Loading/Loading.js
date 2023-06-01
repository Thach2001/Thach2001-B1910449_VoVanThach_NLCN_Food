import classNames from 'classnames/bind';
import styles from './Loading.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Loading({ children }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // clear timeout khi component unmount để tránh memory leak
    }, []);

    return (
        <div className={cx('wrapper')}>
            {loading ? (
                <div className={cx('loading')}>
                    <div className={cx('loading-spinner')}></div>
                    <h2>Loading...</h2>
                </div>
            ) : (
                <div className={cx('content')}>{children}</div>
            )}
        </div>
    );
}

export default Loading;
