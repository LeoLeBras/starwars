<template>
    <div class="container">
            <img src="../../img/logo.png" alt="logo" class="logo"/>
            <p class="description">
                Welcome to Star Wars : The Galaxy Explorer. Discover every data about planets, species and space ships. <br>For the best possible experience, pair your smartphone to your computer by visiting <br> www.starwars.com
            </p>
            <p class="mode">
                Choose your navigation mode.
            </p>
            <a v-link="phone" class="phone">
                <svg width="64px" height="124px" viewBox="0 0 64 124" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
                        <g id="Home-" sketch:type="MSArtboardGroup" transform="translate(-502.000000, -800.000000)">
                            <g id="Nexus" sketch:type="MSLayerGroup" transform="translate(502.000000, 799.000000)">
                                <path class="phone-icon" d="M59.9085768,110.80272 L3.69599662,110.80272 L3.69599662,11.7793531 L59.9085768,11.7793531 L59.9085768,110.80272 L59.9085768,110.80272 Z M33.3529928,7.40348227 C33.3529928,8.26046957 32.6585851,8.9521217 31.8029756,8.9521217 C30.9473661,8.9521217 30.2502028,8.26046957 30.2502028,7.40348227 C30.2502028,6.54649497 30.9473661,5.85346504 31.8029756,5.85346504 C32.6585851,5.85346504 33.3529928,6.54649497 33.3529928,7.40348227 L33.3529928,7.40348227 Z M12.1804464,7.62530695 C12.1804464,8.06068957 11.8249758,8.41616019 11.3895932,8.41616019 C10.9542106,8.41616019 10.59874,8.06068957 10.59874,7.62530695 C10.59874,7.18579096 10.9542106,6.83307593 11.3895932,6.83307593 C11.8249758,6.83307593 12.1804464,7.18579096 12.1804464,7.62530695 L12.1804464,7.62530695 Z M63.2180358,24.9496772 L63.2180358,17.0769675 L62.5994067,17.0769675 L62.5994067,6.09182325 C62.5994067,3.27836977 48.8586762,0.9995 31.9063101,0.9995 C14.9553217,0.9995 1.21183569,3.27836977 1.21183569,6.09182325 L1.21183569,25.19768 L0.781964244,25.19768 L0.781964244,44.6645185 L1.21183569,44.6645185 L1.21183569,119.907177 C1.21183569,122.72063 14.9553217,124.9995 31.9049323,124.9995 C48.8586762,124.9995 62.5980289,122.72063 62.5980289,119.907177 L62.5980289,24.9496772 L63.2180358,24.9496772 L63.2180358,24.9496772 Z" id="Shape" sketch:type="MSShapeGroup"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </a>
    </div>
</template>

<style scoped>

.container {
    /*display: flex;
    flex-direction: column;
    justify-content: center;*/
    min-height: 100vh;
    background-image: url(../../img/back2.jpg);
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

.description{
    width: 875px;
    margin: 150px auto 0px;
}

.mode{
    width: 450px;
    margin: 50px auto 0px;
}

.phone{
    display: inline-block;
    margin-top: 75px;
}

.phone-icon{
    fill: white;
}

.phone:hover .phone-icon{
    fill: yellow;
}

</style>
