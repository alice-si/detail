<template>

  <div id="app">
    <div id="nav">
      <header class="horizontal-nav" :gutter="12">
      <nav class="navbar navbar-light bg-white justify-content-end fixed-top border-bottom">
        <img src="../src/assets/alice_logo.png" width="43" height="40" class="company_logo" alt="company_logo">
          <img class="search-icon" src="../src/assets/Search.svg" alt="search-icon">
        <form class="form-inline">
          <input class="form-control mr-sm-2" style="width:250px; border: none;" type="search" placeholder="Search e.g. INS exam results" aria-label="Search">
          <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
        </form>
        <div class="notification-icon"><img src="../src/assets/Alert.svg" alt="alert"/></div>
        <div class="profile-icon"><img src="../src/assets/Profile.svg" alt="profile"/></div>
      </nav>
      </header>
      <aside class="vertical-nav">
        <nav class="navbar navbar-light bg-white flex-column justify-content-start">
            <!-- <router-link to="/"><inline-svg id="home-icon" :src='require("../src/assets/Home.svg")'></inline-svg></router-link> -->
            <router-link to="/"><img src='../src/assets/Home.svg' id="home-icon" class="home" alt="home" ></router-link>
            <router-link to="/ins"><img src='../src/assets/Dashboard.svg' id="dashboard" class="dashboard" alt="dashboard"></router-link>
            <!-- FIXME: change link directory -->
            <router-link to="/"><img src='../src/assets/Add.svg' class="add" alt="add"></router-link>
            <!-- FIXME: change link directory -->
            <router-link to="/"><img src='../src/assets/Settings.svg' class="settings" alt="settings"></router-link>
        </nav>

      </aside>
    </div>
    <router-view/>
  </div>
</template>

<script>
import InlineSvg from 'vue-inline-svg'

export default {
  components: {
    InlineSvg
  }
}

</script>

<style>
* {
  box-sizing: inherit;
}

:root {
  /* main font color */
  --color-light-grey: #D8D8D8;
  --color-dark-grey: #686868;
  --color-purple: #8954BA;
}

html {
  display: flex;
  background-color: #F5F7FC;
  width: 100vw;
  height: 100vh;
  font-size: 62.5%;
  font-family: Helvetica;
}

body {
  width: 100%;
  height: 100%;
  margin: 0;
}

.container-fluid {
  background-color: #F5F7FC !important;
}

h1 {
  font-size: 3.4rem;
  font-family: Helvetica;
  font-weight: 300;
  margin: 0;
  letter-spacing: -0.01px;
}

h2 {
  font-size: 2.88em;
  font-family: Helvetica;
  font-weight: 300;
  margin: 0;
  letter-spacing: -0.01px;
}

h3 {
  font-family: Helvetica;
  font-size: 1.4rem;
  font-weight: 300;
  margin: 0;
  letter-spacing: -0.01px;
}
.navbar {
  padding: 0 !important;
}
.company_logo {
  align-self: start;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}

.container-fluid {
  padding: 0px !important;
}

.form-inline .form-control {
  font-size: 1.5rem;
}

.search-icon {
  margin-right: 0.5rem;
}

.notification-icon {
  padding: 20px 20px 20px 20px !important;
  border-left: 1px solid var(--color-light-grey);
}

.profile-icon {
  padding: 10px 20px 10px 20px;
  margin-right: 10px;
  border-left: 1px solid var(--color-light-grey);
}

.vertical-nav {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 60px;
  height: 95%;
  justify-content: space-around;
  background-color: #ffffff;
  top: 62px;
  padding-top: 100px;
}

.vertical-nav > ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: fixed;
  height: 100%;
  overflow: auto;
}

.vertical-nav img {
  margin-bottom: 5rem;
}

#home-icon {
  padding: 0 12px 0 12px;
}

.dashboard {
  padding: 0 12px 0 12px;
  margin: 0;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.home #Home {
  background: var(--color-purple)
}
</style>
