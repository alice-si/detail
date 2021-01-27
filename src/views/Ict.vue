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
    <section>
      <row :gutter="12" class="ict-select-area">
        <column :lg="1" class="ict-select-country"><h3>Select Country</h3></column>
        <column :lg="3" class="ict-select-box"><v-select :options="countries" v-model="selectedCountry" class="select-country" placeholder="Tanzania" :searchable="false"></v-select></column>
        <column :lg="1.2"><h3 class="ict-select-camp">Select Camp</h3></column>
        <column :lg="2.8" class="ict-select-box"><v-select :options="camps" v-model="selectedCamp" class="select-camp" placeholder="Nyarugusu" :searchable="false"></v-select></column>
        <column :lg="1.2"><h3 class="ict-select-school">Select School</h3></column>
        <column :lg="2.8" class="ict-select-box"><v-select :options="schools" v-model="selectedSchool" class="select-school" placeholder="Select camp to activate" :searchable="false"></v-select></column>
      </row>
    </section>
    <section :gutter="12" class="ict-chart-title-area">
      <row class="ict-chart-title">
        <column :lg="9" :xs="6"><h2>Avg No of ICT skills/student in Tanzania, Nyarugusu, across schools</h2></column>
        <column :lg="3" :xs="6">
          <div class="total-skills"> <span><h1>{{growthRate}}</h1><h2>skills/students</h2></span></br><h3>after INS (Oct 2020)</h3></div>
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
        <row v-for="i in setNoOfRows" v-bind:key="i">
          <column v-for="j in [0, 1]" v-bind:key="i*2+j" :lg="6" :xs="6">
            <div v-if="i*2+j < summaryBoxData.length" class="summary-grid">
             <input type="checkbox" style="display:none" v-bind:id="summaryBoxData[i*2+j].name" v-bind:class="summaryBoxData[i*2+j].name" v-bind:value="summaryBoxData[i*2+j].name" v-model="checkedItems">
              <label v-bind:class="summaryBoxData[i*2+j].name" v-bind:for="summaryBoxData[i*2+j].name">
                <div v-bind:class="summaryBoxData[i*2+j].name" style="justify-content:center; align-item:center;">
                  <span v-bind:class="summaryBoxData[i*2+j].name" style="color: #ffffff; margin:2px 2px 2px 2.5px; width:10px; height:10px;">V</span>
                </div>
              </label>
              <div v-bind:class="summaryBoxData[i*2+j].name" id="checkbox-text-area">
                <h1>{{summaryBoxData[i*2+j].difference}}</h1>
                <h3>{{summaryBoxData[i*2+j].name}}</h3>
              </div>
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
import { getIctRate, calcDifference } from '../data/data-handler'
import { getGroupBarChartColorSheme } from '../data/colour-scheme'
export default {
  components: {
    GroupBarChart,
    TableForICT
  },
  data () {
    return {
      viewMode: 'Students',
      growthRate: '',
      countries: ['No more available options'],
      camps: ['No more available options'],
      schools: [],
      summaryBoxData: [],
      checkedItems: [],
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,
      compareyears: ['Before INS (Oct 2017) vs After INS (Oct 2020)'],
      groupBarChartData: {},
      tableData: {},
      colorIndex: [],
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
              beginAtZero: true,
              callback: function (value) {
                return value + '%'
              }
            } }]
        }
      }
    }
  },
  mounted () {
    // this.countries = ['Tanzania']
    // this.camps = ['Nyarugusu']
    this.schools = getIctSchoolList()
    this.switchViewMode()
  },
  methods: {
    switchViewMode () {
      console.log(this.viewMode)
      switch (this.viewMode) {
        case 'Students':
          this.groupBarChartData = this.filterChartData(this.getGroupBarChartData())
          this.tableData = this.getTableData()
          this.summaryBoxData = this.setSummaryBoxData()
          this.updateColor(getGroupBarChartColorSheme, this.colorIndex)
          this.growthRate = calcDifference([getAvgAcrossSchools('Total', 'Base')], [getAvgAcrossSchools('Total', 'End')])[0]
      }
    },
    updateColor (colorScheme, colorIndex) {
      let haveSet = 0
      colorIndex.sort((a, b) => a - b)
      for (let i = 0; i < this.summaryBoxData.length; i++) {
        const school = this.summaryBoxData[i].name
        const dom = document.getElementsByClassName(`${school}`)
        if (dom.length !== 0 && dom[0].checked === true) {
          const setColor = colorScheme().normal[colorIndex[haveSet]]
          dom[1].style.color = setColor
          dom[2].style.border = `1px solid ${setColor}`
          dom[3].style.color = setColor
          dom[4].style.color = setColor
          dom[5].style.color = setColor
          haveSet += 1
        } else if (dom.length !== 0) {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = `1px solid ${'#D8D8D8'}`
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[5].style.color = '#212529'
        }
      }
    },
    filterChartData (chartData) {
      if (this.checkedItems.length === 0) {
        return chartData
      } else {
        const checked = this.checkedItems
        const colorIndex = []
        checked.forEach(el => {
          colorIndex.push(chartData.labels.indexOf(el))
        })
        this.colorIndex = colorIndex

        const dataIndex = [...Array(chartData.labels.length).keys()].filter(el => colorIndex.includes(el) === false)
        dataIndex.forEach(el => {
          chartData.datasets[0].data.splice(el, 1, '-')
          chartData.datasets[1].data.splice(el, 1, '-')
          chartData.labels.splice(el, 1, '-')
        })
        return chartData
      }
    },
    setSummaryBoxData () {
      const summaryBoxDataArr = []
      for (let schoolIndex = 0; schoolIndex < this.tableData.columns.length; schoolIndex++) {
        const dictForVFor = {
          name: this.tableData.columns[schoolIndex],
          difference: this.tableData.total.difference[schoolIndex]
        }
        summaryBoxDataArr.push(dictForVFor)
      }
      return summaryBoxDataArr
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
        totalBaseYearData[el] = getIctRate(`${el}`, 'Total', 'Base')
        totalEndYearData[el] = getIctRate(`${el}`, 'Total', 'End')
        maleBaseYearData[el] = getIctRate(`${el}`, 'Male', 'Base')
        maleEndYearData[el] = getIctRate(`${el}`, 'Male', 'End')
        femaleBaseYearData[el] = getIctRate(`${el}`, 'Female', 'Base')
        femaleEndYearData[el] = getIctRate(`${el}`, 'Female', 'End')
      })

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
      tableProp.total.difference = calcDifference(tableProp.total.beforeIns, tableProp.total.afterIns)
      tableProp.male.beforeIns.push(getAvgAcrossSchools('Male', 'Base'))
      tableProp.male.afterIns.push(getAvgAcrossSchools('Male', 'End'))
      tableProp.male.difference = calcDifference(tableProp.male.beforeIns, tableProp.male.afterIns)
      tableProp.female.beforeIns.push(getAvgAcrossSchools('Female', 'Base'))
      tableProp.female.afterIns.push(getAvgAcrossSchools('Female', 'End'))
      tableProp.female.difference = calcDifference(tableProp.female.beforeIns, tableProp.female.afterIns)
      return tableProp
    }
  },
  computed: {
    setNoOfRows () {
      return Array(Math.ceil(this.summaryBoxData.length / 2)).keys()
    }
  },
  watch: {
    viewMode () {
      this.switchViewMode()
    },
    checkedItems () {
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
  margin-bottom: 4.7rem;
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
  width: 14.4em; height: 2em;
  cursor: pointer;
  transition: 550ms;
  border: 1px solid var(--color-light-grey);
  border-radius: 8px;
}

.toggle-area h3 {
  font-family: Helvetica;
  font-size: 1.4rem;
  color: #858585;
}

/* switch */
.slider::after {
  position: absolute; content:'';
  width: 4rem; height: 2rem;
  top: -0.1rem; left: -0.1rem;
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
  width: 4rem; height: 2rem;
	top: -0.1rem; left: 10.4rem;
  background: var(--color-purple);
  box-shadow: 0 0 0 0 #f2f2f2 ictet;
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
  width: 100%;
  color: #d8d8d8
}

.summary-grid h1 {
  font-size: 2.5rem;
}

.summary-grid h3 {
  font-size: 1rem;
}

#checkbox-text-area {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.ict-chart-title h2 {
  font-size: 2.88rem;
  font-weight: 100;
}

