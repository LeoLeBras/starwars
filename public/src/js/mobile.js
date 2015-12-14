import { select, html, css } from './helpers/dom';
import gyro from './vendors/gyro';
import dynamics from 'dynamics.js';

const maxRotation = 40;
const ship = select('.Default_box')[0];
const duration = 500;

gyro.startTracking(function(o) {
    let rotation = Math.floor(o.x * 10) * -1;

    if(Math.abs(rotation) > maxRotation)
        rotation = maxRotation * (rotation / Math.abs(rotation));

    dynamics.animate(ship, {
        rotateZ: `${rotation}deg`,
    }, {
        frequency: 300,
        friction: 300,
        duration: duration
    });

    setTimeout(() => {
        select('.Default_info')::html(rotation);
    }, duration);

});
