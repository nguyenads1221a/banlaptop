import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Admin from '../../Admin/Admin';
import './ListOrders.scss';
import { deleteOrder, getAllOrders, updateOrder } from '../../../redux/apiRequest';
import { createAxios } from '../../../createInstance';
import { loginSuccess } from '../../../redux/authSlice';
<<<<<<< HEAD
=======
import moment from 'moment';
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a

function ListOrders() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

<<<<<<< HEAD
    const user = useSelector((state) => state.auth.login?.currentUser);
    //Lấy tất cả người dùng
=======
    //Lấy tất cả người dùng
    const user = useSelector((state) => state.auth.login?.currentUser);
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
    const listOrder = useSelector((state) => state.users.users?.allListOrders);

    //refresh token
    let axiosJWT = createAxios(user, dispatch, loginSuccess);

    //Hiện form chỉnh sửa
    const [orderId, setOrderId] = useState(null);
    const [total, setTotal] = useState('');
<<<<<<< HEAD
    const [dateCreate, setDateCreate] = useState('');
    const [dateEnd, setDateEnd] = useState('');
=======
    const [currentUser, setCurrentUser] = useState('');
    const [currentProduct, setCurrentProduct] = useState([]);
    const [tradingCode, setTradingCode] = useState('');
    const [dateCreate, setDateCreate] = useState(Date);
    const [dateEnd, setDateEnd] = useState(Date);
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
    const [paymentMethods, setPaymentMethods] = useState('');
    const [orderStatus, setOrderStatus] = useState('');

    const handleShowEdit = (order) => {
<<<<<<< HEAD
        setOrderId(order._id);
        setTotal(order.total);
        setDateCreate(formatDate(order.createdAt, 0));
        setDateEnd(formatDate(order.createdAt, 3));
        setPaymentMethods(order.paymentMethods);
        setOrderStatus(
            !order.isPayment
                ? 'Chờ Xác Nhận'
                : !order.istransported
                ? 'Đang Giao'
                : order.isSuccess
                ? 'Đã Giao'
                : 'Đã Hủy',
        );

=======
        console.log(order.listproduct);
        setOrderId(order._id);
        setTotal(order.total);
        setCurrentUser(order.user);
        setCurrentProduct(order.listproduct);
        setTradingCode(order.tradingCode);
        setDateCreate(formatDate(order.dateCreate));
        setDateEnd(formatDate(order.dateEnd));
        setPaymentMethods(order.paymentMethods);
        if (order.isPayment) {
            if (order.istransported) {
                if (order.isSuccess) {
                    setOrderStatus('Đã giao');
                } else {
                    setOrderStatus('Đã huỷ');
                }
            } else {
                setOrderStatus('Đang giao');
            }
        } else {
            setOrderStatus('Chờ xác nhận');
        }
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
        document.querySelector('.listorder-box').style.display = 'flex';
    };

    //đóng form chỉnh sửa
    const handleClearEdit = () => {
        document.querySelector('.listorder-box').style.display = 'none';
    };

