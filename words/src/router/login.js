export default [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
}, {
    path: '/register',
    name: 'register',
    component: () => import('@/views/login/Register.vue')
}, {
    path: '/getpwd',
    name: 'getpwd',
    component: () => import('@/views/login/GetPassword.vue')
}, {
    path: '/resetpwd',
    name: 'resetpwd',
    component: () => import('@/views/login/ResetPwd.vue')
}]