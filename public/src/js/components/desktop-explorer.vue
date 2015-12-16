<template>
    <div class="container">
        <div class="logo"></div>
        <canvas class="canvas"></canvas>
        <div class="ship"></div>
        <div class="info">
            rotation: {{ ship.rotation }}
        </div>
        <div class="gyro"></div>
    </div>
</template>

<script>

    import gyro from 'gyro'; // gyroscope
    import dynamics from 'dynamics.js'; // animtion
    import { select, css } from 'dom';
    import { clearCanvas, drawCircle } from 'canvas';

    const socket = io();

    export default {

        /*
         * data()
         *
         * Set initial state :
         *   - {DOM} canvas
         *   - {integer} canvasWidth
         *   - {integer} canvasHeight
         *   - {integer} canvasCenterX
         *   - {integer} canvasCenterY
         *   - {object} ship
         *   - {array} stars
         *
         * @return {object}
         */
        data() {

            // Set canvasWidth and canvasHeight
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;

            // Create stars
            let stars = [];
            for (let i = 0; i < 40; i++) {
                stars = [...stars, {
                    x: Math.floor(Math.random() * canvasWidth),
                    y: Math.floor(Math.random() * canvasHeight),
                    z: (Math.random() * (1.2 - 0.1) + 0.1).toFixed(1)
                }];
            }

            // Return data
            return {
                canvas: document.querySelector('.canvas'),
                canvasWidth: window.innerWidth,
                canvasHeight: window.innerHeight,
                canvasCenterX: canvasHeight / 2,
                canvasCenterY: canvasHeight / 2,
                ship: {
                    x: canvasWidth / 2,
                    y: canvasHeight / 2,
                    rotation: 0,
                    speed: 5
                },
                stars: stars
            };

        },



        /*
         * ready()
         *
         */
        ready() {
            const key = this.$route.query.key; // get the key

            // The device handle the rotation
            socket.on('handleRotation', (response) => {
                if(response.headers.client == key) { // Test the key

                    // Set rotation
                    this.ship.rotation = response.data.rotation;

                    // Rotate .ship
                    dynamics.animate(document.querySelector('.ship'), {
                        rotateZ: `${this.ship.rotation}deg`,
                    }, {
                        frequency: 300,
                        friction: 300,
                        duration: 500
                    });

                }
            });

            // Initialyze the canvas
            const canvas = document.querySelector('canvas');
            const c = canvas.getContext('2d')

            // Set size of the canvas
            canvas.width  = this.canvasWidth;
            canvas.height = this.canvasHeight;

            const render = () => {

                // Request animation frame
                window.requestAnimationFrame(render);
                clearCanvas(c);

                // Set constants
                const speed = this.ship.speed;
                const rotation = this.ship.rotation;

                // Parse stars
                this.stars.map((star, i) => {
                    let addX = 0,
                        addY = 0;

                    if(rotation == 0) {
                        addY = -speed;
                    }
                    else {
                        addY = -(Math.cos(rotation * (Math.PI / 180)) * speed);
                        addX = -(Math.sqrt(Math.pow(speed, 2) - Math.pow(addY, 2)));

                        if(rotation > 0) {
                            addX = -addX;
                        }
                    }

                    // Update x and y
                    this.stars[i].x = (star.x + addX * star.z) % this.canvasWidth;
                    this.stars[i].y = (star.y + addY * star.z) % this.canvasHeight;

                    // The universe is infinite !! :)
                    if(this.stars[i].x < 0)
                        this.stars[i].x += this.canvasWidth;
                    if(this.stars[i].y < 0)
                        this.stars[i].y += this.canvasHeight;

                    // Set shadow
                    c.shadowColor   = 'white';
                    c.shadowOffsetX = 0;
                    c.shadowOffsetY = 1;
                    c.shadowBlur    = 5;

                    // Draw
                    drawCircle(c, this.stars[i].x , this.stars[i].y, 5 * star.z, 'white')

                });
            };

            render();

        }

    }

</script>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;
        background-image: url('../../img/back3.jpg');
        background-size: cover;
    }

    .ship {
        margin: auto;
        width: 103px;    height: 117px;
        background-image: url('../../img/xwing.svg');
        background-size: cover;
    }

    .canvas {
        position: absolute;
    }

    .info {
        color: white;
    }

    .gyro {
        position: absolute;
        bottom: 2rem;   right: 2rem;
        width: 5rem;    height: 5rem;
        background: white;
        border-radius: 50%;
    }

</style>
