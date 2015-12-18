<template>
    <div class="container">
        <div class="wrapper">
            <div class="logo"></div>
            <div class="description">To start the experience, please follow this link with your smartphone and pair it to your computer.</div>
            <div><a class="link" href="http://goo.gl/spSIGd">http://goo.gl/spSIGd</a></div>
            <div class="description">Then, enter the following code :</div>
            <div class="key">{{ key }}</div>
            <div class="loader">
                <div class="sun"></div>
            </div>
            <div class="message">waiting for a connection ...</div>
        </div>
    </div>
</template>

<script>

    const socket = io();

    export default {

        /*
         * data()
         *
         * Set initial state :
         *   - {integer} key
         *
         * @return {object}
         */
        data() {
            return {
                key: Math.floor(Math.random() * 1000000) // Random a key
            }
        },



        /*
         * ready()
         *
         */
        ready() {
            socket.emit('createUser', { key: this.key }) // Send the key

            socket.on('connectDevice', (response) => { // Wait response from a phone
                if(response.data.key == this.key) {
                    this.$route.router.go({ // redirect to the explorer view
                        path: '/explorer',
                        query: { key: response.data.key }
                    });
                }
            })
        }

    }

</script>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;
        background-image: url(../../img/back3.jpg);
        background-position: center center;
        background-size: cover;
        color: white;
        text-align: center;
    }

    .wrapper {
        margin: auto;
    }

    .logo {
        display: block;
        position: relative;
        margin: auto;
        width: 215px;   height: 105px;
        background-image: url(../../img/logo.png);
        background-size: cover;
        background-position: center;
    }

    .description{
        margin: 30px 0 5px;
        width: 500px;
    }

    .link {
        padding-bottom: 2px;
        border-bottom: 1px solid rgba(255, 255, 0, 0);
        text-decoration: none;
        color: white;
        transition: all 0.3s ease;
    }

    .link:hover {
        border-bottom: 1px solid rgba(255, 255, 0, 1);
        color: yellow;
        transition: all 0.3s ease;
    }

    .key {
        color: yellow;
        font-size: 30px;
        margin-top: 10px;
    }

    .loader {
        position: relative;
        margin: 6px auto 0px;
        width: 200px;   height: 100px;
    }

    .message {
        position: relative;
        top: -10px;
        font-size: 14px;
    }

    .sun {
        position: absolute;
        margin: auto;
        left: 50%;      top: 50%;
        width: 50px;    height: 50px;
        transform: translateX(-50%) translateY(-50%) scale(1);
        border: 3px solid yellow;
        border-radius: 100%;
        vertical-align: middle;
        animation: bounce 3.5s ease infinite;
    }

    @keyframes bounce {
        0%   {transform: translateX(-50%) translateY(-50%) scale(1);}
        20%  {transform: translateX(-50%) translateY(-50%) scale(1);}
        25%  {transform: translateX(-50%) translateY(-50%) scale(1.3);}
        30%  {transform: translateX(-50%) translateY(-50%) scale(1);}
        35%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}
        40%  {transform: translateX(-50%) translateY(-50%) scale(1);}
        45%  {transform: translateX(-50%) translateY(-50%) scale(1.7);}
        50%  {transform: translateX(-50%) translateY(-50%) scale(1.2);}
        55%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
        60%  {transform: translateX(-50%) translateY(-50%) scale(1.1);}
        65%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}
        70%  {transform: translateX(-50%) translateY(-50%) scale(1);}
        75%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
        80%  {transform: translateX(-50%) translateY(-50%) scale(1);}
        100% {transform: translateX(-50%) translateY(-50%) scale(1);}
    }

</style>
