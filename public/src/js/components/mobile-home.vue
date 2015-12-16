<template>
    <div class="container">
        <div class="wrapper">
            <img src="../../img/logo.png" alt="logo" class="logo">
            <p class="description">Welcome to the Star Wars Galaxy Explorer experience.
            <br>To pair your mobile phone with your computer, please enter the code in the following area.</p>
            <div v-if="error" class="error">
                Pairing failed, please try again.
            </div>
            <form v-on:submit.prevent="onSubmit" class="form">
                <input type="text" class="input" v-model="key" placeholder="Enter the code">
                <button type="submit" class="submit"></button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {

        /*
         * data()
         *
         * Set initial state :
         *   - {bool} erro
         *
         * @return {object}
         */
        data() {
            return {
                error: false
            }
        },



        methods: {

            /*
             * onSubmit()
             *
             */
            onSubmit() {
                const socket = io();

                socket.emit('findConnection', {
                    key: this.key
                });

                socket.on('connectDevice', response => {
                    return this.$route.router.go({
                        path: '/control',
                        query: { key: response.data.key }
                    });
                });

                this.error = true;
            }

        }
    }
</script>

<style scoped>

    .container {
    	width: 100vw;
    	min-height: 100vh;
        background-image: url(../../img/back-mobile.jpg);
        background-position: center;
        background-size: cover;
        color: #ffffff;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        padding-top: 30px;
    }

    .logo {
        display: block;
        margin: 0px auto 50px;
        width: 180px;
    }

    .description {
        width: 275px;
        margin: auto;
        text-align: center;
        font-size: 14px;
    }

    .error {
        width: 275px;
        margin: 50px auto 0px;
        text-align: center;
        font-size: 14px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .form {
        border-radius: 30px;
        border: 2px solid yellow;
        height: 50px;
        line-height: 48px;
        width: 250px;
        margin: 80px auto 10px;
        position: relative;
    }

    .input {
        display: inline-block;
        vertical-align: middle;
        width: 100%;
        text-align: center;
    }

    form ::-webkit-input-placeholder {
        padding-left: 10px;
        text-align: center;
        color: white;
    }

    form :-moz-placeholder {
        padding-left: 10px;
        text-align: center;
        color: white;
    }

    .submit {
    	display: inline-block;
        position: absolute;
    	width: 30px;   height: 30px;
        right: 12px;    top: 10px;
        background-image: url(../../img/icon-Arrow.svg);
        background-size: 75%;
        background-position: center;
        background-repeat: no-repeat;
    }

</style>
