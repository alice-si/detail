<template>
  <div class="home">
    <main id="home">
      <section id="filtering-area" >
        <row :gutter="12">
          <column :lg="2.5" :xs="2"><h3>Select programme</h3></column>
          <column :lg="3" :xs="2">
            <v-select class="dashboard-select" placeholder="Instant Network Schools" :searchable="false">
              <span slot="no-options">
                <h3 style="text-align:left; padding-left: 1.8rem; color:#686868; font-family: Helvetica; font-size:1.68rem;">No more available options</h3> 
              </span>
            </v-select>
          </column>
          <column :lg="1" :xs="1"><img src="../../src/assets/Grid.svg" alt="grid" class="grid"/></column>
          <column :lg="0.5" :xs="1"><img src="../../src/assets/List.svg" class="list"/></column>
        </row>
      </section>
      <section id="thumbnail-area">
        <row :gutter="12">
          <h1>See the impact of your work</h1>
        </row>
        <row :gutter="12" id="thumbnails">
          <router-link to="/ins">
            <column class="thumbnail-tile" :lg="4">
              <div class="thumbnail-wrapper">
                <div class="link-title">
                  <h1>INS Lessons</h1>
                  <h1 style="color:#8954BA;">{{insGrowthRate}}</h1>
                  </div>
                  <img src="../../src/assets/dummy1.svg"/>
                  <h3>Showing data till {{lastUpdate}}</h3>
              </div>
            </column>
          </router-link>
          <router-link to="/attendance">
            <column class="thumbnail-tile" :lg="4">
              <div class="thumbnail-wrapper">
                <div class="link-title"> 
                <h1>Students attendance</h1>
                <!-- update growth rate later -->
                <h1 style="color:#8954BA;"></h1>
                </div>
                <img src="../../src/assets/dummy2.svg"/>
                <h3>Showing data till {{lastUpdate}}</h3>
              </div>
            </column>
          </router-link>
          <router-link to="/ict">
            <column class="thumbnail-tile" :lg="4">
              <div class="thumbnail-wrapper">
                <div class="link-title">  
                <h1>ICT skills acquired</h1>
                <h1 style="color:#8954BA;">{{ictGrowthRate}}</h1>
                </div>
                <img src="../../src/assets/dummy3.svg"/>
                <h3>Showing data till {{lastUpdate}}</h3>
              </div>
            </column>
          </router-link>
        </row>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
// import html2canvas from 'html2canvas'
// import LinkPrevue from 'link-prevue'
import { getLessons, getStudentAvgAcrossSchools } from '../data/data-provider.js'
import { compareDataByYear, calcDifference } from '../data/data-handler'

export default {

  name: 'home',
  components: {
    // LinkPrevue
  },
  data () {
    return {
      dashboardName: 'INS Lessons',
      lastUpdate: '31/12/2019',
      insGrowthRate: '',
      ictGrowthRate: ''
    }
  },
  mounted () {
    this.getInsGrowthRate()
  },
  methods: {
    getInsGrowthRate () {
      const prevYear = getLessons([], [], [], '2018')
      const currYear = getLessons([], [], [], '2019')
      this.insGrowthRate = compareDataByYear(Object.values(prevYear.lessons[0]), Object.values(currYear.lessons[0]))
      this.ictGrowthRate = calcDifference([getStudentAvgAcrossSchools('Total', 'Base')], [getStudentAvgAcrossSchools('Total', 'End')])[0]
    }
  }
}
</script>

<style>

main#home {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 6.5rem 4.5rem 4.5rem 9rem;
  max-width: 1440px;
}

.container {
  padding: 0;
  margin: 0;
}

#filtering-area {
  width: 100%;
  height: 5rem;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
}

#filtering-area h3 {
  color: var(--color-dark-grey);
  font-size: 1.68rem;
  text-align: right;
  margin-right: 2rem;
}

#filtering-area .container {
  justify-content: flex-end;
  width: 100%;
}

.grid {
  margin-left: 1rem;
  margin-right: 1rem;
}

.container[data-v-42e9a5e0] {
  margin: 0 !important;
  padding: 0 !important;
}

/* selectbox design customizing start */
#home .vs__dropdown-toggle {
  height: 4.68rem;
  width: 29.04rem;
  background-color: #ffffff;
  border: none;
  font-size: 1.68rem;
  color: #686868;
  padding-left: 1rem;
}

#home .vs__dropdown-menu {
  background-color: #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.68rem;
  width: 29.04rem !important;
}

#home .vs__search {
  margin: 0;
  padding: 0;
}

#home .vs__selected {
  margin: 0;
  padding: 0;
}

/* selectbox design customizing end */

 #thumbnails a {
   text-decoration: none;
 }

.thumbnail-tile {
  background-color: #ffffff;
  width: 32.4rem;
  height: 32.8rem;
  margin-top: 4.5rem;
  margin-right: 4.2rem;
  box-shadow: -13px 11px 25px 0 #adb6d92b;
}

.thumbnail-wrapper {
  padding: 3.5rem 2.5rem 2rem 2.5rem;
  width: 32.4rem;
  height: 31.2rem;
  text-align: left;
  display:flex;
  flex-direction: column;
}

.thumbnail-wrapper img {
  margin-top: 3rem;
  margin-bottom: 1.6rem;
  width: 27.9rem;
  height: 18.1rem;
  border: 1px solid  var(--color-light-grey);
}

.thumbnail-wrapper h1 {
  display: inline;
  font-family: Helvetica;
  font-size: 2.16rem;
  color: var(--color-dark-grey);
}

.thumbnail-wrapper h3 {
  font-family: Helvetica;
  font-size: 1.68rem;
  margin: 0;
  color: #A6A7A8;
}

.link-title {
display: flex;
justify-content:space-between;
}

</style>
