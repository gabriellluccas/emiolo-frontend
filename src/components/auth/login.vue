<template>
    <b-row align-h="center">
        <b-col lg='4' md='6'>
            <br>
            <form @submit="submitForm">
                <p class="h4 text-center mb-4">Sign in</p>
                <b-form-group
                    label="Email address:">
                    <b-form-input
                        v-model="email"
                        type="email"
                        required
                        placeholder="Enter email">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Password:">
                    <b-form-input
                        v-model="password"
                        type="password"
                        required
                        placeholder="Enter password">
                    </b-form-input>
                </b-form-group>
                <b-row>
                    <b-col lg=8 md=8>
                        <b-link :to="{ name: 'register' }">Don't have account? Register as a new user!</b-link><br>
                        <b-link label="Sign In" @click="googleLogin">Signin with Google</b-link>
                    </b-col>
                    <b-col>
                        <div class="text-right">
                            <b-button type="submit" variant="primary">Login</b-button>
                        </div>
                    </b-col>
                </b-row>
            </form>
        </b-col>
    </b-row>
</template>

<script>
import axios from "axios";

export default {
    data(){
        return{
            email: null,
            password: null,
            urlGoogle: null
        }
    },
    mounted(){
        localStorage.token = null;
        localStorage.name = null;
        localStorage.email = null;
        /* Return of google sign in */
        if(this.$route.query.code){
            axios.get(`http://localhost:3000/auth/google/callback?code=${this.$route.query.code}`).then((res) => {
                console.log(res.data);
                localStorage.token = res.data.token;
                localStorage.name = res.data.user.name;
                localStorage.email = res.data.user.email;
                this.$router.push(this.$route.query.redirect || '/users');
            }).catch((err) => {
                console.log(err);
            });
        }
    },
    methods: {
        /* Sign in function */
        submitForm(event){
            const {email, password} = this;
            event.preventDefault()
            const json = JSON.stringify({email, password});
            const headers = {headers: {'Content-Type': 'application/json'}};
            axios.post('http://localhost:3000/auth/', json, headers).then((res) => {
                if(res.data.error){
                    alert(res.data.error);
                } else {
                    localStorage.token = res.data.token;
                    localStorage.name = res.data.user.name;
                    localStorage.email = res.data.user.email;
                    this.$router.push(this.$route.query.redirect || '/users');
                }
            }).catch((err) => {
                alert(err)
            });        
        },
        /* Redirect to google authenticate */
        googleLogin(){
            axios.get('http://localhost:3000/auth/google').then((res) => {
                window.location.href = res.data;
            }).catch((err) => {
                console.log(err);
            });
        }
    } 
}
</script>

<style>
    
</style>