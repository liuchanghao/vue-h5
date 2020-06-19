import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import extend from '../utils/extend';
import http from '../utils/request';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/404',
    component: () => import('@/views/404')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/oauth',
    name: 'Oauth',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Oauth.vue')
  },
  // 404 page must be placed at the end !!!
  { 
    path: '*', 
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//全局前置守卫
router.beforeEach(async (to, from, next) => {
  // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // else next()
  if(['/oauth'].includes(to.path)) return next(); //访问授权页面直接放行
  const wechatUserInfo = await extend.getSessionStorage('WECHAT_MEMBER_INFO'); //缓存微信用户信息
  if(wechatUserInfo) return next(); //有微信用户信息缓存，则放行进入页面
  await extend.setSessionStorage("BEFORE_LOGIN_URL", to.fullPath); //保存用户进入的url
  const { url } = await http.get('/wxapi/getOauthUrl'); //获取微信网页授权地址
  window.location.href = url;
});

// router.afterEach((to, from) => {
// });
export default router
