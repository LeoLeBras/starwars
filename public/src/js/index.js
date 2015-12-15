import Vue from 'vue';
import App from './components/app.vue';
import dynamics from 'dynamics.js';

const socket = io();
const ship = document.querySelector('.Default_box');

socket.on('handleRotation', (response) => {
    console.log(response);


    dynamics.animate(ship, {
        rotateZ: `${response.data.rotation}deg`,
    }, {
        frequency: 300,
        friction: 300,
        duration: 500
    });
});

new Vue({
    el: '.app',
    components: {
        app: App
    }
});
