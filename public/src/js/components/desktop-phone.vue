<template>
    <div class="container">
        <div class="logo"></div>
        <div class="description">To start the experience, please follow this link with your smartphone and pair it to your computer.</div>
        <div><a class="link" href="http://goo.gl/spSIGd">http://goo.gl/spSIGd</a></div>
        <div class="description-2">Then, enter the following code :</div>
        <div class="code">{{ key }}</div>
        <div class="loader">
            <div class="sun"></div>
            <div class="eclipse"></div>
        </div>
        <div>waiting for a connection ...</div>
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
         * @TODO The server must generate the key
         *       and not the client (priority: 1)
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
    /*display: flex;
    flex-direction: column;
    justify-content: center;*/
    min-height: 100vh;
    background-image: url(../../img/back3.jpg);
    background-position: center center;
    background-size: cover;
    color: white;
    padding-top: 50px;
    text-align: center;
}

.logo
{
    width: 275px;
    height: 135px;
    position: relative;
    display: block;
    margin: auto;
    background-image: url(../../img/logo.png);
    background-size: cover;
    background-position: center;
}

.description
{
    margin-top: 6%;
    margin-bottom: 5px;
}

.link
{
    text-decoration: none;
    color: white;
    transition: all 0.3s ease;
    padding-bottom: 2px;
    border-bottom: 1px solid rgba(255, 255, 0, 0);
}

.link:hover
{
    transition: all 0.3s ease;
    color: yellow;
    border-bottom: 1px solid rgba(255, 255, 0, 1);
}

.description-2
{
    margin-top: 50px;
}

.code
{
    color: yellow;
    font-size: 30px;
    margin-top: 30px;
}

.loader
{
    width: 200px;
    height: 100px;
    margin: 6% auto 0px;
    position: relative;
}

.sun
{
    background-color: white;
    border: 3px solid yellow;
    width: 50px;
    height: 50px;
    margin: auto;
    vertical-align: middle;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) scale(1);
    animation: bounce 3.5s ease infinite;
}

@keyframes bounce
{
    0%   {transform: translateX(-50%) translateY(-50%) scale(1);}

    20%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    25%  {transform: translateX(-50%) translateY(-50%) scale(1.3);}
    30%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    35%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}
    40%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    45%  {transform: translateX(-50%) translateY(-50%) scale(1.9);}
    50%  {transform: translateX(-50%) translateY(-50%) scale(1.2);}
    55%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
    60%  {transform: translateX(-50%) translateY(-50%) scale(1.1);}
    65%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}
    70%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    75%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
    80%  {transform: translateX(-50%) translateY(-50%) scale(1);}

    100% {transform: translateX(-50%) translateY(-50%) scale(1);}
}

/*.eclipse
{
    background-image: url(../../img/test.png);
    width: 48px;
    height: 48px;
    border-radius: 100%;
    position: absolute;
    animation: hide 10s linear infinite;
    top: 50%;
    transform: translateY(-50%) translateX(0);
}

@keyframes hide
{
    0%   {transform: translateY(-50%) translateX(0);}
    20%  {transform: translateY(-50%) translateX(76px);}
    30%  {transform: translateY(-50%) translateX(76px);}
    50%  {transform: translateY(-50%) translateX(144px);}
    70%  {transform: translateY(-50%) translateX(76px);}
    80%  {transform: translateY(-50%) translateX(76px);}
    100% {transform: translateY(-50%) translateX(0);}
}*/


</style>
