export default [{
    path: '/admin/noAccess',
    name: 'noAccess',
    component: () => import('@/views/sys/403.vue'),
    children: []
}]