<template>
    <!-- html -->
    <form v-on:submit.prevent="onSubmit">
        <input type="text" name="name" class="input" v-model="key">
        <button type="submit" class="submit">Envoyer</button>
    </form>
</template>

<script>
    export default {
        data: {
            key: null
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
                    this.$route.router.go({
                        path: '/control',
                        query: { key: response.data.key }
                    });
                });
            }

        }
    }
</script>

<style scoped>
    .input {
        margin: 10px;
        border: 1px solid black;
    }

    .submit {
        padding: 4px 8px;
        border: 1px solid black;
    }
</style>