<<<<<<< HEAD
    const handleEditOrder = (order) => {
        console.log(typeof orderStatus, orderStatus);

        const orders = {
            total: total,
            createdAt: dateCreate,
            paymentMethods: paymentMethods === '1' ? 'Thanh toán khi nhận hàng' : 'Thanh toán online',
            isPayment: orderStatus === '1' ? false : true,
            istransported: orderStatus === '1' || orderStatus === '2' ? false : true,
            isSuccess: orderStatus === '3' ? true : false,
        };

        updateOrder(orderId, orders, axiosJWT, dispatch);
=======
    //Kiểm tra ngày đặt hàng có hợp lệ không
    const handleCheckDateCreate = (value) => {
        let currentDate = new Date(); // Ngày hiện tại
        let formatDateCreate = new Date(reFormatDate(value));

        if (formatDateCreate >= currentDate) {
            return false;
        }
        return true;
    };

    //kiểm tra thời điểm đặt hàng cớ sau thời điểm giao hàng không
    const checkDateCreateWithEnd = (firstTime, endTime) => {
        let formatDateCreate = new Date(reFormatDate(firstTime));
        let formatDateEnd = new Date(reFormatDate(endTime));

        if (formatDateEnd >= formatDateCreate) {
            return false;
        }

        return true;
    };

    const handleEditOrder = () => {
        const subscription = currentUser.phone[0] + currentUser.phone[1];
        if (!currentUser.fullname) {
            alert('Không được để trống tên khách hàng');
        } else if (!currentUser.address) {
            alert('Không được để trống địa chỉ giao hàng');
        } else if (currentUser.phone.length < 10 || currentUser.phone.length > 11) {
            alert('Số điện thoại không hợp lệ');
        } else if (subscription !== '03' && subscription !== '05' && subscription !== '07' && subscription !== '08') {
            alert('Các đầu số hợp lệ: 03 - 05 - 07 - 08');
        } else if (!currentUser.email) {
            alert('Không được để trống email');
        } else if (handleCheckDateCreate(dateCreate)) {
            alert('Ngày đặt hàng không hợp lệ');
        } else if (checkDateCreateWithEnd(dateCreate, dateEnd)) {
            alert('Thời điểm giao hàng không được nhỏ hơn điểm đặt hàng');
        } else {
            const orders = {
                total: total,
                user: currentUser,
                tradingCode: tradingCode,
                dateCreate: reFormatDate(dateCreate),
                dateEnd: reFormatDate(dateEnd),
                paymentMethods: paymentMethods === '1' ? 'offline' : 'online',
                isPayment: orderStatus === '1' ? false : true,
                istransported: orderStatus === '1' || orderStatus === '2' ? false : true,
                isSuccess: orderStatus === '3' ? true : false,
            };
            updateOrder(orderId, orders, axiosJWT, dispatch);
        }
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
    };

    //delete product
    const handleDelete = (id) => {
        deleteOrder(dispatch, id, axiosJWT);
    };

<<<<<<< HEAD
    //format day
    function formatDate(date, day) {
        let formatted_date = new Date(date);
        formatted_date.setDate(formatted_date.getDate() + day);
        let formatted_date_string = formatted_date.toISOString().split('T')[0];
        return formatted_date_string;
=======
    //format date
    function formatDate(date) {
        const formattedDate = moment(date).format('DD-MM-YYYY'); // Chuyển đổi sang định dạng 'dd-mm-yyyy';

        return formattedDate;
    }

    //reFormatdate
    function reFormatDate(date) {
        const vietnamTime = moment.utc(date, 'DD-MM-YYYY').utcOffset('+0700');
        const formattedDate = vietnamTime.format('YYYY-MM-DD');

        return formattedDate;
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
    }

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
        if (user?.accessToken) {
            getAllOrders(dispatch, axiosJWT, user.accessToken);
        }
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <div className="listorder-box">
                <div className="wrapper">
                    <h3>Chỉnh sửa đơn hàng</h3>
                    <section className="wrapper-body">
                        <div className="wrapper-col">
                            <div className="wrapper-item">
<<<<<<< HEAD
                                <span>Tổng tiền</span>
                                <input
                                    type="text"
                                    placeholder="Tổng tiền"
                                    value={total}
                                    onChange={(e) => setTotal(e.target.value)}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Ngày đặt</span>
                                <input
                                    type="text"
                                    placeholder="Ngày đặt"
                                    value={dateCreate}
                                    onChange={(e) => setDateCreate(e.target.value)}
=======
                                <span>Khách hàng</span>
                                <input
                                    type="text"
                                    placeholder="Tên khách hàng"
                                    value={currentUser.fullname}
                                    onChange={(e) => setCurrentUser({ ...currentUser, fullname: e.target.value })}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Địa chỉ</span>
                                <input
                                    type="text"
                                    placeholder="Địa chỉ"
                                    value={currentUser.address}
                                    onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Số điện thoại</span>
                                <input
                                    type="number"
                                    placeholder="Số điện thoại"
                                    value={currentUser.phone}
                                    onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })}
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Email</span>
                                <input
                                    type="email"
                                    placeholder="email"
                                    value={currentUser.email}
                                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                />
                            </div>
                            {tradingCode === '' ? (
                                ''
                            ) : (
                                <div className="wrapper-item">
                                    <span>Mã giao dịch</span>
                                    <input
                                        type="text"
                                        placeholder="Mã giao dịch"
                                        value={tradingCode}
                                        onChange={(e) => setTradingCode(e.target.value)}
                                    />
                                </div>
                            )}
                            <div className="wrapper-item">
                                <span>Ngày đặt</span>
                                <input
                                    type="date"
                                    placeholder="Ngày đặt"
                                    value={reFormatDate(dateCreate)}
                                    onChange={(e) => setDateCreate(formatDate(e.target.value))}
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Ngày giao</span>
                                <input
<<<<<<< HEAD
                                    type="text"
                                    placeholder="Ngày giao"
                                    value={dateEnd}
                                    onChange={(e) => setDateEnd(e.target.value)}
