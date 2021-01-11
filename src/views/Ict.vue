<template>
  <main id="ict-skills">
    <section id="page-title" class="container-fluid">
      <div class="back"><router-link to="/"><img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back </router-link></div>
      <div><h1 class="title">ICT Skills</h1></div>
    </section>
    <section id="select-area" class="container-fluid">
      <row :gutter="12">
        <column :lg="1.5"><h3>Select Country</h3></column>
        <column :lg="2.5"><v-select :options="countries" @input="changeCountry" v-model="selectedCountry" class="select-country" placeholder="Show all" ></v-select></column>
        <column :lg="1.5"><h3>Select Camp</h3></column>
        <column :lg="2.5"><v-select :options="camps" @input="changeCamp" v-model="selectedCamp" class="select-camp" placeholder="Select country to activate"></v-select></column>
        <column :lg="1.5"><h3>Select School</h3></column>
        <column :lg="2.5"><v-select :options="schools" @input="changeSchool" v-model="selectedSchool" class="select-school" placeholder="Select camp to activate"></v-select></column>
      </row>
    </section>
    <section :gutter="12" class="chart-title-area">
      <row class="chart-title">
        <column :lg="8" xs-6><h2>Avg No of ICT skills/student in Tanzania, Nyarugusu, across schools</h2></column>
        <column :lg="4" xs-6>
          <div class="total-lessons"> <span><h1>+38%</h1> <h2>skills/students</h2></span><h3>after INS(Oct 2020)</h3></div>
          <!-- <div> {{'+38%'}} last 12months</div> -->
        </column>
      </row>
    </section>
    <!-- <section class="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="8" class="line-chart-area">
          <h3> No of lessons</h3>
          <line-chart :chart-data="chartData" :options="options"></line-chart>
        </column>
        <column :lg="4" class="summary-area">
          <div class="country-wrapper" v-for="country in dictForVfor" v-bind:key="country.vForId" :value="country.vForId">
            <div class="text-container">
              <input type="checkbox" v-bind:class="country.cssId" v-bind:id="country.cssId" v-bind:key="country.vForId" :value="country.vForId" v-model="checkedCountries">
                <label v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="justify-content:center; align-item:center;">
                    <span v-bind:class="country.cssId" v-bind:for="country.cssId" style="color:#ffffff; margin:2px; width:10px; height:10px;">V</span>
                  </div>
                </label>
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important;">
                      <h1 style="display: inline; margin-right: 5px;" v-bind:class="country.cssId" v-bind:for="country.cssId">{{ lessonsByCountries[country.propId] }}</h1>
                      <h2 style="display: inline;" v-bind:class="country.cssId" v-bind:for="country.cssId">lessons </h2>
                  </div>
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8';">
                    <h2 style="font-size:1rem; text-align:left">in {{country.vForId}}</h2>
                  </div>
                </div>
            </div>
            <div class="chart-container">
              <bar-chart :chart-data="barChartData[country.propId]" :options="barchartOption"></bar-chart>
            </div>
          </div>
        </column>
      </row>
     </section>  -->
  </main>
</template>

<script>

export default {
  name: 'attendance'
  // components: {

  // },
  // data () {
  //   return {

  //   }
  // },
  // mounted () {

  // },
  // methods: {

  // }
}
</script>

