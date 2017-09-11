// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import VueParticles from 'vue-particles'
import App from './App'
    
Vue.config.productionTip = false

Vue.use(VueFire)
Vue.use(VueParticles)

import './assets/style.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
