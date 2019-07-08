import Vue from 'vue';
import App from './App';
import router from './router';
import Axios from 'axios'
import Vuex from 'vuex';
import { post, get } from './utils/request.js';
import common from './common'
import mainCss from "./static/css/main.css";
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.use(common);
Vue.use(Vuex);
Vue.use(mainCss);
new Vue({
	router,
	render: h => h(App)
}).$mount('#app');