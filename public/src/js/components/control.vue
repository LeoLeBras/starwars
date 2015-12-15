<template>
    <div class="container">
        <div class="wrapper">
            <div class="ship" data-id="ship"></div>
        </div>
    </div>
</template>

<script>

    import gyro from 'gyro';
    import dynamics from 'dynamics.js';

    const maxRotation = 45
    const duration = 500;
    const socket = io();

    export default {

        /*
         * ready()
         * Component did mount
         *
         */
        ready() {
             const key = this.$route.query; // get the key

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
