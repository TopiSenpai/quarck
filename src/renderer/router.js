import Vue from 'vue'
import Router from 'vue-router'

import ViewHome from './components/ViewHome'
import ViewSettings from './components/ViewSettings'
import ViewChats from './components/ViewChats'
import ViewChat from './components/ViewChat'
import ViewUsers from './components/ViewUsers'
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
      path: '/settings',
      component: ViewSettings
    },
    {
      path: '/chats',
      component: ViewChats,
      children: [
        {
          path: '',
          component: ViewUsers
        },
        {
          path: ':name',
          component: ViewChat
        }
      ]
    },
    {
      path: '/chat/:id',
      component: ViewChat
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
