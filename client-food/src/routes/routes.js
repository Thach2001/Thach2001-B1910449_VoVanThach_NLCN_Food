// Layouts
import { HeaderOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Upload from '~/pages/Upload';

import Login from '~/pages/Login';
import Register from '~/pages/Register';

import Admin from '~/pages/Admin';
import CreateUser from '~/pages/CreateUser';
import EditUser from '~/pages/EditUser/EditUser';

// Public routes
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/upload', component: Upload, layout: HeaderOnly },

    { path: '/admin', component: Admin, layout: null },

    { path: '/login', component: Login, layout: null },
    { path: '/register', component: Register, layout: null },

    { path: '/user/create', component: CreateUser, layout: null },
    { path: '/user/edit/:_id', component: EditUser, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
