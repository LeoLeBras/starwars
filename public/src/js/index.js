import { select, html } from './helpers/dom';
import dynamics from 'dynamics.js';

const socket = io();
const ship = document.querySelector('.Default_box');

const key = Math.floor(Math.random() * 10000);
socket.emit('createUser', { key })
select('.Default_key')::html(Math.abs(key));

socket.on('handleRotation', (response) => {
    if(response.headers.client.key == key) {
        dynamics.animate(ship, {
            rotateZ: `${response.data.rotation}deg`,
        }, {
            frequency: 300,
            friction: 300,
            duration: 500
        });

    }
});
