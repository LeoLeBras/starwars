<template>
    <div class="container">
        <div class="logo"></div>
        <canvas class="canvas"></canvas>
        <div class="xwing"></div>
        <div class="info">
            rotation: {{ xwing.rotation }}
        </div>
        <div class="gyro"></div>
    </div>
</template>

<script>

    import dynamics from 'dynamics.js'; // animtion
    import planetsJSON from 'api/planets.json';
    import { select, css } from 'dom';
    import { clearCanvas, drawCircle, clearCoordinates } from 'canvas';

    const socket = io();

    export default {

        /*
         * data()
         *
         * Set initial state :
         *   - {DOM} canvas
         *   - {integer} canvasWidth
         *   - {integer} canvasHeight
         *   - {integer} territoryWidth
         *   - {integer} territoryHeight
         *   - {object} xwing
         *   - {array} stars
         *   - {array} planets
         *
         * @return {object}
         */
        data() {

            // Set canvasWidth and canvasHeight
            const canvasWidth = window.innerWidth;
            const canvasHeight = window.innerHeight;

            // Set territoryWidth and territoryHeight
            const territoryWidth = 4380;
            const territoryHeight = 2700;

            // Create stars (random)
            let stars = [];
            for (let i = 0; i < 500; i++) {
                stars = [...stars, {
                    x: Math.floor(Math.random() * territoryWidth),
                    y: Math.floor(Math.random() * territoryHeight),
                    z: (Math.random() * (1.2 - 0.1) + 0.1).toFixed(1)
                }];
            }

            // Create planets
            const planetSize = 300;
            let img;
            let planets = planetsJSON.map(planet => {
                img = document.createElement('img');
                img.src = `../../img/planet-${planet.name}.png`;

                return {
                    ...planet,
                    source: img,
                    loaded: false,
                    explore: false,
                    size: planetSize
                };
            })

            // Return data
            return {
                canvas: document.querySelector('.canvas'),
                canvasWidth,
                canvasHeight,
                territoryWidth,
                territoryHeight,
                xwing: {
                    x: canvasWidth / 2,
                    y: canvasHeight / 2,
                    rotation: 0,
                    speed: 5
                },
                stars,
                planets
            };

        },



        /*
         * ready()
         *
         */
        ready() {
            const key = this.$route.query.key; // get the key

            // The device handle the rotation
            socket.on('handle', (response) => {
                if(response.client == key) { // Test the key

                    // Set rotation
                    this.xwing.rotation = response.data.rotation;
                    this.xwing.speed = response.data.speed;

                    // Rotate .xwing
                    dynamics.animate(document.querySelector('.xwing'), {
                        rotateZ: `${this.xwing.rotation}deg`,
                    }, {
                        frequency: 300,
                        friction: 300,
                        duration: 500
                    });

                }
            });

            // The user want to expore a planet
            socket.on('explore', (response) => {
                console.log('explore');
                if(response.client == key) { // Test the key
                    return this.$route.router.go({
                        path: '/data/' + response.data.planet.toLowerCase()
                    });
                }
            });


            // Wait loading planets
            this.planets.map((planet, i) => {
                planet.source.onload = () => {
                    this.planets[i] = {
                        ...planet,
                        loaded: true
                    };
                };
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

                // Move elements
                const speed = this.xwing.speed;
                const rotation = this.xwing.rotation;
                let addX = 0,
                addY = 0;
                if(rotation == 0) {
                    addY = speed;
                }
                else {
                    addY = Math.cos(rotation * (Math.PI / 180)) * speed;
                    addX = Math.sqrt(Math.pow(speed, 2) - Math.pow(addY, 2));

                    if(rotation > 0) {
                        addX = -addX;
                    }
                }



                /*
                 * Draw stars
                 *
                 * @param {object} star
                 * @return {object}
                 */
                this.stars = this.stars.map(star => {

                    // Set coordinates
                    let coordinates = clearCoordinates(star.x + addX * star.z, star.y + addY * star.z, this.territoryWidth, this.territoryHeight);
                    let x = coordinates.x,
                        y = coordinates.y;

                    if(x < this.canvasWidth && y < this.canvasHeight) { // If the star is inside the canvas

                        // Set shadow for stars
                        c.shadowColor   = 'white';
                        c.shadowOffsetX = 0;
                        c.shadowOffsetY = 1;
                        c.shadowBlur    = 5;

                        // Draw
                        drawCircle(c, x , y, 5 * star.z, 'white');

                    }

                    // Update
                    return {
                        ...star,
                        x,
                        y
                    };

                });



                /*
                 * Draw planets

                 * @param {object} planet
                 * @return {object}
                 */
                this.planets = this.planets.map(planet => {

                    // Set coordinates
                    let coordinates = clearCoordinates(planet.x + addX, planet.y + addY, this.territoryWidth, this.territoryHeight);
                    let x = coordinates.x,
                        y = coordinates.y;

                    // If the img is loaded and if the planet is inside the canvas, draw the image
                    if(planet.loaded && x < (this.canvasWidth + planet.size ) && y < (this.canvasHeight + planet.size))
                        c.drawImage(planet.source, 0, 0, planet.source.width, planet.source.height, x - (planet.size / 2), y - (planet.size), planet.size, planet.size);

                    return {
                        ...planet,
                        x,
                        y
                    };
                });



                // The x-Wing is next to a planet
                const xwing = this.xwing;
                this.planets.map((planet, i) => {
                    if(Math.sqrt(Math.pow(xwing.x - (planet.x - planet.size), 2) + Math.pow((planet.y - planet.size) - xwing.y, 2)) < planet.size * 2) {
                        if(!planet.explore) {
                            socket.emit('findPlanet', {
                                key: this.key,
                                data: {
                                    planet: planet.name
                                }
                            });
                        }
                        this.planets[i].explore = true;
                    }
                    else {
                        this.planets[i].explore = false;
                    }
                });

            };




            // Go render !!!!
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

    .logo {
        position: absolute;
        top: 30px;  left: 30px;
        width: 90px;    height: 40px;
        background-image: url('../../img/logo-fillWhite.svg');
        background-size: cover;
    }

    .xwing {
        margin: auto;
        width: 103px;    height: 117px;
        background-image: url('../../img/xwing.svg');
        background-size: cover;
    }

    .canvas {
        position: absolute;
        z-index: 0;
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