.total-skills h1,
.total-skills h2,
.total-skills h3 {
  display: inline;
  color: var(--color-purple);
}

.total-skills h1 {
  font-size: 3rem;
  margin-right: 0.5rem;
}

.total-skills h2 {
  font-size: 2.2rem;
  font-weight: 100;
}

.total-skills h3 {
  font-size: 1.4rem;
  font-weight: 100;
}


/* select area customizing */

/* #select-area {
  display: flex !important;
  flex-direction: row !important;
  align-items: center !important;
} */

/* .container {
  margin: 0;
  max-width: 144rem;
} */



.container {
  /* width: 100%; */
  max-width: 144rem;
}

#select-area h3 {
  color: var(--color-dark-grey)
}

.colVGR {
  padding: 0px !important;
  align-self: center;
  border-radius: 0px;
}


.ict-select-area h3 {
  font-size: 1.4rem;
  color: #858585;
}

.ict-select-country {
  margin: 0;
}

.ict-select-camp {
  text-align:right; 
  padding-left: 3rem;   
  margin: 0 1rem 0 0
}

.ict-select-school {
  text-align:right; 
  padding-left: 2.8rem; 
  margin:0 1rem 0 0;
}

.ict-select-area {
  width: 100%;
}

.ict-select-area h3 {
  color: var(--color-dark-grey);
  text-align: left;
}

.ict-select-box .vs__dropdown-toggle {
  width: 24.2rem;
  height: 3.9rem;
}

/* selectbox design customizing start */
.vs__dr
#select-area .vs__open-indicator {
  color: #686868 !important;
}

.ict-select-area .vs__selected-options .vs__search {
  padding-left: 2rem;
}

.ict-select-area .vs__selected {
  font-size: 1.4rem;
  width: 24.2rem;
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
  background-color: #ffffff;
  border: none;
  margin: 0;
}

.vs__dropdown-toggle:active {
  background-color: #ffffff;
  border-color: #ffffff;
  font-size: 1.4rem;
}

.v-select .vs__dropdown-menu {
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.4rem;
  width: 24.2rem;
}

.vs__selected {
  font-size: 1.4rem !important;
}

.vs--disabled .vs__dropdown-toggle {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important; 
}

.vs--disabled .vs__search {
  background-color: rgba(255, 255, 255, 0.40);
  font-size: 14px;
  color: rgba(104,104,104,0.40) !important;
}





/* select area customizing end */

.ict-chart-title-area {
  display: flex;
  color: var(--color-purple);
  margin-top: 5rem;
}

.chart-summary {
  display: flex;
  flex-direction: row;
}

.chart-area {
  margin-top: 6rem;
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

.ict-chart-title {
  display: flex;
  max-width: 144rem !important;
  margin: 5rem 0 0 0 !important;
}

.ict-chart-title h2 {
  text-align:left;
  margin: 0;
  color: var(--color-purple);
  font-size: 2.88rem;
}

.ictskills-bar-chart-area {
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-light-grey);
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
