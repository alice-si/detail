<template>
  <main id="ict-skills">
    <section id="page-title" class="container-fluid">
      <div class="back"><router-link to="/"><img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back </router-link></div>
      <row :gutter="12" class="page-title-container">
        <column :lg="7" :xs="6"><h1 class="title">ICT Skills</h1></column>
        <column :lg="5" :xs="6" class="toggle-area">
        <h3>Students</h3>
          <div class="wrap">
            <input type="checkbox" id="view-toggle" v-on:click="viewToggle"/>
            <label class="slider" for="view-toggle"></label>
          </div>
        <h3>Teachers</h3>
        </column>
      </row>
    </section>
    <section id="select-area" class="container-fluid">
      <row :gutter="12">
        <column :lg="1.5"><h3>Select Country</h3></column>
        <column :lg="2.5"><v-select :options="countries" v-model="selectedCountry" class="select-country" placeholder="Tanzania" ></v-select></column>
        <column :lg="1.5"><h3>Select Camp</h3></column>
        <column :lg="2.5"><v-select :options="camps" v-model="selectedCamp" class="select-camp" placeholder="Nyarugusu"></v-select></column>
        <column :lg="1.5"><h3>Select School</h3></column>
        <column :lg="2.5"><v-select :options="schools" v-model="selectedSchool" class="select-school" placeholder="Select camp to activate"></v-select></column>
      </row>
    </section>
    <section :gutter="12" class="chart-title-area">
      <row class="chart-title">
        <column :lg="9" :xs="6"><h2>Avg No of ICT skills/student in Tanzania, Nyarugusu, across schools</h2></column>
        <column :lg="3" :xs="6">
          <div class="total-skills"> <span><h1>+38%</h1><h2>skills/students</h2></span></br><h3>after INS (Oct 2020)</h3></div>
          <!-- <div> {{'+38%'}} last 12months</div> -->
        </column>
      </row>
    </section>
    <section class="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="9" class="ictskills-bar-chart-area">
          <h3> Avg No of ICT skills/student</h3>
          <group-bar-chart :chart-data="groupBarChartData" :options="options"></group-bar-chart>
          <column :lg="8" :xs="12" id="compare-select-box"><v-select :options="compareyears" id="compare-year" placeholder="Before INS vs After INS" ></v-select></column>
        </column>
        <column :lg="3" class="summary-area">
          <row>
            <column class="summary-grid" :lg="6" :xs="6">
            <input type="checkbox" id="select-1" style="display:none">
              <label class="select-1" for="select-1">
                <div style="justify-content:center; align-item:center;">
                  <span style="color:#5b34eb; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div class="checkbox-text-area">
                <h1>+30%</h1>
                <h3>in Lycee de Paix</h3>
              </div>
            </column>
            <column class="summary-grid" :lg="6" :xs="6">
              <input type="checkbox" id="select-2" style="display:none">
              <label class="select-2" for="select-2">
                <div style="justify-content:center; align-item:center;">
                  <span style="color:#5b34eb; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div class="checkbox-text-area">
                <h1>+42%</h1>
                <h3>in Amani</h3>
              </div>
            </column>
          </row>
          <row>
            <column class="summary-grid" :lg="6" :xs="6">
              <input type="checkbox" id="select-3" style="display:none">
              <label class="select-3" for="select-3">
                <div style="justify-content:center; align-item:center;">
                  <span style="color:#5b34eb; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div class="checkbox-text-area">
                <h1>+51%</h1>
                <h3>in Amitie</h3>
              </div>
            </column>
            <column class="summary-grid" :lg="6" :xs="6">
              <input type="checkbox" id="select-4" style="display:none">
              <label class="select-4" for="select-4">
                <div style="justify-content:center; align-item:center;">
                  <span style="color:#5b34eb; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div class="checkbox-text-area">
                <h1>+33%</h1>
                <h3>in Rehema</h3>
              </div>
            </column>
          </row>
          <row>
            <column class="summary-grid" :lg="6" :xs="6">
              <input type="checkbox" id="select-5" style="display:none">
              <label class="select-5" for="select-5">
                <div style="justify-content:center; align-item:center;">
                  <span style="color:#5b34eb; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div class="checkbox-text-area">
                <h1>+22%</h1>
                <h3>in Hodari</h3>
              </div>
            </column>
            <column class="summary-grid" :lg="6" :xs="6">
              <input type="checkbox" id="select-6" style="display:none">
              <label class="select-6" for="select-6">
                <div style="justify-content:center; align-item:center;">
                  <span style="color:#5b34eb; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div class="checkbox-text-area">
                <h1>+18%</h1>
                <h3>in Fraternite</h3>
              </div>
            </column>
          </row>
        </column>
      </row>
      <table-for-ICT class="table-area" v-bind:tableData="tableData" ></table-for-ICT>
    </section>
  </main>
</template>

