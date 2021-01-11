<template>
  <div class="home">
    <main id="home">
      <section id="filtering-area" >
        <row :gutter="12">
          <column :lg="2.5" xs-2><h3>Select programme</h3></column>
          <column :lg="3" xs-2><v-select placeholder="Instant Network Schools"> :options="dashboards"</v-select></column>
          <column :lg="1" xs-1><img src="../../src/assets/Grid.svg" alt="grid" class="grid"/></column>
          <column :lg="0.5" xs-1><img src="../../src/assets/List.svg" class="list"/></column>
        </row>
      </section>
      <section id="thumbnail-area" class="container-fluid">
        <row :gutter="12">
          <h1>See the impact of your work</h1>
        </row>
        <row :gutter="12" id="thumbnails">
          <column class="thumb-1" :lg="4">
            <!-- {{dashboardName}} -->
            <!-- <link-prevue url="https://dashboard.joannakang.vercel.app/#/ins"></link-prevue> -->
            <router-link to="/ins"><img src="../../src/assets/dummy1.png" width="90%" height="90%"/></router-link>
            <!-- {{thumbnails}} -->
            <!-- Showing data till {{lastUpdate}} -->
          </column>
           <column class="thumb-2" :lg="4">
            <router-link to="/attendance"><img src="../../src/assets/dummy2.png" width="90%" height="90%"/></router-link>
          </column>
          <column class="thumb-3" :lg="4">
            <router-link to="/ict"><img src="../../src/assets/dummy3.png" width="90%" height="90%"/></router-link>
          </column>
        </row>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
// import html2canvas from 'html2canvas'
import LinkPrevue from 'link-prevue'

export default {

  name: 'home',
  components: {
    LinkPrevue
  },
  data () {
    return {
      dashboardName: 'INS Lessons',
      lastUpdate: '11/10/2020',
      thumbnails: ''
    }
  },
  mounted () {
    // this.thumbnails = this.setThumbnails()
  }
  // methods: {

  // }
}
</script>

<style>

main {
  display: flex;
  flex-direction: column;
  padding: 5rem;
}

.grid {
  margin-left: 1rem;
  margin-right: 1rem;
}

#filtering-area {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

#filtering-area h3 {
  color: var(--color-dark-grey);
  font-size: 1.5rem;
  text-align: right;
  margin-right: 1rem;
}

#filtering-area .container {
  display: flex;
  justify-content: flex-end;
}

#vs1__combobox {
  background-color:#ffffff;
  border: none;
  border-radius: 2px;
}

#vs1__combobox .vs__search::placeholder {
  color: var(--color-dark-grey);
}

#vs1__combobox .vs__no-options:active {
  background-color: #ffffff;
  border-color: #ffffff;
}

#vs1__listbox .vs__dropdown-menu {
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.4rem;
}

#thumbnail-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#thumbnail-area h1 {
  color: var(--color-dark-grey);
  margin: 4rem 0 4rem 0;
}

#thumbnails img {
  box-shadow: -13px 11px 25px 0 #adb6d92b;
  border-radius: 0.12rem;
}

</style>
