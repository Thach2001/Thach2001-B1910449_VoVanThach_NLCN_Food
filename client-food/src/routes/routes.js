// Layouts
import { HeaderOnly } from '~/layouts/HeaderOnly';

// Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';

import Admin from '~/pages/Admin/Users/index';
import CreateUser from '~/pages/Admin/Users/CreateUser';
import UpdateUser from '~/pages/Admin/Users/UpdateUser';

import AdminProduct from '~/pages/Admin/Products';
import CreateProduct from '~/pages/Admin/Products/CreateProduct';
import UpdateProduct from '~/pages/Admin/Products/UpdateProduct';

import Home from '~/pages/Home';
import Products from '~/pages/Products';
import Cart from '~/pages/Cart/Cart';
import Contact from '~/pages/Contact/Contact';

// Public routes
const publicRoutes = [
    // Login & Register
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },

    // Users
    { path: '/admin/user', component: Admin, layout: null },
    { path: '/user/create', component: CreateUser, layout: null },
    { path: '/user/edit/:_id', component: UpdateUser, layout: null },

    // Products
    { path: '/admin/product', component: AdminProduct, layout: null },
    { path: '/admin/product/create', component: CreateProduct, layout: null },
    { path: '/admin/product/edit/:_id', component: UpdateProduct, layout: null },

    // Home
    { path: '/', component: Home },
    { path: '/products', component: Products },
    { path: '/cart', component: Cart, layout: HeaderOnly },
    { path: '/contact', component: Contact },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
