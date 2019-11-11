<template>
    <div>
        <h3>Planets</h3>
        <b-table striped hover :items="planets" :fields="fields">
            <template v-slot:cell(url)="data">
                <b-link :to="{ name: 'planet', params: {id: data.value.match(/(\d+)/)[0], planet: data.item}}" >click here</b-link>
            </template>
        </b-table>
        <b-row>
            <b-col>
                Have {{count}} planets - page {{page}}
            </b-col>
            <b-col>
                <b-row align-h='end'>
                    <b-col lg='2'>
                        <b-button variant="outline-primary" v-on:click="previousPlanets()">previous</b-button>
                    </b-col>
                    <b-col lg='2'>
                        <b-button variant="outline-primary" v-on:click="nextPlanets()">next</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from "axios";

const getPlanets = (component) => {
    axios.get(`http://localhost:3000/swapi/planets?page=${component.page}`).then((res) => {
        const { results: planets, next:next_page, previous:previous_page, count} = res.data;
        Object.assign(component, {planets, next_page, previous_page, count});
    });
}

export default {
    name: 'planets-list',
    data(){
        return {
            planets: null,
            next_page: null,
            previous_page: null,
            count: 0,
            page: 1,
            fields: ['name', 'population', 'terrain','climate', {key:'url', label:'Informations'}]
        };
    },
    mounted() {
            getPlanets(this);
    },
    methods: {
        nextPlanets: function() {
            if(this.next_page){
                this.page++;
                getPlanets(this);
            } else {
                alert('Not found next page');    
            }
        },
        previousPlanets: function() {
            if(this.previous_page){
                this.page--;
                getPlanets(this);
            } else {
                alert('Not found previous page');    
            }
        }
    }
}

</script>

<style lang="stylus">

</style>