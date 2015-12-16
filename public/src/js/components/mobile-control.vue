<template>
    <div class="container">
        <img src="../../img/logo-small.svg" alt="logo" class="logo"/>
        <img src="../../img/xwing.svg" alt="space ship" class="ship"/>
    </div>
</template>

<script>

    import gyro from 'gyro'; // gyroscope
    import dynamics from 'dynamics.js'; // animtion

    const socket = io();
    const duration = 500; // (animation)
    const maxRotation = 45

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

                if(Math.abs(rotation - lastRotation) > 5) {

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
                        frequency: 300,
                        friction: 300,
                        duration: duration
                    });

                }

            });
        }

    }

</script>

<style scoped>

.container
{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
	height: 100vh;
    background-image: url(../../img/back-mobile.jpg);
    background-position: center;
    background-size: cover;
    position: relative;
}

.logo
{
    display: block;
    position: absolute;
    top: 20px;
    width: 125px;
    left: 50%;
    transform: translateX(-50%);
}

.ship
{
    width: calc(150px + 10%);
    margin: auto;
    display: block;
}

</style>
