import Vue from 'vue'
import App from './App'
import request from "@/common/request.js"
Vue.config.productionTip = false
import uView from "uview-ui";
Vue.prototype.$request=request;
Vue.use(uView);
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
