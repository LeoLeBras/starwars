import Vue from 'vue';
import App from './components/app.vue';

var socket = io();
socket.emit('question', {
    key: '???'
});

socket.on('answer', (data) => {
    console.log(data);
});

new Vue({
    el: '.app',
    components: {
        app: App
    }
});
