import Login from '../Components/Login/Login';
import Register from '../Components/Register/Register';
import Home from '../Components/UserRoutes/Home/Home';
import Admin from '../Components/Admin/Admin';
import Product from '../Components/UserRoutes/Product/Product';
import ListUsers from '../Components/AdminRoutes/ListUsers/ListUers';
import ListProducts from '../Components/AdminRoutes/ListProducts/ListProducts';
import User from '../Components/UserRoutes/User/User';
import Search from '../Components/UserRoutes/Search/Search';
import Cart from '../Components/UserRoutes/Cart/Cart';
import Payment from '../Components/UserRoutes/Payment/Payment';
import Order from '../Components/UserRoutes/Order/Order';
import EditUser from '../Components/UserRoutes/EditUser/EditUser';
import OrdersNotification from '../Components/UserRoutes/OrdersNotification/OrdersNotification';
import ListOrders from '../Components/AdminRoutes/ListOrders/ListOrders';
<<<<<<< HEAD
=======
import ListReports from '../Components/AdminRoutes/ListReports/ListReports';
import ListComments from '../Components/AdminRoutes/ListComments/ListComments';
import News from '../Components/UserRoutes/News/News';
import Introduce from '../Components/UserRoutes/Introduce/Introduce';
import Support from '../Components/UserRoutes/Support/Support';
import Recruitment from '../Components/UserRoutes/Recruitment/Recruitment';
import NewsDetail from '../Components/UserRoutes/NewsDetail/NewsDetail';
import ListNews from '../Components/AdminRoutes/ListNews/ListNews';
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a

//public route chưa login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/dang-nhap', component: Login },
    { path: '/dang-ky', component: Register },
    { path: '/san-pham/thong-tin-chi-tiet', component: Product },
    { path: '/danh-sach-san-pham', component: Search },
    { path: '/tin-tuc', component: News },
    { path: '/tin-tuc/chi-tiet-bai-viet', component: NewsDetail },
    { path: '/gioi-thieu', component: Introduce },
    { path: '/ho-tro', component: Support },
    { path: '/tuyen-dung', component: Recruitment },
];

//private routes đã login
const privateRoutes = [
    { path: '/admin', component: Admin },
    { path: '/quan-li-nguoi-dung', component: ListUsers },
    { path: '/quan-li-san-pham', component: ListProducts },
    { path: '/quan-li-don-hang', component: ListOrders },
<<<<<<< HEAD
=======
    { path: '/quan-li-thong-ke', component: ListReports },
    { path: '/quan-li-danh-gia-binh-luan', component: ListComments },
>>>>>>> fdd984f741d94df0a52dc4c25d5fcfb248b3ed8a
    { path: '/tai-khoan', component: User },
    { path: '/tai-khoan/tai-khoan-cua-toi', component: EditUser },
    { path: '/tai-khoan/don-hang', component: Order },
    { path: '/tai-khoan/thong-bao', component: OrdersNotification },
    { path: '/gio-hang', component: Cart },
    { path: '/gio-hang/thanh-toan', component: Payment },
    { path: '/quan-li-tin-tuc', component: ListNews },
];

export { publicRoutes, privateRoutes };
