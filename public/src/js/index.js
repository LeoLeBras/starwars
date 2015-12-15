import Vue from 'vue';
import Router from 'vue-router';
import App from './components/desktop-app';
import Home from './components/desktop-home';
import Phone from './components/desktop-phone';
import Explorer from './components/desktop-explorer';

Vue.use(Router)
var router = new Router()

router.map({
    '/': {
        component: Home
    },
    '/phone': {
        component: Phone
    },
    '/explorer': {
        component: Explorer
    }
})

router.redirect({
    '*': '/'
})

router.start(App, '.app');
