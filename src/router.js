import Vue from 'vue'
import Router from 'vue-router'
//import Home from './components/HelloWorld.vue'
import IncomePage from './components/income-page.vue'
import DeductionPage from './components/deduction-page.vue'
import PersonalBusinessTaxPage from './components/personal-business-tax-page.vue'
import AboutPage from './components/about-page.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: IncomePage
    },
    {
      path: '/deduction',
      component: DeductionPage
    },
    {
      path: '/personalBusinessTax',
      component: PersonalBusinessTaxPage
    },
    {
      path: '/about',
      component: AboutPage
    }
  ]
})
