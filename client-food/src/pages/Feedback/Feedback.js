import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import classNames from 'classnames/bind';
import styles from './Feedback.module.scss';

const cx = classNames.bind(styles);

function Feedback() {
    const dispatch = useDispatch();
    const feedbacks = useSelector((state) => state.contact);

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
    return (
        <div className={cx('wrapper')}>
            <h1 className={cx('heading')}>
                <span>Đánh giá</span>
            </h1>
            <div className={cx('inner')}>
                {feedbacks.map((feedback) => (
                    <div className={cx('content-container')} key={feedback._id}>
                        <div className={cx('contents')}>
                            <div className={cx('content-header')}>
                                <img
                                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXU1NT////R0dHz8/Pg4ODc3Nz8/PzV1dXw8PDt7e35+fnj4+P29vbv7+/n5+fd3d10rjpNAAAEeUlEQVR4nO2d2ZqqMBCEoQFZxfd/20OGYeQoqGB6SVL/pVfUl6S7s3SZZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHASWtD+EAaI6qof26ZwNO3YV3VEQimrxqLLH+mKscoiEElZ2Vye1C1cmjJwkVS1+/J+RbZVwBrL4Y28maHU/tBzUPm89vboyvDGkarPxu9vHEObq/X1kD7Htdb+6ANQ+S6+bHEJZ6pSe0Kfow1DItXHVuCaoQ5BY3Vmhi5cKu3PfwuVX+hzWF+M1H8pMM970xI9CLQt8espOmN4olZeBOa52XBTfxNF11ysljfn8+Ajg7aUTU5XMluYrG78RJkFg1tGb4twxt5SpOPbpddcrc1TX4nijrGUQf7i6MJgaxD9hpkZU8GGPj90+pzO0iByDKGpQWRYhQ5DK9F/IJ0xE06958IFO7Wb33LmjpnChifOOIzEGmrYFDZGpinXJJ2mqba0Ga5I6rARTUdGhaO2OAcVjAoLCwuRpSZdMFGb1owC89xCRuQMNDZCjY+D/H16bXnTMuQMpVMw1V+IXo9JnzFQfDPWbA4DdRtrOjSREBNQyHOCsWDgJCMBhfHP0vhjafz5MPqaJv66NLuxKrxpy8tS2B/Gv8dP4JyG9azNgsIEzkvjP/NO4N4i+rsnxvtDbWELbHfAdt5FRX+Pn8BbjPjf0yTwJir+d20JvE2M/32p/wMpA0dQj3h+560tZ4Po3+on0G8Rf89MCn1P8feuJdB/6EeiZYEJ9AEn0MvtLD++68c3L3DiK08F7Y//kNO+GNof/in1aW+TUIYwi9+fZoJuBz2GbiGEmDX1YZ+owIbwB/rY6yu08bsTvV9b9uO5d92frd01dM+9H5xvYrPhm9jE4Zv4i/O+LBfvy2s7ls77Uvuj/EMUs4EpAAAAALI5ydcLf79EwbTzu41tMXTrXcalG4p2vNXBF6Y7ZuWr8jto23Kq+xdm5avxbPogjFkfmOQdeR1dBCaSqDpx1laFE3uoP3fqPVi/lPmF+vNPwLoANB45Q9zUaPzc7ajX/Ba2/ef9PDgxe0FDla83mJ3NYYz9xdA3XvNbmPOfp5vvjoSLrcsolu4uG11dM0zdznYWI1vjk5W2p4yvxdJEgyWnwEmitrgsAdcIZtMI/bXI7Bnh0I2oXv6x4x2qe0Zer7YFxSfDnr3099B79s0cRu9oBVRm35Y1SiWqzCKcUVmKzBZY/6PRqieSKO4opAxeW5pnxOMpWw/+HuK9+ZJhZkY42IilwjvCSVF+CIUHUWEIhQdRYwhFB1E8kM5IhlMVgXkuJ1Cu5P4fMZd9Vg+6V4h5gejEGYdQrBHcFz4itE9Um6Ri01R6V7FGZoehN0mFoqlKxbYgU7kpCpRJ+nq5wiGRLzSXochCVKq6FwSqb9FDxGckjhVl7ir2EPCP0sz3Dv6cz2tQ/h5+C3PZo+5n+G3odZOFwPZC4OL+NezX+uxvL97B/jZDte52sNfeUAiFUAiFAgrjzxa620OBDWL8NY1+XXr0g/8BrMpHSulajwYAAAAASUVORK5CYII="
                                    alt="avatar"
                                />
                                <div className={cx('fullname')}>{feedback.fullname}</div>
                            </div>
                            <div>{time(feedback.createdAt)}</div>
                        </div>
                        <div className={cx('feedback')}>{feedback.feedback}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Feedback;
