<template>
    <div>
        <h3>{{person.name}}</h3>
        <b>Name:</b> {{person.name}}<br>
        <b>Gender:</b> {{person.gender}}<br>
        <b>Birth Year:</b> {{person.birth_year}}<br>
        <b>Height:</b> {{person.height}}<br>
        <b>Mass:</b> {{person.mass}}<br>
        <b>Skin Color:</b> {{person.skin_color}}<br>
        <b>Hair Color:</b> {{person.hair_color}}<br>
        <b>Eye Color:</b> {{person.eye_color}}<br>
        <div v-if="!loading">
            <div v-if="person.species[0]">
                <b>Species:</b>
                <div v-for="specie in species" v-bind:key="specie">
                    <b-link :to="{ name: 'specie', params: {id: specie.url.match(/(\d+)/)[0], specie: specie}}" >
                        {{specie.name}}
                    </b-link>
                </div>
            </div>
            <div v-if="person.starships[0]">
                <b>Starships:</b>
                <div v-for="starship in starships" v-bind:key="starship">
                    <b-link :to="{ name: 'starship', params: {id: starship.url.match(/(\d+)/)[0], starship: starship}}" >
                        {{starship.name}}
                    </b-link>
                </div>
            </div>
            <div v-if="person.vehicles[0]">
                <b>Vehicles:</b>
                <div v-for="vehicle in vehicles" v-bind:key="vehicle">
                    <b-link :to="{ name: 'vehicle', params: {id: vehicle.url.match(/(\d+)/)[0], vehicle: vehicle}}" >
                        {{vehicle.name}}
                    </b-link>
                </div>
            </div>
            <div v-if="person.films[0]">
                <b>Films:</b>
                <div v-for="film in films" v-bind:key="film">
                    <b-link :to="{ name: 'film', params: {id: film.url.match(/(\d+)/)[0], film: film}}" >
                        {{film.title}}
                    </b-link>
                </div>
            </div>
        </div>      
        
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'person',
    data(){
        return {
            loading: true,
            starships: null,
            films: null,
            species: null,
            vehicles: null
        };
    },
    props: ['id', 'person'],
    async mounted(){

        /* Get Starships */
        if(this.person.starships){
            this.starships = await Promise.all(this.person.starships.map(async element => {
                const id = element.match(/(\d+)/)[0];
            return await axios.get(`http://localhost:3000/swapi/starship/${id}`).then(res => res.data);
            }));
        }

        /* Get Films */
        if(this.person.films){
            this.films = await Promise.all(this.person.films.map(async element => {
                const id = element.match(/(\d+)/)[0];
            return await axios.get(`http://localhost:3000/swapi/film/${id}`).then(res => res.data);
            }));
        }

        /* Get Species */
        if(this.person.species){
            this.species = await Promise.all(this.person.species.map(async element => {
                const id = element.match(/(\d+)/)[0];
            return await axios.get(`http://localhost:3000/swapi/specie/${id}`).then(res => res.data);
            }));
        }

        /* Get Vehicles */
        if(this.person.vehicles){
            this.vehicles = await Promise.all(this.person.vehicles.map(async element => {
                const id = element.match(/(\d+)/)[0];
            return await axios.get(`http://localhost:3000/swapi/vehicle/${id}`).then(res => res.data);
            }));
        }
        

        this.loading = false;
    },
}

</script>

<style lang="stylus">

</style>