<style>
  .text {
    padding: 100px;
    font-size: 100px;
  }
  main {
  display: flex;
  flex-direction: column;
  padding: 10rem 6rem 5rem 10rem;
}

    .navbar {
      background: white;
    }
    .back {
      align-self: start;
    }

    .title {
      font-family: Helvetica;
      font-size: 3.4rem;
      color: var(--color-purple);
      font-weight: 300;
      text-align: left;
    }

    #page-title {
      display: flex;
      flex-direction: column;
    }

    .back {
      padding-bottom: var(--padding-wide);
      align-items: center;
    }

    .back a {
      color: var(--color-dark-grey);
      font-size: 1.2rem;
    }

    .title {
      padding-bottom: calc(var(--padding-wide)/1.5);
    }

    .container[data-v-42e9a5e0] {
      width: 100% !important;
    }

    #select-area{
      display: flex !important;
      flex-direction: row !important;
      align-items: center !important;
      padding-bottom: calc(var(--padding-wide)/1.5);
    }

    #select-area h3 {
      color: var(--color-dark-grey)
    }

    .colVGR {
      padding: 0px !important;
      align-self: center;
      border-radius: 0px;
    }

    /* selectbox design customizing start */
    #vs__selected {
      font-size: 1.4rem;
    }

    .select-country .vs__search::placeholder {
      color: var(--color-dark-grey);
      font-size: 1.4rem;
    }

    .select-camp .vs__search::placeholder {
      color: var(--color-dark-grey);
      font-size: 1.4rem;
    }

    .select-school .vs__search::placeholder {
      color: var(--color-dark-grey);
      font-size: 1.4rem;
    }

    .vs__dropdown-toggle {
      border-radius: 2px;
      background-color: #ffffff70;
      border-color:#ffffff70;
      padding: 1rem;
    }

    .vs__dropdown-toggle:active {
      background-color: #ffffff;
      border-color: #ffffff;
    }

    .vs__dropdown-menu {
      box-shadow: none;
      border: none;
      border-radius: 2px;
      font-size: 1.4rem;
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

    /* selectbox design customizing end */

    /* #vs1__listbox {
      border: 1px, solid
    } */

    .chart-title-area {
      display: flex;
      color: var(--color-purple);
      margin-top: 1.5rem;
      /* margin-left: 10.5rem;
      margin-top: 5rem; */
    }

    .total-lessons {
      display: flex;
      flex-direction: column;
      padding-left: 10rem;
    }

    .total-lessons h1,
    .total-lessons h2,
    .total-lessons h3 {
      display: inline;
      color: var(--color-purple);
    }

    .total-lessons span {
      align-self: start;
    }

    .total-lessons h1 {
      margin-right: 1rem;
    }

    .total-lessons h2 {
      font-weight: 100;
    }

    .total-lessons h3 {
      text-align: left;
      font-size: 1rem;
      font-weight: 100;
    }

    .chart-area {
      margin-top: 3rem;
      padding: 3rem;
      display: flex;
      flex-direction: column;
      height: 45%;
    }

    .chart-main {
      display: flex;
      background-color:#ffffff;
    }

    .chart-title {
      display: flex;
    }

    .chart-title h2 {
      text-align:left;
      margin: 0;
      color: var(--color-purple)
    }

    .line-chart-area {
      padding: 3rem !important;
      /* padding-top: 3rem !important; */
      display: flex;
      flex-direction: column;
    }

    .line-chart-area h3 {
      font-family: Helvetica;
      font-size: 12px;
      color: #666666;
      letter-spacing: -0.01px;
      text-align: left;
    }

    .summary-area {
      display: flex;
      flex-direction: column;
      height: 100%;
      border-left: solid 1px var(--color-light-grey);
      align-items: center;
    }

    .text-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      margin-right: 1rem;
    }

    .summary-text{
      color: #D8D8D8;
      align-items: flex-start;
    }

    .chart-container {
      display: flex;
      padding-left: 1.5rem;
    }

    /* #line-chart {
      width: 100% !important;
      height: 100% !important;
    } */

    #bar-chart {
      width: 100px !important;
      height: 50px !important;
    }

    .country-wrapper {
      display: flex;
      align-items: center;
      height: 100px;
      padding: 10px;
    }

    label {
      display: flex;
      flex-direction: row;
      /* align-content: center; */
      text-align: left;
      color: var(--color-light-grey);
    }

    label div {
      display:flex;
      width:18px;
      height:18px;
      background:white;
      border:1px solid var(--color-light-grey);
      cursor:pointer;
      border-radius: 3px;
      margin-right: 10px;
      /* align-self: center; */
    }
    #south-sudan {
      display: none;
    }
    #kenya {
      display: none;
    }
    #tanzania {
      display: none;
    }
    #dr-congo{
      display: none;
    }

    .table {
      margin-top: 3rem;
      background-color: #ffffff;
      display: flex;
    }
</style>
