<template>
  <nav class="navbar navbar-expand-lg navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand">Currency table</a>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" exact active-class="active" to="/">List</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="active" to="/converter">Converter</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>
<style>
nav {
  margin-bottom: 10px;
}
</style>
