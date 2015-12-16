<template>
    <div class="container">
        <img src="../../img/logo.png" alt="" class="logo">
        <p class="description">Welcome to the Star Wars Galaxy Explorer experience.
        <br>To pair your mobile phone with your computer, please enter the code in the following area.</p>
        <form v-on:submit.prevent="onSubmit" class="form">
            <input type="text" class="input" v-model="key" placeholder="Enter the code">
            <button type="submit" class="submit"></button>
        </form>
        <div v-if="error">
            Erreur
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

.container
{
	width: 100vw;
	height: 100vh;
	padding-top: 30px;
    background-image: url(../../img/back.jpg);
    background-position: center top;
    background-size: 250%;
    background-repeat: no-repeat;
    color: #ffffff;
}

.logo
{
    display: block;
    margin: 0px auto 80px;
    width: 180px;
}

.description
{
    margin: 0px 50px;
    text-align: center;
}

.form
{
    border-radius: 30px;
    border: 2px solid yellow;
    height: 50px;
    line-height: 48px;
    width: 250px;
    margin: 100px auto;
    position: relative;
}

.input
{
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    text-align: center;
}

form ::-webkit-input-placeholder {
    padding-left: 10px;
    text-align: center;
}

form :-moz-placeholder {
    padding-left: 10px;
    text-align: center;
}

.submit
{
	display: inline-block;
	width: 30px;
	height: 30px;
    position: absolute;
    right: 12px;
    top: 10px;
    background-image: url(../../img/arrow.svg);
    background-size: 80%;
    background-position: center center;
    background-repeat: no-repeat;
    opacity: 0.5;

}

/*    .input {
        margin: 10px;
        border: 1px solid black;
    }*/

/*    .submit {
        padding: 4px 8px;
        border: 1px solid black;
    }*/

</style>
