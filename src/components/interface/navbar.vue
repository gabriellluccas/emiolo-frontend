<template>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{ name: 'users' }">{{name}}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item :to="{ name: 'species' }">Especies</b-nav-item>
                <b-nav-item :to="{ name: 'planets' }">Planets</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
</template>

<script>
export default {
    data(){
      return{
        name: localStorage.name
      }
    }
}
</script>

<style lang="stylus">

</style>