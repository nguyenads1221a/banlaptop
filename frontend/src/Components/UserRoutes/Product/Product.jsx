import {
    faArrowLeftRotate,
    faCartShopping,
    faChevronRight,
    faHeart,
    faMedal,
    faMinus,
    faPaperPlane,
    faPhone,
    faPlus,
    faThumbsUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import './Product.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, createComment, getAllComment } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
import moment from 'moment';

import starsWhite from '../../../assets/imgs/stars-white.png';
import starsOrange from '../../../assets/imgs/stars-orange.png';
import userLogo from '../../../assets/imgs/userlogo.png';

function Product() {
    const user = useSelector((state) => state.auth.login.currentUser);
    const currentProduct = useSelector((state) => state.users.users.currentProduct);
    const comments = useSelector((state) => state.users.users?.allComments);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch, loginSuccess);

    const [count, setCount] = useState(1);
    const [rating, setRating] = useState();
    const [currentConmment, setCurrentConmment] = useState('');
    const [listComments, setListComments] = useState();

    useEffect(() => {
        getAllComment(axiosJWT, dispatch);
        setListComments(getCurrentListComment(comments));
        // eslint-disable-next-line
    }, []);

    function getCurrentListComment(list) {
        let currentListProduct = [];
        for (let i = 0; i < list.length; i++) {
            if (currentProduct.id === list[i].currentProduct.id) {
                currentListProduct.push(list[i]);
            }
        }
        return currentListProduct;
    }

    //tạo object để lưu số sao và trung bình cộng
    const totalRating = {
        average: arrangeRating(6),
        star5: arrangeRating(5),
        star4: arrangeRating(4),
        star3: arrangeRating(3),
        star2: arrangeRating(2),
        star1: arrangeRating(1),
    };

    //Xử lí đếm số sao và tính trung bình cộng
    function arrangeRating(star) {
        let total = 0; //Tỉnh tổng số sao
        let count = 0; //Đếm số lượng

        if (star === 6) {
            for (let i = 0; i < listComments?.length; i++) {
                total += listComments[i].rating;
                count++;
            }

            if (count === 0) {
                return 0;
            } else {
                return Math.round(total / count);
            }
        } else if (star === 5) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 5) {
                    count++;
                }
            }
        } else if (star === 4) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 4) {
                    count++;
                }
            }
        } else if (star === 3) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 3) {
                    count++;
                }
            }
        } else if (star === 2) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 2) {
                    count++;
                }
            }
        } else if (star === 1) {
            for (let i = 0; i < listComments?.length; i++) {
                if (listComments[i].rating === 1) {
                    count++;
                }
            }
        }

        return count;
    }

    //Xử lí chọn số lượng sản phẩm thêm vào giỏ hàng
    const handleInputNumber = (e) => {
        if (Number(e) < 1) {
            alert('Số lượng sản phẩm đặt phải lớn hơn 1');
            setCount(1);
            e.preventDefault();
        } else if (Number(e) > currentProduct.number) {
            alert(`Số lượng sản phẩm đặt phải nhỏ hơn ${currentProduct.number}`);
            setCount(currentProduct.number);
            e.preventDefault();
        }
        setCount(Number(e));
    };

    //Xử lí thông báo lỗi khi nhập số lượng sản phẩm không hợp lệ
    const handleCount = (value) => {
        let newcount;
        if (value === '+') {
            if (count < 99) {
                newcount = count + 1;
                setCount(newcount);
            } else {
                alert(`Số lượng sản phẩm đặt phải nhỏ hơn 99`);
            }
        } else if (value === '-') {
            if (count > 1) {
                newcount = count - 1;
                setCount(newcount);
            } else {
                alert('Số lượng sản phẩm đặt phải lớn hơn 1');
            }
        }
    };

    //Xử lí thêm sản phẩm vào giỏ hàng
    const handleAddcart = () => {
        if (!user) {
            navigate('/dang-nhap');
        } else {
            const newProduct = {
                productId: currentProduct.id,
                userId: user._id,
                description: currentProduct.description,
                avatar: currentProduct.avatar,
                price: currentProduct.price,
                count: count,
                productTotal: count * currentProduct.price,
            };

            if (count < 0 || count > currentProduct.number) {
                alert('Số lượng sản phẩm không hợp lệ');
            } else {
                addToCart(dispatch, navigate, newProduct, axiosJWT);
            }
        }
    };

    // reFormatdate YYYY-MM-DD
    function reFormatDate(date) {
        const formattedDate = moment(date).format('YYYY-MM-DD');

        return formattedDate;
    }

    //Lưu comment
    const handleRating = (e) => {
        e.preventDefault();
        if (!user) {
            alert('Bạn cần đăng nhập trước khi bình luận');
            navigate('/dang-nhap');
        } else if (!rating) {
            alert('Vui lòng chọn số sao');
        } else if (currentConmment === '') {
            alert('Vui lòng Nhập nội dung bình luận');
        } else {
            const dateComment = new Date();

            const newComment = {
                user: user,
                rating: rating,
                comment: currentConmment,
                reComment: '',
                dateComment: dateComment,
                dateReComment: '',
                currentProduct: currentProduct,
            };

            //call api tạo bình luận mới
            createComment(newComment, axiosJWT, dispatch);

            //set lại danh sách bình luận
            setListComments((prevComments) => [...prevComments, newComment]);
            setRating();
            setCurrentConmment('');
        }
    };

    return (
        <div>
            <NavBar />
            <div className="product-container">
                <div className="product-header">
                    <p>
                        Trang chủ <FontAwesomeIcon icon={faChevronRight} /> Sản phẩm
                    </p>
                </div>
                <div className="product-body">
                    <div className="product-left">
                        <div className="product-left-service">
                            <h3>
                                <FontAwesomeIcon icon={faMedal} />
                                Thông tin dịch vụ
                            </h3>
                            <div className="product-left-service-description">
                                <span>
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    Hàng đảm bảo chất lượng
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faArrowLeftRotate} />
                                    Đảm bảo 100% hàng chính hãng
                                </span>
                                <span>
                                    <FontAwesomeIcon icon={faHeart} />
                                    Dịch vụ khách hàng tốt nhất
                                </span>
                            </div>
                            <div className="product-left-service-contact">
                                <h2>
                                    <FontAwesomeIcon icon={faPhone} />
                                    0987 6543 210
                                </h2>
                                <a href="https://www.facebook.com/">Liên hê facebook</a>
                                <span>Email moursestore@gmail.com</span>
                            </div>
                        </div>
                        <div className="product-left-selling">
                            <h3>
                                <FontAwesomeIcon icon={faMedal} />
                                Sản phẩm bán chạy
                            </h3>
                            <Link className="product-left-selling-item">
                                <img
                                    src="https://macone.vn/wp-content/uploads/2021/10/macbook-pro-16-inch-2021-silver-1024x853.png"
                                    alt=""
                                />
                                <p>
                                    MacBook Air 2020 (MWTJ2/ MWTK2) Core i3/ SSD 256GB <span>17,990,000đ</span>
                                </p>
                            </Link>
                            <Link className="product-left-selling-item">
                                <img src="https://laptoplc.com.vn/wp-content/uploads/2021/11/IMG_0002.jpg" alt="" />
                                <p>
                                    Dell Gaming G15 5525 ( 2022 )/ AMD Ryzen 7-6800H/ SSD 512GB
                                    <span>25,490,000đ</span>
                                </p>
                            </Link>
                            <Link className="product-left-selling-item">
                                <img
                                    src="https://laptopaz.vn/media/product/2841_hp_victus_2023_15_fa1093dx_laptopaz_2.jpg"
                                    alt=""
                                />
                                <p>
                                    Dell Precision M4800 i7/ RAM 8GB/ SSD 128GB + HDD 500GB/ Quardo K1100M
                                    <span>10,490,000đ</span>
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="product-right">
                        <div className="product-right-item">
                            <img src={currentProduct.avatar} alt="" />
                            <div className="product-right-item-title">
                                <p>
                                    {currentProduct.description}
                                    <span>
                                        {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                            currentProduct.cost,
                                        )}
                                    </span>
                                    <span>
                                        {Intl.NumberFormat('de-DE', { style: 'currency', currency: 'VND' }).format(
                                            currentProduct.price,
                                        )}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className="product-right-description">
                            <h3>Khuyến mãi (SL có hạn)</h3>
                            <span>Tặng Gói Quà Trị Giá 2.499.000 VNĐ Bao gồm :</span>
                            <p>
                                <img alt="" />
                                <span>Voucher trị giá 2 triệu , thay màn hình miễn phí nếu năm đầu bể vỡ</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Giảm 20% khi mua : Túi, Balo, Ram, Quạt làm mát laptop, Phần mềm Virus</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Hỗ trợ cài đặt, bảo trì, vệ sinh máy miễn phí</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Hỗ trợ trả góp lãi suất thấp.</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Giảm giá trực tiếp đối với khách hàng ở xa, HSSV.</span>
                            </p>
                            <p>
                                <img alt="" />
                                <span>Dùng thử miễn phí trong 14 ngày đầu tiên.</span>
                            </p>

                            <div className="product-right-description-payment">
                                <div className="product-right-description-payment-box">
                                    <p>Số lượng</p>
                                    <div className="product-right-description-payment-box-add">
                                        <FontAwesomeIcon icon={faMinus} onClick={(e) => handleCount('-')} />
                                        <input
                                            className="input-value"
                                            type="number"
                                            value={count}
                                            onChange={(e) => handleInputNumber(e.target.value)}
                                        />
                                        <FontAwesomeIcon icon={faPlus} onClick={(e) => handleCount('+')} />
                                    </div>
                                </div>
                                <span>Số lượng có sẵn: {currentProduct.number}</span>
                                <button
                                    className="product-right-description-payment-box-btn"
                                    onClick={(e) => handleAddcart(e)}
                                >
                                    <FontAwesomeIcon icon={faCartShopping} />
                                    THÊM VÀO GIỎ HÀNG
                                </button>
                            </div>
                        </div>
                    </div>
                    <table className="product-right-detail">
                        <tbody>
                            <tr className="product-right-detail-title">
                                <th>Thông số kỹ thuật</th>
                            </tr>
                            <tr>
                                <th>CPU</th>
                                <td>{currentProduct.cpu}</td>
                            </tr>
                            <tr>
                                <th>RAM</th>
                                <td>{currentProduct.ram || '16GB DDR5 4800Mhz'}</td>
                            </tr>
                            <tr>
                                <th>Ổ cứng</th>
                                <td>{currentProduct.hardrive}</td>
                            </tr>
                            <tr>
                                <th>MUX Switch</th>
                                <td>{currentProduct.muxSwitch}</td>
                            </tr>
                            <tr>
                                <th>Màn hình</th>
                                <td>{currentProduct.creen}</td>
                            </tr>
                            <tr>
                                <th>Webcam</th>
                                <td>{currentProduct.webcam}</td>
                            </tr>
                            <tr>
                                <th>Kết nối</th>
                                <td>{currentProduct.connection}</td>
                            </tr>
                            <tr>
                                <th>Trọng lượng</th>
                                <td>{currentProduct.weight}</td>
                            </tr>
                            <tr>
                                <th>Pin</th>
                                <td>{currentProduct.pin}</td>
                            </tr>
                            <tr>
                                <th>Hệ điều hành</th>
                                <td>{currentProduct.operetingSystem}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="product-comment">
                    <h1 className="title">ĐÁNH GIÁ SẢN PHẨM</h1>
                    <div className="wrapper">
                        <div className="left">
                            <h2 className="total-start">
                                <span className="total-rating">{totalRating.average}</span> / 5
                            </h2>
                            <div class="rating">
                                <img className="rating-white" src={starsWhite} alt="" />
                                <img
                                    className="rating-orange"
                                    src={starsOrange}
                                    style={{ objectPosition: `-${(5 - totalRating.average) * 2.4}rem` }}
                                    alt=""
                                />
                            </div>
                        </div>
                        <div className="right">
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star5})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star4})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star3})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star2})</span>
                            </div>
                            <div class="rating">
                                <div className="stars">
                                    <img className="rating-white" src={starsWhite} alt="" />
                                    <img className="rating-orange" src={starsOrange} alt="" />
                                </div>
                                <span>({totalRating.star1})</span>
                            </div>
                        </div>
                    </div>
                    <div className="list-comment">
                        {listComments?.map((comment) => {
                            return (
                                <div className="comment" key={comment.user._id}>
                                    <img className="logo" src={userLogo} alt="" />
                                    <div className="value">
                                        <div className="content">{comment.user.fullname}</div>
                                        <div className="stars">
                                            <img className="rating-white" src={starsWhite} alt="" />
                                            <img
                                                className="rating-orange"
                                                src={starsOrange}
                                                style={{ objectPosition: `-${(5 - comment.rating) * 1.5}rem` }}
                                                alt=""
                                            />
                                        </div>
                                        <div className="time">{reFormatDate(comment.dateComment)}</div>
                                        <div className="content">{comment.comment}</div>
                                        {comment.reComment ? (
                                            <div className="admin-comment">
                                                <h3>Phản hồi của Admin</h3>
                                                <span>{reFormatDate(comment.dateReComment)}</span>
                                                <p>{comment.reComment}</p>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="enter-comment">
                        <img className="logo-user" src={userLogo} alt="" />
                        <div className="content">
                            <div class="rating">
                                <input type="radio" id={5} name="rating" value="5" checked={rating === 5} />
                                <label onClick={(e) => setRating(5)}>★</label>
                                <input type="radio" id={4} name="rating" value="4" checked={rating === 4} />
                                <label onClick={(e) => setRating(4)}>★</label>
                                <input type="radio" id={3} name="rating" value="3" checked={rating === 3} />
                                <label onClick={(e) => setRating(3)}>★</label>
                                <input type="radio" id={2} name="rating" value="2" checked={rating === 2} />
                                <label onClick={(e) => setRating(2)}>★</label>
                                <input type="radio" id={1} name="rating" value="1" checked={rating === 1} />
                                <label onClick={(e) => setRating(1)}>★</label>
                                <label
                                    style={{
                                        fontSize: '1.6rem',
                                        color: '#666',
                                        paddingRight: '1rem',
                                        cursor: 'default',
                                    }}
                                >
                                    :Đánh giá{' '}
                                </label>
                            </div>
                            <form onSubmit={handleRating} className="text-comment">
                                <input
                                    type="text"
                                    maxLength={150}
                                    value={currentConmment}
                                    placeholder="Nhập nội dung bình luận"
                                    onChange={(e) => setCurrentConmment(e.target.value)}
                                />
                                <FontAwesomeIcon icon={faPaperPlane} onClick={(e) => handleRating(e)} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Product;
