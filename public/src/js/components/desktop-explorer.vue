<template>
    <div class="container">
        <div class="wrapper">
            <div class="ship"></div>
        </div>
    </div>
</template>

<script>

    import gyro from 'gyro'; // gyroscope
    import dynamics from 'dynamics.js'; // animtion
    const socket = io();

    export default {

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
