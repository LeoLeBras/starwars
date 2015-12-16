<template>
    <div class="container">
        <canvas class="canvas"></canvas>
        <div class="ship"></div>
        <div class="info">
            rotation: {{ ship.rotation }}
        </div>
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
         *   - {integer} xcanvasCenterY
         *   - {object} ship
         *
         * @return {object}
         */
        data() {
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;
            const territoryWidth = 3000;

            return {
                territoryWidth: 200,
                canvas: document.querySelector('.canvas'),
                canvasWidth: window.innerWidth,
                canvasHeight: window.innerHeight,
                canvasCenterX: canvasHeight / 2,
                canvasCenterY: canvasHeight / 2,
                territoryWidth: 3000,
                territoryHeight: 1700,
                centerTerritoryX: 0,
                centerTerritoryY: 0,
                ship: {
                    x: canvasWidth / 2,
                    y: canvasHeight / 2,
                    z: 1,
                    rotation: -90
                },
                stars: [{
                    x: canvasWidth / 2,
                    y: canvasHeight / 2 + 100
                }]
            }
        },



        /*
         * ready()
         *
         */
        ready() {
            const key = this.$route.query.key; // get the key

            socket.on('handleRotation', (response) => {
                if(response.headers.client == key) {
                    this.ship.rotation = this.ship.rotation + response.data.rotation;
                    dynamics.animate(document.querySelector('.ship'), {
                        rotateZ: `${this.ship.rotation}deg`,
                    }, {
                        frequency: 300,
                        friction: 300,
                        duration: 500
                    });
                }
            });

            const speed = 5;

            /*

                speed: 5
                a: rotation

                // case a = 0
                y = -speed
                x = +0

                // case a > 0 et a < 90
                x = cos(90 - a) * speed
                y = -(cos(a) * speed)

                // case a = 90
                x = +speed
                y = +0

                // case = 180



                y = cox a *

            */

            const canvas = document.querySelector('canvas');
            const c = canvas.getContext('2d')

            canvas.width  = this.canvasWidth;
            canvas.height = this.canvasHeight;

            const render = () => {
                window.requestAnimationFrame(render);
                clearCanvas(c);


                const rotation = this.ship.rotation;

                this.stars.map((star, i) => {
                    const x = star.x;
                    const y = star.y;

                    if(rotation < 0) {
                        this.ship.rotation = parseInt(rotation) + 360;
                        console.log(parseInt(rotation) + 360);
                        const rotation = this.ship.rotation;
                    }

                    switch (true) {
                        case rotation == 0:
                            this.stars[i].y -= speed;
                            break;

                        case rotation > 0 && rotation < 90 :
                            this.stars[i].x = x + Math.cos(90 - this.ship.rotation) * speed;
                            this.stars[i].y = y - Math.cos(this.ship.rotation) * speed;
                            break;

                        case rotation == 90 :
                            this.stars[i].x += speed;
                            break;

                        case rotation == 180 :
                            this.stars[i].y += speed;
                            break;

                        case rotation == 270 :
                            this.stars[i].x -= speed;
                            break;

                        default:

                    }

                    // Shadow
                    c.shadowColor   = '#ffffff';
                    c.shadowOffsetX = 0;
                    c.shadowOffsetY = 0;
                    c.shadowBlur    = 5;

                    drawCircle(c, star.x , star.y, 5, 'white')
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
        background-image: url('../../img/back.jpg');
    }

    .ship {
        margin: auto;
        width: 1rem;    height: 3rem;
        background-color: #7b5c20;
    }

    .canvas {
        position: absolute;
    }

    .info {
        color: white;
    }

</style>
