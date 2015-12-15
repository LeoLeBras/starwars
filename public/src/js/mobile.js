import Vue from 'vue';
import Router from 'vue-router';
import App from './components/app';
import Home from './components/home';
import Control from './components/control';

Vue.use(Router)
var router = new Router()

router.map({
    '/': {
        component: Home
    },
    '/control': {
        component: Control
    }
})

router.redirect({
  '*': '/'
})

router.start(App, '.app')