<script>
import GroupBarChart from '../components/GroupBarChart'
import TableForICT from '../components/TableForICT'
import { getIctSchoolList, getIctSchoolAvg, getAvgAcrossSchools } from '../data/data-provider'
import { getGroupBarChartColorSheme } from '../data/colour-scheme'
export default {
  name: 'attendance',
  components: {
    GroupBarChart,
    TableForICT
  },
  data () {
    return {
      viewMode: 'Students',
      countries: [],
      camps: [],
      schools: [],
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,
      compareyears: ['Before INS (Oct 2017) vs After INS (Oct 2018)', 'Before INS (Oct 2017) vs After INS (Oct 2019)', 'Before INS (Oct 2017) vs After INS (Oct 2020)'],
      groupBarChartData: {},
      tableData: {},
      options: {
        legend: { display: false },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: { color: '#ffffff' },
            display: true,
            stacked: false,
            ticks: {
              // fontColor: '#EA4C89'
            }
          }],
          yAxes: [{
            display: true,
            position: 'left',
            ticks: {
              beginAtZero: true
            } }]
        }
      }
    }
  },
  mounted () {
    this.countries = ['Tanzania']
    this.camps = ['Nyarugusu']
    this.schools = getIctSchoolList()
    this.switchViewMode()
  },
  methods: {
    switchViewMode () {
      console.log(this.viewMode)
      switch (this.viewMode) {
        case 'Students':
          this.groupBarChartData = this.getGroupBarChartData()
          this.tableData = this.getTableData()
      }
    },
    viewToggle () {
      if (this.viewMode === 'Students') {
        this.viewMode = 'Teachers'
      } else {
        this.viewMode = 'Students'
      }
    },
    getGroupBarChartData () {
      const labelArr = getIctSchoolList()
      const baseYearData = {}
      const endYearData = {}

      labelArr.forEach(el => {
        baseYearData[el] = getIctSchoolAvg(`${el}`, 'Total', 'Base')
      })
      labelArr.forEach(el => {
        endYearData[el] = getIctSchoolAvg(`${el}`, 'Total', 'End')
      })

      const dataset = {
        labels: labelArr,
        datasets: [{ // label: 'baseYear',
          backgroundColor: getGroupBarChartColorSheme().opacity,
          barThickness: 15,
          data: Object.values(baseYearData)
        }, {// label: 'endYear',
          backgroundColor: getGroupBarChartColorSheme().normal,
          barThickness: 15,
          data: Object.values(endYearData)
        }]
      }
      return dataset
    },
    getIctRate (school, type, year) {
      const avgSchoolIctSkill = getIctSchoolAvg(`${school}`, `${type}`, `${year}`)
      return avgSchoolIctSkill
    },
    calcDifference (base, end) {
      const difference = end.map((end, index) => {
        if (end - base[index] < 0) {
          return '-' + end - base[index] + '%'
        } else if (end - base[index] > 0) {
          const plus = '+'
          return plus.concat('', end - base[index]) + '%'
        } else {
          return 0 + '%'
        }
      })
      return difference
    },
    getTableData () {
      const labelArr = getIctSchoolList()
      const totalBaseYearData = {}
      const totalEndYearData = {}
      const maleBaseYearData = {}
      const maleEndYearData = {}
      const femaleBaseYearData = {}
      const femaleEndYearData = {}
      const tableProp = {}

      labelArr.forEach(el => {
        totalBaseYearData[el] = this.getIctRate(`${el}`, 'Total', 'Base')
        totalEndYearData[el] = this.getIctRate(`${el}`, 'Total', 'End')
        maleBaseYearData[el] = this.getIctRate(`${el}`, 'Male', 'Base')
        maleEndYearData[el] = this.getIctRate(`${el}`, 'Male', 'End')
        femaleBaseYearData[el] = this.getIctRate(`${el}`, 'Female', 'Base')
        femaleEndYearData[el] = this.getIctRate(`${el}`, 'Female', 'End')
      })

      console.log('totalBaseYearData', totalBaseYearData)

      tableProp.columns = Object.keys(totalBaseYearData)
      tableProp.total = {
        beforeIns: Object.values(totalBaseYearData),
        afterIns: Object.values(totalEndYearData)
      }
      tableProp.male = {
        beforeIns: Object.values(maleBaseYearData),
        afterIns: Object.values(maleEndYearData)
      }
      tableProp.female = {
        beforeIns: Object.values(femaleBaseYearData),
        afterIns: Object.values(femaleEndYearData)
      }
      tableProp.total.beforeIns.push(getAvgAcrossSchools('Total', 'Base'))
      tableProp.total.afterIns.push(getAvgAcrossSchools('Total', 'End'))
      tableProp.total.difference = this.calcDifference(tableProp.total.beforeIns, tableProp.total.afterIns)
      tableProp.male.beforeIns.push(getAvgAcrossSchools('Male', 'Base'))
      tableProp.male.afterIns.push(getAvgAcrossSchools('Male', 'End'))
      tableProp.male.difference = this.calcDifference(tableProp.male.beforeIns, tableProp.male.afterIns)
      tableProp.female.beforeIns.push(getAvgAcrossSchools('Female', 'Base'))
      tableProp.female.afterIns.push(getAvgAcrossSchools('Female', 'End'))
      tableProp.female.difference = this.calcDifference(tableProp.female.beforeIns, tableProp.female.afterIns)
      console.log('tableProp', tableProp)
      return tableProp
    }
  },
  watch: {
    viewMode () {
      this.switchViewMode()
    }
  }
}
</script>

