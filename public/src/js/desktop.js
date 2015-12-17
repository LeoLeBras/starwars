import Vue from 'vue';
import Router from 'vue-router';
import App from './components/desktop-app';
import Home from './components/desktop-home';
import Phone from './components/desktop-phone';
import Explorer from './components/desktop-explorer';
import Data from './components/desktop-data';

Vue.use(Router);
var router = new Router();

router.map({
    '/': {
        component: Home
    },
    '/phone': {
        component: Phone
    },
    '/explorer': {
        component: Explorer
    },
    '/data': {
        component: Data
    }
});

router.redirect({
    '*': '/'
});

router.start(App, '.app');
