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

.logo{
    width: 350px;
    position: relative;
    display: block;
    margin: auto;
}

.description
{
    margin-top: 125px;
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
    margin: 100px auto 0px;
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
    transform: translateX(-50%) translateY(-50%);
    animation: bounce 10s ease infinite;
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

@keyframes bounce
{
    0%   {width: 50px; height: 50px;}
    20%  {width: 50px; height: 50px;}

    21%  {width: 53px; height: 53px;}
    22%  {width: 50px; height: 50px;}
    23%  {width: 56px; height: 56px;}
    24%  {width: 50px; height: 50px;}
    25%  {width: 59px; height: 59px;}
    26%  {width: 52px; height: 52px;}
    27%  {width: 55px; height: 55px;}
    28%  {width: 51px; height: 51px;}
    29%  {width: 56px; height: 56px;}

    30%  {width: 50px; height: 50px;}
    31%  {width: 55px; height: 55px;}
    32%  {width: 50px; height: 50px;}

    50%  {width: 50px; height: 50px;}
    70%  {width: 50px; height: 50px;}

    71%  {width: 53px; height: 53px;}
    72%  {width: 50px; height: 50px;}
    73%  {width: 56px; height: 56px;}
    74%  {width: 50px; height: 50px;}
    75%  {width: 59px; height: 59px;}
    76%  {width: 52px; height: 52px;}
    77%  {width: 55px; height: 55px;}
    78%  {width: 51px; height: 51px;}
    79%  {width: 56px; height: 56px;}

    80%  {width: 50px; height: 50px;}
    81%  {width: 55px; height: 55px;}
    82%  {width: 50px; height: 50px;}

    100% {width: 50px; height: 50px;}
}

</style>