<style>
main#ict-skills {
  display: flex;
  flex-direction: column;
  margin: 6.2rem 0 0 6.2rem;
  padding: 8rem 4.5rem 4.5rem 8rem;
  max-width: 1440px;
}

.back {
  align-self: start;
  padding: 1.5rem 0 1.5rem 0;
}

.page-title-container .title {
  font-family: Helvetica;
  font-size: 3.4rem;
  color: var(--color-purple);
  font-weight: 300;
  text-align: left;
}

#page-title {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
}

.back {
  padding-bottom: 3rem;
  align-items: center;
}

.back a {
  color: var(--color-dark-grey);
  font-size: 1.2rem;
}

.title {
  padding-bottom: 0rem;
}

.toggle-area {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.toggle-area h3 {
  font-size: 1.2rem;
  font-weight: 100;
  margin: 0;
}

/* toggle */
/* background */
.wrap label { margin: 0 1rem 0 1rem }
.wrap input { position:absolute; left:-9999px }

.slider {
  position: relative; display: block;
  width: 14em; height: 2em;
  cursor: pointer;
  transition: 550ms;
  border: 1px solid var(--color-light-grey);
  border-radius: 8px;
}

/* switch */
.slider::after {
  position: absolute; content:'';
  width: 4em; height: 2em;
  top: 0em; left: 0em;
  border-radius: 8px;
  transition:
    width 200ms ease-out,
    height 300ms 50ms ease-in,
    top 300ms 50ms ease-in,
    left 250ms 50ms ease-in,
    background 300ms ease-in,
    box-shadow 300ms ease-in;
  background:  var(--color-purple);
}

.wrap input:checked + .slider::after {
  width: 4em; height: 2em;
	top: 0; left: 10em;
  background: var(--color-purple);
  box-shadow: 0 0 0 0 #f2f2f2 inset;
  border-radius: 8px;
}
/* toggle end */

/* fake checkbox decoration  */
.summary-area label div {
  display:flex;
  width:18px;
  height:18px;
  background:white;
  border:1px solid var(--color-light-grey);
  cursor:pointer;
  border-radius: 3px;
  margin: 0 2rem 0 2rem;
}

.summary-grid {
  display: inline-flex;
  align-items: center;
  margin-bottom : 1.5rem;
  color: var(--color-dark-grey);
}

.summary-grid h1 {
  font-size: 2.5rem;
}

.summary-grid h3 {
  font-size: 1rem;
}

.checkbox-text-area {
  display: flex;
  flex-direction: column;
}

.checkbox-text-area {
  text-align: left;
}

.chart-title h2 {
  font-size: 2rem;
  font-weight: 100;
}

.total-skills h1,
.total-skills h2,
.total-skills h3 {
  display: inline;
  color: var(--color-purple);
}

.total-skills h1 {
  font-size: 2.5rem;
  margin-right: 0.5rem;
}

.total-skills h2 {
  font-size: 2rem;
  font-weight: 100;
}

.total-skills h3 {
  font-size: 1rem;
  font-weight: 100;
}

#select-area {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
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

/* selectbox design customizing end */
.chart-title-area {
  display: flex;
  color: var(--color-purple);
  margin-top: 3rem;
}

.chart-summary {
  display: flex;
  flex-direction: row;
}

.chart-area {
  margin-top: 3rem;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  height: 45%;
  background-color: #ffffff;
}

.chart-main {
  display: flex;
  background-color:#ffffff;
}

.chart-title {
  display: flex;
  padding: 0 !important;
}

.chart-title h2 {
  text-align:left;
  margin: 0;
  color: var(--color-purple)
}

.ictskills-bar-chart-area {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-light-grey)
}

.ictskills-bar-chart-area h3 {
  font-family: Helvetica;
  font-size: 12px;
  letter-spacing: -0.01px;
  text-align: left;
}

.ictskills-bar-chart-area #bar-chart {
  padding: 2rem 3rem 1.5rem 0;
}

.summary-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: none;
  align-items: center;
  padding-left: 1rem;
}

#compare-select-box {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

#compare-select-box .vs__dropdown-toggle .vs__selected-options .vs__search::placeholder {
  text-align: right;
}

#compare-year {
  width: 350px;
  padding: 0 3rem 1.5rem 0;
}

.table-area {
  margin-top: 1.5rem;
}

</style>
