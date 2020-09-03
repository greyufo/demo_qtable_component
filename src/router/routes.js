
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue')
  },
  {
    path: '/',
    component: () => import('layouts/DrawerLayout.vue'),
    children: [{ path: '2', component: () => import('pages/Table.vue') }]

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
