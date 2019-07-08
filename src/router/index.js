import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    routes: [{
        path: '/',
        component: resolve => require(['../components/page/index/index.vue'], resolve),
        meta: {
            title: '首页',
            allowBack: false
        },
    }]
});
//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    next();

});
export default router