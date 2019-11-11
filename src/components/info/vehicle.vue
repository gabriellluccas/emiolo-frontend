<template>
    <div>
        <Navbar/>
        <b-row align-h="center">
        <b-col lg='8' md='8'>
        <h3>{{vehicle.name}}</h3>
        <b>Name:</b> {{vehicle.name}}<br>
        <b>Model:</b> {{vehicle.model}}<br>
        <b>Manufacturer:</b> {{vehicle.manufacturer}}<br>
        <b>Cost in Credits:</b> {{vehicle.cost_in_credits}}<br>
        <b>Lenght:</b> {{vehicle.lenght}}<br>
        <b>Max Atmosphering Speed:</b> {{vehicle.max_atmosphering_speed}}<br>
        <b>Crew:</b> {{vehicle.crew}}<br>
        <b>Passengers:</b> {{vehicle.passengers}}<br>
        <b>Cargo Capacity:</b> {{vehicle.cargo_capacity}}<br>
        <b>Consumables:</b> {{vehicle.consumables}}<br>
        <b>Vehicle Class:</b> {{vehicle.vehicle_class}}<br>
        <div v-if="!loading">
            <div v-if="vehicle.pilots[0]">
                <b>pilots:</b>
                <div v-for="pilot in pilots" v-bind:key="pilot">
                    <b-link :to="{ name: 'person', params: {id: pilot.url.match(/(\d+)/)[0], person: pilot}}" >
                        {{ pilot.name }}
                    </b-link>
                </div>
            </div>        
            <div v-if="vehicle.films[0]">
                <b>films:</b>
                <div v-for="film in films" v-bind:key="film">
                    <b-link :to="{ name: 'person', params: {id: film.url.match(/(\d+)/)[0], film: film}}" >
                        {{ film.title }}
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
    name: 'vehicle',
    components: {Navbar},
data(){
        return {
            loading: true,
            pilots: null,
            films: null
        };
    },
    props: ['id', 'vehicle'],
    async mounted(){
        
        /* Get Persons */
        if(this.vehicle.pilots){
            this.pilots = await Promise.all(this.vehicle.pilots.map(async element => {
                const headers = {headers: {'Authorization': `Bearer ${localStorage.token}`}};
                const id = element.match(/(\d+)/)[0];
                return await axios.get(`http://localhost:3000/swapi/person/${id}`, headers).then(res => res.data);
            }));
        }

        /* Get Films */
        if(this.vehicle.films){
            this.films = await Promise.all(this.vehicle.films.map(async element => {
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