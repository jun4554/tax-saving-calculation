import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './css/common.css'
import VueAdsense from 'vue-adsense'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

// Google Adsense 用
Vue.component('vue-adsense', VueAdsense)

new Vue({
    router,
    vuetify,
    render: h => h(App)
}).$mount('#app')
