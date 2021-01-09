<template>

  <div id="app">
    <div id="nav">
      <nav class="navbar navbar-light bg-white">
        <column :lg="1"><img src="../src/assets/alice_logo.png" width="43" height="40" class="company_logo" alt="company_logo"></column>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search e.g. INS exam results" aria-label="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
          <column :lg="1"><img src="../src/assets/Alert.svg"/></column>
          <column :lg="1"><img src="../src/assets/Profile.svg"/></column>
        </nav>
      <aside class="vertical-nav">
        <nav class="navbar navbar-light bg-white flex-column">
          <router-link to="/"><img src='../src/assets/Home.svg' class="home" alt="home"></router-link>
          <router-link to="/ins"><img src='../src/assets/Dashboard.svg' class="dashboard" alt="dashboard"></router-link>
          <!-- FIXME: change link direcntory -->
          <router-link to="/"><img src='../src/assets/Add.svg' class="add" alt="add"></router-link>
          <!-- FIXME: change link direcntory -->
          <router-link to="/"><img src='../src/assets/Settings.svg' class="settings" alt="settings"></router-link>
        </nav>

        <!-- <ul>
          <li><router-link to="/"><img src='../src/assets/Home.svg' class="home" alt="home"></router-link></li>
          <li><router-link to="/ins"><img src='../src/assets/Dashboard.svg' class="dashboard" alt="dashboard"></router-link></li>
          <!-- FIXME: change link direcntory -->
          <li><router-link to="/"><img src='../src/assets/Add.svg' class="add" alt="add"></router-link></li>
          <!-- FIXME: change link direcntory -->
          <li><router-link to="/"><img src='../src/assets/Settings.svg' class="settings" alt="settings"></router-link></li>
        </ul> -->
      </aside>
    </div>
    <router-view/>
  </div>
</template>

<style>
* {
  box-sizing: inherit;
}

:root {
  /* --color-south-sudan: #EA4C89;
  --color-kenya:  #2FB9EF;
  --color-tanzania: #67B675;
  --color-dr-congo: #f76511; */
  --color-light-grey: #D8D8D8;
  --color-dark-grey: #767676;
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
  color: var(--color-purple);
  font-weight: 300;
  margin: 0;
}

h2 {
  font-size: 2.88em;
  font-family: Helvetica;
  color: var(--color-purple);
  font-weight: 300;
  margin: 0;
}

h3 {
  font-family: Helvetica;
  font-size: 1.4rem;
  color: var(--color-dark-grey);
  font-weight: 300;
  margin: 0;
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

.horizontal-nav {
  background-color: #FFFFFF !important;
  display: flex;
  position: absolute;
  top: 0;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid var(--color-light-grey);
  align-items: center;
}

.vertical-nav {
  background-color: #FFFFFF !important;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 93%;
  justify-content: center;
}

.vertical-nav > ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: fixed;
  height: 100%;
  overflow: auto;
}

li img {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.home {
  margin-top: 10rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
