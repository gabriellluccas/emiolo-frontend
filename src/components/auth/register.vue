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
                        placeholder="Enter your email">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Name:">
                    <b-form-input
                        v-model="name"
                        type="text"
                        required
                        placeholder="Enter your name">
                    </b-form-input>
                </b-form-group>


                <b-form-group
                    label="Password:">
                    <b-form-input
                        v-model="password"
                        type="password"
                        required
                        placeholder="Enter the password">
                    </b-form-input>
                </b-form-group>

                <b-form-group
                    label="Confirm password:">
                    <b-form-input
                        v-model="passwordConfirm"
                        type="password"
                        required
                        placeholder="Confirm the password">
                    </b-form-input>
                </b-form-group>
                 <b-row>
                    <b-col lg=8 md=8>
                        <b-link :to="{ name: 'login' }">Back to login</b-link>
                    </b-col>
                    <b-col>
                        <div class="text-right">
                            <b-button type="submit" variant="primary">Register</b-button>
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
            name: null,
            password: null,
            passwordConfirm: null
        }
    },
    methods: {
        submitForm(event){
            const {email, name, password} = this;
            event.preventDefault()
            if(this.password != this.passwordConfirm){
                alert('Passwords dont check');
            } else {
                const json = JSON.stringify({email, name, password});
                const headers = {headers: {'Content-Type': 'application/json'}};
                axios.post('http://localhost:3000/auth/save', json, headers).then((res) => {
                    if(res.data.error){
                        alert(res.data.error);
                    } else {
                        alert(res.data.success);
                        this.$router.push(this.$route.query.redirect || '/');
                    }
                }).catch((err) => {
                    alert(err)
                });
            }
        }
    } 
}
</script>

<style>
    
</style>