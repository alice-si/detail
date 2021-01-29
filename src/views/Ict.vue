<template>
  <main id="ict-skills">
    <section id="page-title" class="container-fluid">
      <div class="back"><router-link to="/"><img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back </router-link></div>
      <row :gutter="12" class="page-title-container">
        <column :lg="7" :xs="6"><h1 class="title" v-bind:style="colorCode">ICT Skills - {{viewMode}}</h1></column>
        <column :lg="5" :xs="6" class="toggle-area">
        <h3>Students</h3>
          <div class="wrap">
            <input type="checkbox" id="view-toggle" v-on:click="viewToggle"/>
            <label v-bind:style="colorCode" class="slider" for="view-toggle"></label>
          </div>
        <h3>Teachers</h3>
        </column>
      </row>
    </section>
    <section class="ict-select-area">
      <row :gutter="12" style="width: 1255px;">
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
        <column :lg="9" :xs="6"><h2 class="ict-sub-title" v-bind:style="colorCode">Avg No of ICT skills in Tanzania, Nyarugusu, across schools</h2></column>
        <column :lg="3" :xs="6">
          <div class="total-skills"><span><h1 v-bind:style="colorCode">{{growthRate}}</h1><h2 v-bind:style="colorCode">skills/students</h2></span></br><h3 v-bind:style="colorCode">after INS (Oct 2020)</h3></div>
          <!-- <div> {{'+38%'}} last 12months</div> -->
        </column>
      </row>
    </section>
    <section class="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="8.56" class="ictskills-bar-chart-area">
          <h3> Avg No of ICT skills/student</h3>
          <group-bar-chart :chart-data="groupBarChartData" :options="options"></group-bar-chart>
          <column :lg="8.56" :xs="12" class="year-select-box">
            <v-select :options="compareyears" placeholder="Before INS (Oct 2017) vs After INS (Oct 2020)" :searchable="false" :disabled="true"></v-select>
          </column>
        </column>
        <column :lg="3.44" class="summary-area" style="padding-left:3rem;">
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
      <table-for-ICT class="table-area" v-bind:tableData="tableData" v-if="selectedSchool === null"></table-for-ICT>
      <table-for-ICT-skills v-if="selectedSchool !== null"></table-for-ICT-skills>
    </section>
  </main>
</template>

