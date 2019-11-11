<template>
    <div>
        <Navbar/>
        <b-row align-h="center">
            <b-col lg='8' md='8'>
                <br>
                <h3>Users</h3>
                <b-table striped hover :items="users" :fields="fields"></b-table>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";

import Navbar from "../interface/navbar";
export default {
    name: 'users-list',
    components: {Navbar},
    data(){
        return {
            users: null,
            fields: ['Nome', 'Email']
        };
    },
    mounted() {
        const headers = {headers: {'Authorization': `Bearer ${localStorage.token}`}};
        axios.get('http://localhost:3000/users', headers).then((res) => {
            console.log(res);
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