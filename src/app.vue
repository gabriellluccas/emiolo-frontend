<template>
    <b-conteiner>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand :to="{ name: 'users' }">Emiolo</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item :to="{ name: 'species' }">Especies</b-nav-item>
            <b-nav-item :to="{ name: 'planets' }">Planets</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      <b-row align-h="center">
        <b-col lg='8' md='8'>
          <br>
          <router-view/>
        </b-col>
      </b-row>
    </b-conteiner>
</template>

<script>

export default {
  name: 'app',
  components: {
  }
}
</script>

<style>
</style>
