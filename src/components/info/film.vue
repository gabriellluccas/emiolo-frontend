<template>
    <div>
        <Navbar/>
        <b-row align-h="center">
        <b-col lg='8' md='8'>
        <h3>{{film.title}}</h3>
        <b>Title:</b> {{film.title}}<br>
        <b>Episode:</b> {{film.episode_id}}<br>
        <b>Opening Crawl:</b> {{film.opening_ceawl}}<br>
        <b>Director:</b> {{film.director}}<br>
        <b>Producer:</b> {{film.producer}}<br>
        <b>Release Date:</b> {{film.release_date}}<br>
        <div v-if="!loading">
            <div v-if="film.characters[0]">
                <b>Characters:</b>
                <div v-for="character in characters" v-bind:key="character">
                    <b-link :to="{ name: 'person', params: {id: character.url.match(/(\d+)/)[0], person: character}}" >
                        {{ character.name }}
                    </b-link>
                </div>
            </div>        
        </div>               
        </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";

import Navbar from "../interface/navbar";
export default {
    name: 'film',
    components: {Navbar},
data(){
        return {
            loading: true,
            characters: null
        };
    },
    props: ['id', 'film'],
    async mounted(){
        
        /* Get Persons */
        if(this.film.characters){
            this.characters = await Promise.all(this.film.characters.map(async element => {
                const id = element.match(/(\d+)/)[0];
                const headers = {headers: {'Authorization': `Bearer ${localStorage.token}`}};
                return await axios.get(`http://localhost:3000/swapi/person/${id}`, headers, headers).then(res => res.data);
            }));
        }

        this.loading = false;
    },
}

</script>

<style>

</style>