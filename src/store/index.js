import Vue from 'vue'
import Vuex from 'vuex'

import nav from './modules/nav'
import user from './modules/user'
import none from './modules/none'
import load from './modules/load'
import keepAlive from './modules/keepAlive'
import getters from './getters.js'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules:{
      nav,
      user,
      none,
      load,
      keepAlive
    },
    getters
})

export default store