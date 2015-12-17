<template>
    <div class="container">
        <div class="logo">
        </div>

        <div class="wrapper">
            <div class="planet-tatooine">

            </div>
            <div class='alfa' title='one'>
                <div class='bravo' title='two'>
                    <textarea readonly cols='0' rows='0' class='charly'></textarea>
                </div>
            </div>
        </div>

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
    width: 117px;
    height: 50px;
    display: block;
    margin: auto;
    background-image: url(../../img/logo-small.svg);
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 20px;
    left: 20px;
}

.planet-tatooine
{
    width: 300px;
    height: 300px;
    background-image: url(../../img/planet-tatooine.png);
    background-size: cover;
    background-position: center;
}

/*
SLIDER 2 BETTER*/

.alfa {
    background-image: url(https://unsplash.it/500/500?random=1);
    width: 500px;
    height: 500px;
    border: 20px solid #ffe81f;
    border-radius: 100%;
    box-shadow: 0 0 1px #999, -2px 2px 3px rgba(0,0,0,.2);
    padding: 0;
    margin: 1rem auto;
    position: relative;
    overflow: hidden;
}

.bravo {
    background-image: url(https://unsplash.it/500/500?random=2);
    height: 500px;
    resize: horizontal;
    position: absolute;
    top: 0; left: 0;
    min-width: 0;
    max-width: 800px;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
.bravo:before {
    content: '<->';
    background: rgba(0,0,0,.7);
    font-size: 18px;
    color: white;
    top: 0; right: 0px;
    height: 100%;
    line-height: 486px;
    position: absolute;
}

.charly{
    resize: horizontal;
    opacity: 0;
    position: relative;
    top: 50%;
    left: 0px;
    margin-right: 0px;
    width: 0px; height: 15px;
    max-width: 794px; min-width: 15px;
    outline: 0 solid transparent;
    cursor: move;
    cursor: all-scroll;
    transform: scaley(35);
    transform-origin: center center;
}


</style>
