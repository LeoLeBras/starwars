<template>
    <div>
        <h1>Phone</h1>
        <span>key: {{ key }}</span>
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
