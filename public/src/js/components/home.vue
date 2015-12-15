<template>
    <form v-on:submit.prevent="onSubmit" class="container">
        <input type="text" name="name" class="input">
        <button type="submit" class="submit">Envoyer</button>
    </form>
</template>

<script>
    export default {
        methods: {
            onSubmit() {
                this.$route.router.go('/control');
            }
        }
    }
</script>

<style>
    .input {
        margin: 10px;
        border: 1px solid black;
    }

    .submit {
        padding: 4px 8px;
        border: 1px solid black;
    }
</style>
