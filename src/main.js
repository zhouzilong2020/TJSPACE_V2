import Vue from 'vue'
import App from './App.vue'
import './quasar'
import './styles/iconfont.css'
import './styles/index_icon/iconfont_index.css'
import router from "./routes"
import store from "./store"
import {
  Quasar, Loading
} from 'quasar'

Vue.use(Quasar, {
  plugins: {
    Loading
  },
})
Vue.prototype.window = window;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
