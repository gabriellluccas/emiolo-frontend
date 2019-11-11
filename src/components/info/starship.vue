<template>
    <div>
        <h3>{{starship.name}}</h3>
        <b>Name:</b> {{starship.name}}<br>
        <b>Model:</b> {{starship.model}}<br>
        <b>Manufacturer:</b> {{starship.manufacturer}}<br>
        <b>Cost in Credits:</b> {{starship.cost_in_credits}}<br>
        <b>Lenght:</b> {{starship.lenght}}<br>
        <b>Max Atmosphering Speed:</b> {{starship.max_atmosphering_speed}}<br>
        <b>Crew:</b> {{starship.crew}}<br>
        <b>Passengers:</b> {{starship.passengers}}<br>
        <b>Cargo Capacity:</b> {{starship.cargo_capacity}}<br>
        <b>Consumables:</b> {{starship.consumables}}<br>
        <b>Hyperdrive Rating:</b> {{starship.hyperdrive_rating}}<br>
        <b>MGLT:</b> {{starship.MGLT}}<br>
        <b>Starship Class:</b> {{starship.starship_class}}<br>
        <div v-if="!loading">
            <div v-if="starship.pilots[0]">
                <b>pilots:</b>
                <div v-for="pilot in pilots" v-bind:key="pilot">
                    <b-link :to="{ name: 'person', params: {id: pilot.url.match(/(\d+)/)[0], person: pilot}}" >
                        {{ pilot.name }}
                    </b-link>
                </div>
            </div>        
            <div v-if="starship.films[0]">
                <b>films:</b>
                <div v-for="film in films" v-bind:key="film">
                    <b-link :to="{ name: 'person', params: {id: film.url.match(/(\d+)/)[0], person: film}}" >
                        {{ film.title }}
                    </b-link>
                </div>
            </div>        
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'starship',
    data(){
        return {
            loading: true,
            pilots: null,
            film: null
        };
    },
    props: ['id', 'starship'],
    async mounted(){
        
        /* Get Persons */
        if(this.starship.pilots){
            this.pilots = await Promise.all(this.starship.pilots.map(async element => {
                const id = element.match(/(\d+)/)[0];
                return await axios.get(`http://localhost:3000/swapi/person/${id}`).then(res => res.data);
            }));
        }

        /* Get Films */
        if(this.starship.films){
            this.films = await Promise.all(this.starship.films.map(async element => {
                const id = element.match(/(\d+)/)[0];
                return await axios.get(`http://localhost:3000/swapi/film/${id}`).then(res => res.data);
            }));
        }

        this.loading = false;
    },
}

</script>

<style lang="stylus">

</style>