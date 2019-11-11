<template>
    <div>
        <h3>Species</h3>
        <b-table striped hover :items="users" :fields="fields"></b-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'users-list',
    data(){
        return {
            users: null,
            fields: ['Nome', 'Email']
        };
    },
    mounted() {
        axios.get('http://localhost:3000/').then((res) => {
            this.users = res.data.map(element => {
                const {name: Nome, email: Email} = element;
                return {Nome, Email};
            });
        });
    }
}

</script>

<style lang="stylus">

</style>