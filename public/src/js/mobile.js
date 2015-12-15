import { select, html } from './helpers/dom';
import gyro from './vendors/gyro';
import dynamics from 'dynamics.js';

const socket = io();

const maxRotation = 40;
const ship = select('.Default_box')[0];
const duration = 500;

let rotation = 0, lastRotation = 0;

gyro.startTracking(function(o) {

    lastRotation = rotation,
    rotation = Math.floor(o.x * 10) * -1;

    if(Math.abs(rotation) > maxRotation)
        rotation = maxRotation * (rotation / Math.abs(rotation));


    if(Math.abs(rotation - lastRotation) > 5) {
        dynamics.animate(ship, {
            rotateZ: `${rotation}deg`,
        }, {
            frequency: 300,
            friction: 300,
            duration: duration
        });

        setTimeout(() => {
            socket.emit('handleRotation', {
                headers: {
                    from: 'mobile'
                },
                data: {
                    rotation
                }
            });
            select('.Default_info')::html(Math.abs(lastRotation));
        }, duration);
    }

});
