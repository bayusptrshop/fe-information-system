import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/',
    component: () => import('@/layouts/default.vue'),
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'data-siswa',
        component: () => import('@/pages/data-siswa.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'data-siswa/:id',
        component: () => import('@/pages/detail-student.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'transkrip-nilai/',
        component: () => import('@/pages/transcript.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/blank.vue'),
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: 'register',
        component: () => import('@/pages/register.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        component: () => import('@/pages/[...error].vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


router.beforeEach((to, from, next) => {
  console.log('beforeEach', to, from);
  
  if (!to.meta) {
    console.error('Meta data is undefined for route:', to);
  }

  document.title = `${to.meta.title} | ${import.meta.env.VITE_APP_STORE_NAME}`;
  
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && (!token)) {
    next({ path: '/login' });
  } else {
    next();
  }
});


export default router;
