<template>
    <div class="container">
        <div class="logo"></div>
        <!-- <img src="../../img/logo.png" alt="logo" class="logo"/> -->
        <p class="description">
            Welcome to Star Wars : The Galaxy Explorer.
            <br>In here, you will have to travel your way through the galaxy and find extraordinary planets.
            <br>Then, you will have access to amazing data about planets, species and even space ships.
        </p>
        <p class="description-2">
            For the best possible experience, you will navigate through the experience with you smartphone.
            <br>Hoping you will enjoy your trip, we'll see you on the other side, scoundrel !
        </p>
        <a v-link="'phone'" class="phone">START THE EXPERIENCE</a>
    </div>
</template>

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
    width: 275px;
    height: 135px;
    position: relative;
    display: block;
    margin: auto;
    background-image: url(../../img/logo.png);
    background-size: cover;
    background-position: center;
}

.description{
    width: 800px;
    margin: 8% auto 0px;
}

.description-2
{
    width: 800px;
    margin: 20px auto 8%;
}



/*.mode{
    width: 450px;
    margin: 50px auto 0px;
}*/

.phone{
    display: inline-block;
    width: 350px;
    border: 3px solid yellow;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0);
    transition: 0.3s ease;
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    font-size: 20px;
    padding: 20px 0 22px;
}

.phone:hover{
    background-color: rgba(255, 255, 255, 1);
    transition: 0.3s ease;
    color: #222222;
}

/*.phone-icon{
    fill: white;
}

.phone:hover .phone-icon{
    fill: yellow;
}*/

</style>
