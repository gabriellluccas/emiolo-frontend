<template>
    <div>
        <Navbar/>
        <b-row align-h="center">
        <b-col lg='8' md='8'>
        <h3>{{planet.name}}</h3>
        <b>Name:</b> {{planet.name}}<br>
        <b>Diameter:</b> {{planet.diameter}}<br>
        <b>Gravity:</b> {{planet.gravity}}<br>
        <b>Rotation Period:</b> {{planet.rotation_period}}<br>
        <b>Orbital Period:</b> {{planet.orbital_period}}<br>
        <b>Climate:</b> {{planet.climate}}<br>
        <b>Terrain:</b> {{planet.terrain}}<br>
        <b>Surface Water:</b> {{planet.surface_water}}<br>
        <b>Population:</b> {{planet.population}}<br>
        <div v-if="!loading">
            <div v-if="planet.residents[0]">
                <b>Residents:</b>
                <div v-for="resident in residents" v-bind:key="resident">
                    <b-link :to="{ name: 'person', params: {id: resident.url.match(/(\d+)/)[0], person: resident}}" >
                        {{resident.name}}
                    </b-link>
                </div>
            </div>    
            <div v-if="planet.films[0]">
                <b>Films:</b>
                <div v-for="film in films" v-bind:key="film">
                    <b-link :to="{ name: 'film', params: {id: film.url.match(/(\d+)/)[0], film: film}}" >
                        {{film.title}}
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
    name: 'planet',
    components: {Navbar},
data(){
        return {
            loading: true,
            films: null,
            residents: null
        };
    },
    props: ['id', 'planet'],
    async mounted(){
        
        /* Get Persons */
        if(this.planet.residents){
            this.residents = await Promise.all(this.planet.residents.map(async element => {
                const headers = {headers: {'Authorization': `Bearer ${localStorage.token}`}};
                const id = element.match(/(\d+)/)[0];
                return await axios.get(`http://localhost:3000/swapi/person/${id}`, headers).then(res => res.data);
            }));
        }

         /* Get Films */
        if(this.planet.films){
            this.films = await Promise.all(this.planet.films.map(async element => {
                const headers = {headers: {'Authorization': `Bearer ${localStorage.token}`}};
                const id = element.match(/(\d+)/)[0];
            return await axios.get(`http://localhost:3000/swapi/film/${id}`, headers).then(res => res.data);
            }));
        }
        
        this.loading = false;
    },
}

</script>

<style lang="stylus">

</style>