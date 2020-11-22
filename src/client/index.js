import Vue from 'vue';
import App from './App';
Vue.config.productionTip = false;
Vue.config.devtools = process.env.NODE_ENV === 'production' ? false : true;
/* eslint-disable no-new */
new Vue({
	el: '#app',
	template: '<App/>',
	components: { App },
});
