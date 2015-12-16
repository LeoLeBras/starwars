<template>
    <div class="container">
        <div class="wrapper">
            <h1>Navigation</h1>
            <a v-link="'phone'">Phone</a>
        </div>
    </div>
</template>

<style scoped>

    .container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 100vh;
    }

    .wrapper {
        margin: auto;
        text-align: center;
    }

</style>
