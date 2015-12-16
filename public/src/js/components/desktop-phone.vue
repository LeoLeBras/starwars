<template>
    <div class="container">
        <img src="../../img/logo.png" alt="logo" class="logo"/>
        <div class="description">To start the experience, please follow this link with your smartphone and pair it to your computer.</div>
        <div><a class="link" href="https://goo.gl/0uwLud">https://goo.gl/0uwLud</a></div>
        <div class="description-2">Then, enter the following code :</div>
        <div class="code">key: # {{ key }}</div>
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
    position: relative;
    display: block;
    margin: auto;
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
    background-color: black;
    border: 2px solid yellow;
    width: 50px;
    height: 50px;
    margin: auto;
    vertical-align: middle;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%) scale(1);
    animation: bounce 10s ease infinite;
}

@keyframes bounce
{
    0%   {transform: translateX(-50%) translateY(-50%) scale(1);}
    20%  {transform: translateX(-50%) translateY(-50%) scale(1);}

    21%  {transform: translateX(-50%) translateY(-50%) scale(1.3);}
    22%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    23%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}
    24%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    25%  {transform: translateX(-50%) translateY(-50%) scale(1.9);}
    26%  {transform: translateX(-50%) translateY(-50%) scale(1.2);}
    27%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
    28%  {transform: translateX(-50%) translateY(-50%) scale(1.1);}
    29%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}

    30%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    31%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
    32%  {transform: translateX(-50%) translateY(-50%) scale(1);}

    50%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    70%  {transform: translateX(-50%) translateY(-50%) scale(1);}

    71%  {transform: translateX(-50%) translateY(-50%) scale(1.3);}
    72%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    73%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}
    74%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    75%  {transform: translateX(-50%) translateY(-50%) scale(1.9);}
    76%  {transform: translateX(-50%) translateY(-50%) scale(1.2);}
    77%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
    78%  {transform: translateX(-50%) translateY(-50%) scale(1.1);}
    79%  {transform: translateX(-50%) translateY(-50%) scale(1.6);}

    80%  {transform: translateX(-50%) translateY(-50%) scale(1);}
    81%  {transform: translateX(-50%) translateY(-50%) scale(1.5);}
    82%  {transform: translateX(-50%) translateY(-50%) scale(1);}

    100% {transform: translateX(-50%) translateY(-50%) scale(1);}
}

.eclipse
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
}


</style>