=======
                                    type="date"
                                    placeholder="Ngày giao"
                                    value={reFormatDate(dateEnd)}
                                    onChange={(e) => setDateEnd(formatDate(e.target.value))}
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
                                />
                            </div>
                            <div className="wrapper-item">
                                <span>Phương thức thanh toán</span>
                                <select onChange={(e) => setPaymentMethods(e.target.value)}>
<<<<<<< HEAD
                                    <option defaultValue="" disabled selected hidden>
                                        Chọn phương thức thanh toán
                                    </option>
                                    <option value="1">Thanh toán khi nhận hàng</option>
                                    <option value="2">Thanh toán online</option>
=======
                                    <option value="1" selected={paymentMethods === 'offline' ? true : false}>
                                        Thanh toán khi nhận hàng
                                    </option>
                                    <option value="2" selected={paymentMethods === 'online' ? true : false}>
                                        Thanh toán online
                                    </option>
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
                                </select>
                            </div>
                            <div className="wrapper-item">
                                <span>Trạng thái đơn hàng</span>
                                <select onChange={(e) => setOrderStatus(e.target.value)}>
                                    <option defaultValue="" disabled selected hidden>
<<<<<<< HEAD
                                        Chọn một tùy chọn
=======
                                        {orderStatus}
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
                                    </option>
                                    <option value="1">Chờ Xác Nhận</option>
                                    <option value="2">Đang Giao</option>
                                    <option value="3">Đã Giao</option>
                                    <option value="4">Đã Hủy</option>
                                </select>
                            </div>
<<<<<<< HEAD
=======
                            <div className="wrapper-item" style={{ display: 'flex', flexDirection: 'column' }}>
                                <h1 className="title">Danh sách sản phẩm</h1>
                                <table className="list-product">
                                    <tbody>
                                        <tr>
                                            <th>Tên</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                        </tr>
                                        {currentProduct.map((item) => {
                                            return (
                                                <tr>
                                                    <td style={{ textAlign: 'left' }}>{item.description}</td>
                                                    <td>x{item.count}</td>
                                                    <td>
                                                        {Intl.NumberFormat('de-DE', {
                                                            style: 'currency',
                                                            currency: 'VND',
                                                        }).format(item.price)}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        <tr>
                                            <th></th>
                                            <th>Tổng</th>
                                            <th>
                                                {Intl.NumberFormat('de-DE', {
                                                    style: 'currency',
                                                    currency: 'VND',
                                                }).format(total)}
                                            </th>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
                        </div>
                    </section>
                    <button className="btn-edit" onClick={(e) => handleEditOrder()}>
                        Lưu
                    </button>
                    <button className="btn-delete" onClick={handleClearEdit}>
                        Hủy
                    </button>
                </div>
            </div>
            <div className="listorder-container">
                <Admin />
                <div className="listorder-header">Danh sách đơn hàng</div>
                <table>
                    <tbody>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Tổng tiền</th>
                            <th>Ngày đặt</th>
                            <th>Ngày giao</th>
                            <th>Phương thức thanh toán</th>
                            <th>Trạng thái đơn hàng</th>
                        </tr>
                        {listOrder?.map((item) => {
                            return (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>
                                        {Intl.NumberFormat('de-DE', {
                                            style: 'currency',
                                            currency: 'VND',
                                        }).format(item.total)}
                                    </td>
<<<<<<< HEAD
                                    <td>{formatDate(item.createdAt, 0)}</td>
                                    <td>{formatDate(item.createdAt, 3)}</td>
                                    <td>{item.paymentMethods}</td>
=======
                                    <td>{formatDate(item.dateCreate)}</td>
                                    <td>{formatDate(item.dateEnd)}</td>
                                    <td>
                                        {item.paymentMethods === 'offline'
                                            ? 'Thanh toán khi nhận hàng'
                                            : 'Thanh toán online'}
                                    </td>
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
                                    <td>
                                        {!item.isPayment ? (
                                            <span style={{ color: 'green' }}>Chờ Xác Nhận</span>
                                        ) : !item.istransported ? (
                                            <span style={{ color: '#e1e143' }}>Đang Giao</span>
                                        ) : item.isSuccess ? (
                                            <span style={{ color: 'blue' }}>Đã Giao</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>Đã Hủy</span>
                                        )}
                                    </td>
                                    <td style={{ display: 'flex' }}>
                                        <button className="btn-edit" onClick={(e) => handleShowEdit(item)}>
                                            Chỉnh sửa
                                        </button>
                                        <button className="btn-delete" onClick={(e) => handleDelete(item._id)}>
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListOrders;
