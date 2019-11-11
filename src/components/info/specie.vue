<template>
    <div>
        <h3>{{specie.name}}</h3>
        <b>Name:</b> {{specie.name}}<br>
        <b>Classification:</b> {{specie.classification}}<br>
        <b>Designation:</b> {{specie.designation}}<br>
        <b>Average Height:</b> {{specie.average_height}}<br>
        <b>Average Lifespan:</b> {{specie.average_lifespan}}<br>
        <b>Skin Colors:</b> {{specie.skin_colors}}<br>
        <b>Hair Colors:</b> {{specie.hair_colors}}<br>
        <b>Eye Colors:</b> {{specie.eye_colors}}<br>
        <b>Language:</b> {{specie.language}}<br>
        <div v-if="!loading">
            <div v-if="specie.homeworld != null">
                <b>Homeworld:</b>
                <div>
                    <b-link :to="{ name: 'planet', params: {id: homeworld.url.match(/(\d+)/)[0], planet: homeworld}}" >
                        {{ homeworld.name }}
                    </b-link>
                </div>
            </div>
        </div>
        <div v-if="!loading">
            <div v-if="specie.people[0]">
                <b>People:</b>
                <div v-for="person in people" v-bind:key="person">
                    <b-link :to="{ name: 'person', params: {id: person.url.match(/(\d+)/)[0], person: person}}" >
                        {{ person.name }}
                    </b-link>
                </div>
            </div>        
        </div>
        <div v-if="!loading">
            <div v-if="specie.films[0]">
                <b>Films:</b>
                <div v-for="film in films" v-bind:key="film">
                    <b-link :to="{ name: 'film', params: {id: film.url.match(/(\d+)/)[0], film: film}}" >
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
    name: 'specie',
    data(){
        return {
            loading: true,
            people: null,
            films: null,
            planets: null
        };
    },
    props: ['id', 'specie'],
    async mounted(){
        
        /* Get Persons */
        if(this.specie.people){
            this.people = await Promise.all(this.specie.people.map(async element => {
                const id = element.match(/(\d+)/)[0];
                return await axios.get(`http://localhost:3000/swapi/person/${id}`).then(res => res.data);
            }));
        }

        /* Get Films */
        if(this.specie.films){
            this.films = await Promise.all(this.specie.films.map(async element => {
                const id = element.match(/(\d+)/)[0];
            return await axios.get(`http://localhost:3000/swapi/film/${id}`).then(res => res.data);
            }));
        }

        /* Get Planets */
        if(this.specie.homeworld){
            const id = this.specie.homeworld.match(/(\d+)/)[0];
            this.homeworld = await axios.get(`http://localhost:3000/swapi/planet/${id}`).then(res => res.data);
        }


        this.loading = false;
    },
}

</script>

<style lang="stylus">

</style>