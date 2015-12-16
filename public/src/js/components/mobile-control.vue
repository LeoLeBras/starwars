<template>
    <div class="container">
        <img src="../../img/logo-small.svg" alt="Star Wars" class="logo"/>
        <img src="../../img/xwing.svg" alt="The ship" class="ship"/>
    </div>
</template>

<script>

    import gyro from 'gyro'; // gyroscope
    import dynamics from 'dynamics.js'; // animtion

    const socket = io();
    const duration = 500; // (animation)
    const maxRotation = 70

    export default {

        /*
         * ready()
         *
         */
        ready() {
             const key = this.$route.query.key; // get the key

             let rotation = 0, lastRotation = 0;

             gyro.startTracking(function(o) {
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

                    // Rotate the ship
                    dynamics.animate(document.querySelector('.ship'), {
                        rotateZ: `${rotation}deg`,
                    }, {
                        frequency: 500,
                        friction: 500,
                        duration: duration
                    });

                }

            });
        }

    }

</script>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100vw;
    	height: 100vh;
        background-image: url(../../img/back-mobile.jpg);
        background-position: center;
        background-size: cover;
        overflow-x: hidden;
        overflow-y: hidden;
    }

    .logo {
        display: block;
        position: absolute;
        top: 20px;
        left: 50%;
        width: 125px;
        transform: translateX(-50%);
    }

    .ship {
        display: block;
        margin: auto;
        width: calc(150px + 10%);
    }

</style>
