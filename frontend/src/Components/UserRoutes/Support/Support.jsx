import './Support.scss';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../NavBar/NavBar';
import Footer from '../../Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';

function Support() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    // Xoá phần nãy
    const [text, setText] = useState('');
    const originalText = 'Trang này đang bảo trì, vui lòng quay lại sau!';

    useEffect(() => {
        let currentIndex = 0;
        let timeout;

        const animateText = () => {
            setText(originalText.slice(0, currentIndex));
            currentIndex = (currentIndex + 1) % (originalText.length + 1); // Lặp lại vòng lặp từ đầu sau khi hiển thị hết text

            const intervalTime = currentIndex === 0 ? 2000 : 100; // Thời gian delay khi kết thúc một chuỗi text hoặc khi đang hiển thị chuỗi text
            timeout = setTimeout(animateText, intervalTime);
        };

        animateText();

        return () => {
            clearTimeout(timeout); // Xóa timeout khi component unmount (không còn tồn tại)
        };
    }, [originalText]);

    return (
        <div className="support-container">
            <NavBar />
            <div className="support-wrapper">
                <div className="maintenance-text">{text}</div>
            </div>
            <Footer />
        </div>
    );
}

export default Support;
