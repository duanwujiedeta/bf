export default [{
    path: '/user',
    name: 'user',
    redirect: '/user/info',
    component: () => import('@/views/userLayout/Layout.vue'),
    children: [{
        path: '/user/info',
        name: 'userInfo',
        component: () => import('@/views/user/Userinfo.vue'),
    }, {
        path: '/user/changepwd',
        name: 'changepwd',
        component: () => import('@/views/user/Changepwd.vue'),
    }]
}]