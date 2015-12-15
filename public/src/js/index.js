import { select, html } from './helpers/dom';
import dynamics from 'dynamics.js';

const socket = io();
const ship = document.querySelector('.Default_box');

const key = Math.floor(Math.random() * 10000000);
select('.Default_key')::html(Math.abs(key));

socket.on('handleRotation', (response) => {
    console.log(response);
    let rotation = response.data.rotation;
    dynamics.animate(ship, {
        rotateZ: `${rotation}deg`,
    }, {
        frequency: 300,
        friction: 300,
        duration: 500
    });
    select('.Default_info')::html(rotation);
});
