import Vue from 'vue'
import App from '@/App'
import router from '@/router'                 // api: https://github.com/vuejs/vue-router
import store from '@/store'                   // api: https://github.com/vuejs/vuex
import VueCookie from 'vue-cookie'            // api: https://github.com/alfhen/vue-cookie
//import '@/element-ui'                         // api: https://github.com/ElemeFE/element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/icons'                              // api: http://www.iconfont.cn/
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import httpRequest from '@/utils/httpRequest' // api: https://github.com/axios/axios
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'

Vue.use(ElementUI)

/**  百度地图  */
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'YU4YW5WQrWwvWFm7h6eibbzRxOHW9ADu'  // http://lbsyun.baidu.com/apiconsole/key */
})

/**  Echarts 图表  */
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

/**  公共变量和js  */
import config from './utils/config.js'
import myUtils from './utils/myUtils.js'

Vue.prototype.config = config
Vue.prototype.myUtils = myUtils

Vue.use(VueCookie)
Vue.config.productionTip = false

// 非生产环境, 适配mockjs模拟数据                 // api: https://github.com/nuysoft/Mock
if (process.env.NODE_ENV !== 'production') {
  require('@/mock')
}

// 挂载全局
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.prototype.isAuth = isAuth     // 权限方法

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
