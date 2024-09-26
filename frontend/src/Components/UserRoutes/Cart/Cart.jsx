import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../../createInstance';
import { deleteCarts, updateCarts } from '../../../redux/apiRequest';
import { loginSuccess } from '../../../redux/authSlice';
import Footer from '../../Footer/Footer';
import NavBar from '../../NavBar/NavBar';
import './Cart.scss';
import cart from '../../../../src/assets/imgs/cart.png';

let userCarts = [];
function Cart() {
    const user = useSelector((state) => state.auth.login?.currentUser);
    const carts = useSelector((state) => state.auth.login?.allCarts);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const axiosJWT = createAxios(user, dispatch, loginSuccess());

    useEffect(() => {
        if (!user) {
            navigate('/dang-nhap');
        }
    });

    //lấy danh sách giỏ hàng của user
    userCarts = [];
    for (let i = 0; i < carts?.length; i++) {
        if (carts[i].userId === user?._id) {
            userCarts.push(carts[i]);
        }
    }

    const [listCarts, setListCarts] = useState(userCarts); //danh sách giỏ hàng sau khi update số lượng
    const handleNumber = (id, math) => {
        const updateCount = listCarts.map((item) => {
            if (item._id === id) {
                if (math === '+') {
                    if (item.count < 99) {
                        let count = item.count + 1;
                        let productTotal = count * item.price;
                        return { ...item, count: count, productTotal: productTotal };
                    }
                } else {
                    if (item.count > 1) {
                        let count = item.count - 1;
                        let productTotal = count * item.price;
                        return { ...item, count: count, productTotal: productTotal };
                    }
                }
            }
            return item;
        });
        setListCarts(updateCount);
    };

    //xóa sản phẩm khỏi giỏ hàng
    const handleDeleteProduct = (id) => {
        deleteCarts(dispatch, id, axiosJWT);
    };

    //Chuyển đến trang thanh toán
    const handlePayment = () => {
        updateCarts(dispatch, listCarts, axiosJWT);
        navigate('/gio-hang/thanh-toan');
    };

    return (
        <div className="cart-container">
            <NavBar />
            <div className="wrapper">
                <table>
                    <tbody>
                        <tr className="header">
                            <th>Ảnh</th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Tổng tiền</th>
                        </tr>
                        {!listCarts || listCarts?.length === 0 ? (
                            <tr className="cart-empty">
                                <td>
                                    <img src={cart} alt="giỏ hàng trống" />
                                    <p>Chưa có sản phẩm nào được thêm vào giỏ hàng</p>
                                </td>
                            </tr>
                        ) : (
                            listCarts.map((item) => {
                                return item.userId === user?._id ? (
                                    <tr className="body" key={item._id}>
                                        <td>
                                            <img src={item.avatar} alt="" />
                                        </td>
                                        <td>
                                            <p>{item.description}</p>
                                        </td>
                                        <td>
                                            <span>
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.price)}
                                            </span>
                                        </td>
                                        <td className="quantity">
                                            <div className="minus" onClick={() => handleNumber(item._id, '-')}>
                                                -
                                            </div>
                                            <input type="number" value={item.count} readOnly />
                                            <div className="plus" onClick={() => handleNumber(item._id, '+')}>
                                                +
                                            </div>
                                        </td>
                                        <td>
                                            <span>
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(item.productTotal)}
                                            </span>
                                        </td>
                                        <td>
                                            <button onClick={(e) => handleDeleteProduct(item._id)}>Xóa</button>
                                        </td>
                                    </tr>
                                ) : (
                                    ''
                                );
                            })
                        )}
                    </tbody>
                </table>
                <div className="wrapper-btn">
                    <button onClick={handlePayment}>Thanh toán</button>
                </div>
                <div className="wrapper-description">Giao hàng sớm nhất từ 3 đến 5 ngày</div>
            </div>
            <Footer />
        </div>
    );
}

export default Cart;
