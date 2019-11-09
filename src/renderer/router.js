import Vue from 'vue'
import Router from 'vue-router'

import ViewHome from './components/ViewHome'
import ViewPublicChat from './components/ViewPublicChat'
import ViewNotFound from './components/ViewNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ViewHome
    },
    {
      path: '/public_chat',
      component: ViewPublicChat
    },
    {
      path: '*',
      component: ViewNotFound
    }
  ]
})