<script>
import GroupBarChart from '../components/GroupBarChart'
import TableForICT from '../components/TableForICT'
import TableForICTSkills from '../components/TableForICTSkills'
import { getIctSchoolList, getStudentIctSchoolAvg, getStudentAvgAcrossSchools, getTeacherIctSchoolAvg, getTeacherAvgAcrossSchools } from '../data/data-provider'
import { getTeacherIctRate, getStudentIctRate, calcDifference, getIctTableData, getGroupBarChartData } from '../data/data-handler'
import { getGroupBarChartColorSheme } from '../data/colour-scheme'
export default {
  components: {
    GroupBarChart,
    TableForICT,
    TableForICTSkills
  },
  data () {
    return {
      viewMode: 'Students',
      // schoolView: true,
      colorCode: '',
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
    this.schools = getIctSchoolList()
    this.switchViewMode()
  },
  methods: {
    switchViewMode () {
      switch (this.viewMode) {
        case 'Students':
          this.colorCode = 'color: #8954BA'
          this.growthRate = calcDifference([getStudentAvgAcrossSchools('Total', 'Base')], [getStudentAvgAcrossSchools('Total', 'End')])[0]
          // If statement 안에 넣을 영역 if(this.selectedSchool.length === 0)
          this.groupBarChartData = this.filterChartData(getGroupBarChartData(getStudentIctSchoolAvg))
          this.tableData = getIctTableData(getStudentIctRate, getStudentAvgAcrossSchools)
          this.summaryBoxData = this.setSummaryBoxData()
          this.updateColor(getGroupBarChartColorSheme, this.colorIndex)
          // If statement 끝
          break

        case 'Teachers':
          this.colorCode = 'color: #0091FF'
          this.growthRate = calcDifference([getTeacherAvgAcrossSchools('Total', 'Base')], [getTeacherAvgAcrossSchools('Total', 'End')])[0]
          // If statement 안에 넣을 영역
          this.groupBarChartData = this.filterChartData(getGroupBarChartData(getTeacherIctSchoolAvg))
          this.tableData = getIctTableData(getTeacherIctRate, getTeacherAvgAcrossSchools)
          this.summaryBoxData = this.setSummaryBoxData()
          this.updateColor(getGroupBarChartColorSheme, this.colorIndex)
          break
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
      this.uncheckCheckboxes()
      if (this.viewMode === 'Students') {
        this.viewMode = 'Teachers'
      } else {
        this.viewMode = 'Students'
      }
    },
    uncheckCheckboxes () {
      for (let i = 0; i < this.checkedItems.length; i++) {
        const dom = document.getElementsByClassName(this.checkedItems[i])
        dom[0].checked = false
      }
      this.checkedItems = []
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
    },
    selectedSchool () {
      console.log(this.selectedSchool)
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
  margin: 0 0 0.5rem 0;
  padding: 0;
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
  background: #0091FF;
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
  color: #d8d8d8;
  padding-left: 2.5rem;
}

.summary-grid h1 {
  font-size: 2.5rem;
  font-family: Helvetica;
  font-weight: 500;
}

.summary-grid h3 {
  font-size: 1rem;
  font-family:'Source Sans Pro'; 
  font-weight:300;
}

#checkbox-text-area {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.ict-sub-title {
  font-size: 2.88rem;
  font-family: 'Source Sans Pro';
  font-weight: 300 !important;
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
  font-weight: 500;
}

.total-skills h2 {
  font-size: 2.2rem;
  font-family: 'Source Sans Pro';
  font-weight: 300;
}

.total-skills h3 {
  font-size: 1.4rem;
  font-family: 'Source Sans Pro';
  font-weight: 100;
}

/* select box area start */
/* .container {
  width: 131.5rem !important;
} */
.ict-select-area {
  max-width: 125.5rem !important;
  margin: 0;
  padding: 0;
}

.ict-select-area .container {
  max-width: 125.5rem !important;
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
/* select box end*/

/* selectbox design customizing start */
#ict-skills .ict-select-area .vs__dropdown-toggle {
  width: 24.2rem;
  height: 3.9rem;
  background-color: #ffffff;
  border: none;
  font-size: 1.68rem;
  color: #686868;
  padding-left: 1rem;
}

#ict-skills .ict-select-area .vs__dropdown-menu {
  background-color: #ffffff;
  box-shadow: none;
  border: none;
  border-radius: 2px;
  font-size: 1.68rem;
  width: 24.2rem !important;
  color: #686868;
}

#ict-skills .year-select-box {
  width: 100%;
  margin: 1.5rem 4rem 1.5rem 1.5rem;
  display: flex;
  justify-content: flex-end;
}

#ict-skills .year-select-box .vs__dropdown-toggle {
  width: 25rem;
  text-align: right;
  background-color: #ffffff;
  border: none;
}

#ict-skills .year-select-box .vs--disabled .vs__search,
#ict-skills .year-select-box .vs--disabled .vs__dropdown-toggle {
  background-color: #ffffff;
}

#ict-skills .vs__search {
  margin: 0;
  padding: 0;
}

#ict-skills .vs__selected {
  margin: 0;
  padding: 0;
}
/* selectbox design customizing end */

.ict-chart-title-area {
  display: flex;
  color: var(--color-purple);
  margin-top: 5rem;
}

.chartjs-size-monitor{
  margin: 0;
}

.chart-summary {
  display: flex;
  flex-direction: row;
}

.chart-area {
  margin-top: 6rem;
  padding: 0 2rem 3.5rem 2rem;
  max-width: 125.3rem;
  display: flex;
  flex-direction: column;
  height: 45%;
  background-color: #ffffff;
}

.chart-main {
  display: flex;
  max-width: 125.3rem !important;
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
  font-family: Source Sans Pro;
  font-size: 1.2rem;
  letter-spacing: -0.01px;
  text-align: left;
  margin: 2.5rem 0 1.5rem 2.5rem;
}

.ictskills-bar-chart-area #bar-chart {
  padding: 0 1.8rem 0 2rem;
  margin: 0 0 0 0 !important;
  max-width: 84rem !important;
  max-height: 43.8rem !important;
}

.summary-area {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border: none;
  align-items: center;
}

.table-area {
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #686868;
}

.summary-area::-webkit-scrollbar {
  width: 4px;
  height: 355px;
  background-color: rgba(216, 216, 216, 0.4);
}

.summary-area::-webkit-scrollbar-thumb {
  width: 4px;
  height: 60px;
  background-color: #d8d8d8;
}

#ict-skills .table-responsive {
  padding: 2.8rem 0 1rem 0;
  overflow-y: scroll;
}

#ict-skills .table-responsive::-webkit-scrollbar {
  width: 100%;
  height: 4px;
  background-color: rgba(216, 216, 216, 0.4);
}

#ict-skills .table-responsive::-webkit-scrollbar-thumb {
  width: 4px;
  background-color: #d8d8d8;
}

</style>
