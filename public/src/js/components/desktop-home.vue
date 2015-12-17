<template>
    <div class="container">
        <video class="background" preload autoplay muted>
          <source src="http://leolebras.com/starwars/video.mp4" type="video/mp4">
        </video>
        <div class="wrapper">
            <div class="logo"></div>
            <h1 class="title">
                Welcome to Star Wars,<br>
                The Galaxy Explorer
            </h1>
            <p class="introduction">
                In here, you will have to travel your way through
                the galaxy and find extraordinary planets. Then, you will
                have access to amazing data about planets, species and
                even space ships.
            </p>
            <a v-link="'phone'" class="start">START THE EXPERIENCE</a>
        </div>
    </div>
</template>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100vw;
        height: 100vh;
    }

    .background {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        width: auto; height: auto;
        min-width: 100%;
        min-height: 250%;
        z-index: -1000;
        background-color: #201249;
    }

    .wrapper {
        margin: auto;
        transform: translateY(-20px);
        color: white;
        text-align: center;
    }

    .logo {
        display: inline-block;
        width: 275px;   height: 135px;
        background-image: url(../../img/logo.png);
        background-size: cover;
        background-position: center;
    }

    .title {
        margin: 30px 0 10px;
        font-size: 23px;
        line-height: 1.3em;
        text-transform: uppercase;
    }

    .introduction {
        margin: 10px auto;
        max-width: 525px;
    }

    .start{
        display: inline-block;
        margin: 30px 0 0;
        padding: 17px 28px 19px;
        border: 3px solid #FFE81F;
        background-color: transparent;
        border-radius: 10px;
        font-size: 17px;
        color: white;
        text-align: center;
        text-decoration: none;
        transition: 0.3s ease;
        cursor: pointer;
    }

    .start:hover{
        background-color: #FFE81F;
        color: #222222;
        transition: 0.3s ease;
    }

</style>
