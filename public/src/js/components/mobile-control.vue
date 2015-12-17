<template>
    <div class="container">
        <img src="../../img/logo-strokeWhite.svg" alt="Star Wars" class="logo"/>
        <div v-bind:style="{ transform: ' translateX(-50%) translateY(-50%) rotate(' + rotation + 'deg)' }" class="ship"></div>
        <a v-if="findPlanet" class="explore">Explore {{findPlanet}} !</a>
        <a v-if="!findPlanet" href="#/" class="stop">Stop !</a>
    </div>
</template>

<script>

    import gyro from 'gyro'; // gyroscope

    const socket = io();
    const duration = 500; // (animation)
    const maxRotation = 70

    export default {

        /*
         * data()
         *
         * Set initial state :
         *   - {integer} rotation
         *   - {integer} speed
         *   - {integer} findPlanet
         *
         * @return {object}
         */
        data() {
            return {
                rotation: 0,
                speed: 5,
                findPlanet: false
            }
        },



        /*
         * ready()
         *
         */
        ready() {
             const key = this.$route.query.key; // get the key

             let rotation = 0, lastRotation = 0;

             const handleRotation = (o) => {
                 lastRotation = rotation,
                 rotation = Math.floor(o.x * 10) * -1;

                 if(Math.abs(rotation) > maxRotation)
                 rotation = maxRotation * (rotation / Math.abs(rotation));

                 if(Math.abs(rotation - lastRotation) > 4) {

                     // Send socket
                     socket.emit('handleRotation', {
                         headers: {
                             from: 'mobile',
                             client: key
                         },
                         data: {
                             rotation
                         }
                     });
                     console.log(this);

                     // Rotate the ship
                     this.rotation = rotation;

                 }
             };

             gyro.startTracking(handleRotation.bind(this));

             socket.on('findPlanet', response => {
                 this.findPlanet = response.data.planet;

                 setTimeout(() => {
                     this.findPlanet = false;
                 }, 5000)
             })
        }

    }

</script>

<style lang="sass" scoped>

    $color: #201249;

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    	min-height: 100vh;
        background: $color;
        color: #ffffff;

        &:after {
            $size: calc(250px + 10vw);
            content: '';
            display: block;
            position: absolute;
            top: 50%;   left: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: $size;   height: $size;
            background: mix($color, white, 97%);
            z-index: 0;
            border-radius: 50%;
        }
    }

    .logo {
        display: block;
        position: absolute;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        width: 110px;
    }

    .explore {
        $size: calc(220px + 10vw);
        content: '';
        display: block;
        position: absolute;
        top: 50%;   left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: $size;   height: $size;
        text-align: center;
        background: white;
        border-radius: 50%;
        line-height: $size;
        vertical-align: middle;
        text-transform: uppercase;
        color: $color;
        z-index: 2;
    }

    .ship {
        display: block;
        position: absolute;
        left: 50%;  top: 50%;
        width: calc(150px + 10vw);
        height: calc(171px + 10vw);
        background-image: url(../../img/xwing.svg);
        background-size: cover;
        background-position: center;
        transition: all ease .5s;
        z-index: 1;
    }

    .stop {
        display: block;
        position: absolute;
        left: 50%;  bottom: 30px;
        transform: translateX(-50%);
        padding: 8px 12px 9px;
        background: white;
        border-radius: 7px;
        color: $color;
        text-transform: uppercase;
        text-decoration: none;
    }

</style>
