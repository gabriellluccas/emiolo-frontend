<template>
    <div>
        <h3>Species</h3>
        <b-table striped hover :items="species" :fields="fields">
            <template v-slot:cell(url)="data">
                <a v-bind:href="data.value">for more info click here</a>
            </template>
        </b-table>
        <b-row>
            <b-col>
                Have {{count}} species - page {{page}}
            </b-col>
            <b-col>
                <b-row align-h='end'>
                    <b-col lg='2'>
                        <b-button variant="outline-primary" v-on:click="previousSpecies()">previous</b-button>
                    </b-col>
                    <b-col lg='2'>
                        <b-button variant="outline-primary" v-on:click="nextSpecies()">next</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";

const getSpecies = (component) => {
    axios.get(`http://localhost:3000/swapi/species?page=${component.page}`).then((res) => {
        const { results: species, next:next_page, previous:previous_page, count} = res.data;
        Object.assign(component, {species, next_page, previous_page, count});
    });
}

export default {
    name: 'species-list',
    data(){
        return {
            species: null,
            next_page: null,
            previous_page: null,
            count: 0,
            page: 1,
            fields: ['name', 'classification', 'designation','language', {key:'url', label:'Informations'}]
        };
    },
    mounted() {
            getSpecies(this);
    },
    methods: {
        nextSpecies: function() {
            if(this.next_page){
                this.page++;
                getSpecies(this);
            } else {
                alert('Not found next page');    
            }
        },
        previousSpecies: function() {
            if(this.previous_page){
                this.page--;
                getSpecies(this);
            } else {
                alert('Not found previous page');    
            }
        }
    }
}

</script>

<style lang="stylus">

</style>