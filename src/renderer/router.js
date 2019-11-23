import Vue from 'vue'
import Router from 'vue-router'

import ViewHome from './components/ViewHome'
import ViewPublicChat from './components/ViewPublicChat'
import ViewServer from './components/ViewServer'
import ViewNotFound from './components/ViewNotFound'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: ViewHome
    },
    {
      path: '/server/local',
      component: ViewPublicChat
    },
    {
      path: '/server/:url',
      component: ViewServer
    },
    {
      path: '*',
      component: ViewNotFound
    }
  ]
})
