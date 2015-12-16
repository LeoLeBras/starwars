<template>
    <canvas class="canvas"></canvas>
    <div class="container">
        <div class="wrapper">
            <div class="ship"></div>
        </div>
    </div>
</template>

<script>

    import { select, css } from 'dom';
    import { clearCanvas, drawCircle } from 'canvas';

    import gyro from 'gyro'; // gyroscope
    import dynamics from 'dynamics.js'; // animtion
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
         *
         * @return {object}
         */
        data() {
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;

            return {
                territoryWidth: 200,
                canvas: document.querySelector('.canvas'),
                canvasWidth: window.innerWidth,
                canvasHeight: window.innerHeight,
                canvasCenterX: canvasHeight / 2,
                canvasCenterY: canvasHeight / 2,
                ship: {
                    x: canvasWidth / 2,
                    y: canvasHeight / 2
                }
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
                    dynamics.animate(document.querySelector('.ship'), {
                        rotateZ: `${response.data.rotation}deg`,
                    }, {
                        frequency: 300,
                        friction: 300,
                        duration: 500
                    });
                }
            });

            const canvas = document.querySelector('canvas');
            const c = canvas.getContext('2d')

            canvas.width  = this.canvasWidth;
            canvas.height = this.canvasHeight;


            const render = () => {
                window.requestAnimationFrame(render);
                clearCanvas(c);
                this.ship.y = this.ship.y - 1;
                drawCircle(c, this.ship.x, this.ship.y, 10, 'black');
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
        background: #f6b941;
    }

    .wrapper {
        margin: auto;
    }

    .ship {
        margin-bottom: 1rem;
        width: 4rem;    height: 14rem;
        background-color: #7b5c20;
    }

</style>
