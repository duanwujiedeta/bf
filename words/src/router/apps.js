export default [{
    path: '/admin/apps',
    name: 'apps',
    component: () => import('@/views/apps/Apps.vue'),
    children: []
}, {
    path: '/admin/apps/create',
    name: 'createApp',
    component: () => import('@/views/apps/Create.vue'),
}, {
    path: '/admin/apps/edit/:id',
    name: 'editApp',
    component: () => import('@/views/apps/EditApp.vue'),
}, {
    path: '/admin/apps/detail/:id',
    name: 'appDetail',
    component: () => import('@/views/apps/Detail.vue'),
}, {
    path: '/admin/apps/stores',
    name: 'stores',
    component: () => import('@/views/stores/Stores.vue'),
    children: []
}]