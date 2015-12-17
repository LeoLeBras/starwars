<template>
    <div class="container">
        <div class="wrapper">
            <img src="../../img/logo-strokeYellow.svg" alt="Star Wars" class="logo">
            <h1 class="title">Galaxy Explorer</h1>
            <p class="introduction">
                Welcome to the experience !<br>
                Please enter the code provided
                by the website in the following area :
            </p>
            <div v-if="error" class="error">
                Pairing failed, please try again !
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

<style lang="sass" scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
    	min-height: 100vh;
        background: #201249;
        color: #ffffff;
    }

    .wrapper {
        margin: auto;
        transform: translateY(-20px);
        text-align: center;
    }

    .logo {
        display: block;
        margin: 0px auto 50px;
        width: 140px;
    }

    .title {
        margin-bottom: 10px;
        text-transform: uppercase;
        font-size: 20px;
    }

    .introduction {
        max-width: 275px;
        margin: auto;
        text-align: center;
        font-size: 14px;
    }

    .error {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        margin: 50px auto 3px;
        width: 275px;
        color: #FFE81F;
        text-align: center;
        font-size: 14px;
    }

    .form {
        position: relative;
        margin: 35px auto 10px;
        width: 250px;   height: 50px;
        border: 2px solid #FFE81F;
        border-radius: 30px;
        line-height: 48px;
        text-align: left;
    }

    .input {
        display: inline-block;
        vertical-align: middle;
        transform: translateY(-1px);
        width: 90%;
        text-align: center;
        padding-left: 10px;

        &::placeholder {
            color: white;
        }
    }

    .submit {
    	display: inline-block;
        position: absolute;
    	width: 30px;   height: 30px;
        right: 12px;    top: 8px;
        background-image: url(../../img/icon-Arrow.svg);
        background-size: 55%;
        background-position: center;
        background-repeat: no-repeat;
    }

</style>
