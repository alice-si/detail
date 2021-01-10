<template>

  <div id="app">
    <div id="nav">
      <header class="horizontal-nav" :gutter="12">
      <nav class="navbar navbar-light bg-white justify-content-end fixed-top border-bottom">
        <img src="../src/assets/alice_logo.png" width="43" height="40" class="company_logo" alt="company_logo">
         <img class="search-icon" src="../src/assets/Search.svg" alt="">
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
            <router-link to="/"><img src='../src/assets/Home.svg' class="home" alt="home"></router-link>
            <router-link to="/ins"><img src='../src/assets/Dashboard.svg' class="dashboard" alt="dashboard"></router-link>
            <!-- FIXME: change link direcntory -->
            <router-link to="/"><img src='../src/assets/Add.svg' class="add" alt="add"></router-link>
            <!-- FIXME: change link direcntory -->
            <router-link to="/"><img src='../src/assets/Settings.svg' class="settings" alt="settings"></router-link>
        </nav>

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
  --padding-wide: 3rem;
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
}

h2 {
  font-size: 2.88em;
  font-family: Helvetica;
  font-weight: 300;
  margin: 0;
}

h3 {
  font-family: Helvetica;
  font-size: 1.4rem;
  font-weight: 300;
  margin: 0;
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

.form-inline .form-control {
  font-size: 1.5rem;
  /* margin-right: 3rem; */
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
  width: 50px;
  height: 95%;
  justify-content: space-around;
  background-color: #ffffff
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

.home {
  margin-top: 8rem;
  margin-bottom: 5rem;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
