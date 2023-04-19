// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Login from '~/pages/Login';
import Register from '~/pages/Register';

import Admin from '~/pages/Admin/Users/index';
import CreateUser from '~/pages/Admin/Users/CreateUser';
import EditUser from '~/pages/Admin/Users/EditUser';

import AdminProduct from '~/pages/Admin/Products';
import CreateProduct from '~/pages/Admin/Products/CreateProduct';
import EditProduct from '~/pages/Admin/Products/EditProduct';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';

// Public routes
const publicRoutes = [
    // Login & Register
    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },

    // Users
    { path: '/admin/user', component: Admin, layout: null },
    { path: '/user/create', component: CreateUser, layout: null },
    { path: '/user/edit/:_id', component: EditUser, layout: null },

    // Products
    { path: '/admin/product', component: AdminProduct, layout: null },
    { path: '/admin/product/create', component: CreateProduct, layout: null },
    { path: '/admin/product/edit/:_id', component: EditProduct, layout: null },

    // Home
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
