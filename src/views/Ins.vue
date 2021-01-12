<template>
  <main id="ins">
    <section id="page-title" class="container-fluid">
      <div class="back"><router-link to="/"><img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back </router-link></div>
      <div><h1 class="title">INS Lessons</h1></div>
    </section>
    <section id="select-area" class="container-fluid">
      <!-- TODO: When country selected => show comparing line chart and summary across camps, update table -->
      <!-- TODO: When camp selected => show comparing line chart and summary across the schools update table-->
      <!-- TODO: when school selected => show stacked bar chart for subjects-->
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
        <column :lg="8" :xs="6"><h2>Number of lessons using INS {{country}} {{school}}</h2></column>
        <column :lg="4" :xs="6">
          <div class="total-lessons"> <span><h1>{{ totalLessons }}</h1> <h2>lessons</h2></span><h3>using INS</h3></div>
          <!-- <div> {{'+38%'}} last 12months</div> -->
        </column>
      </row>
    </section>
    <section class="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="7.5" class="line-chart-area">
          <h3> No of lessons</h3>
          <line-chart :chart-data="chartData" :options="options"></line-chart>
        </column>
        <column :lg="4" class="summary-area">
          <div class="country-wrapper" v-for="country in dictForVfor" v-bind:key="country.vForId" :value="country.vForId">
            <div class="text-container">
              <input type="checkbox" v-bind:class="country.cssId" v-bind:id="country.cssId" v-bind:key="country.vForId" :value="country.vForId" v-model="checkedCountries" style="display:none">
                <label v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="justify-content:center; align-item:center;">
                    <span v-bind:class="country.cssId" v-bind:for="country.cssId" style="color:#ffffff; margin:2px 2px 2px 5px; width:10px; height:10px;">V</span>
                  </div>
                </label>
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important;">
                      <h1 style="display: inline; margin-right: 5px;" v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ country.totalLessons }}
                      </h1>
                      <h2 style="display: inline;" v-bind:class="country.cssId" v-bind:for="country.cssId">lessons </h2>
                  </div>
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8';">
                    <h2 style="font-size:1rem; text-align:left">in {{country.vForId}}</h2>
                  </div>
                </div>
            </div>
            <div class="chart-container">
              <bar-chart :chart-data="barChartData[country.name]" :options="barchartOption"></bar-chart>
            </div>
          </div>

          <!-- **Previous code -->
          <!-- <div class="country-wrapper" v-for="country in dictForVfor" v-bind:key="country.vForId" :value="country.vForId">
            <div class="text-container">
              <input type="checkbox" v-bind:class="country.cssId" v-bind:id="country.cssId" v-bind:key="country.vForId" :value="country.vForId" v-model="checkedCountries">
                <label v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="justify-content:center; align-item:center;">
                    <span v-bind:class="country.cssId" v-bind:for="country.cssId" style="color:#ffffff; margin:2px 2px 2px 5px; width:10px; height:10px;">V</span>
                  </div>
                </label>
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important;">
                      <h1 style="display: inline; margin-right: 5px;" v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ lessonsByCountries[country.propId] }}
                      </h1>
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
          </div> -->
        </column>
      </row>
      <Table :tableData="tableData"></Table>
    </section>
  </main>
</template>

<script>
import LineChart from '../components/LineChart.js'
import BarChart from '../components/BarChart.js'
import { getCountries, getCamps, getSchools, getLessons } from '../data/data-provider.js'
import Table from '../components/Table'

export default {
  components: {
    LineChart,
    BarChart,
    Table
  },
  data () {
    return {
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,
      chartData: {},
      barChartData: [],
      countries: [],
      dictForVfor: [],
      camps: [],
      schools: [],
      country: '',
      school: '',
      checkedCountries: [],
      totalLessons: '',
      lessonsByCountries: {},
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            gridLines: {
              color: '#ffffff'
            }
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          labels: {
            boxWidth: 10
          }
        }
      },
      barchartOption: {
        animation: {
          duration: 0
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }]
        },
        legend: {
          display: false
        }
      },
      tableData: []
    }
  },
  mounted () {
    this.countries = getCountries()
    this.updateLineChartData()
    this.updateBarChartData()
    this.setSummary()
    this.setTableData()
  },
  methods: {
    changeCountry (value) {
      this.checkedCountries = []
      this.camps = getCamps(this.selectedCountry)
      this.selectedCamp = null
      this.selectedSchool = null
      this.country = '- ' + this.selectedCountry
    },
    changeCamp (value) {
      this.schools = getSchools(this.selectedCountry, this.selectedCamp)
      this.selectedSchool = null
      this.updateLineChartData()
      this.school = ', ' + this.selectedCamp
    },
    changeSchool (value) {
      this.updateLineChartData()
    },
    updateBarChartData (name, lessons) {
      const allDataDict = {}
      if (name & lessons) {

      }

      const countries = getCountries()

      for (let i = 0; i < countries.length; i++) {
        let key = countries[i]
        let value = getLessons(countries[i])
        allDataDict[key] = {
          labels: value.months,
          datasets: [{
            data: value.lessons
          }]
        }
      }
      this.barChartData = allDataDict
    },
    updateLineChartData (chartData) {
      // Build label
      let label = 'All'
      if (this.selectedCountry) {
        label = this.selectedCountry
      }
      if (this.selectedCamp) {
        label += ' > ' + this.selectedCamp
      }
      if (this.selectedSchool) {
        label += ' > ' + this.selectedSchool
      }

      let data = chartData
      let dataSetsArray = []

      if (!data || data.length === 0) {
      // Fetch data
        data = getLessons(this.selectedCountry, this.selectedCamp, this.selectedSchool)
        const dataSets = {
          label: label,
          backgroundColor: 'transparent',
          borderColor: '#EC7181',
          data: data.lessons,
          pointRadius: 6,
          borderWidth: 1.5,
          pointBackgroundColor: '#FFFFFF',
          lineTension: 0
        }
        dataSetsArray.push(dataSets)
      } else {
        dataSetsArray = chartData
      }

      // Format data for chart-js
      this.chartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: dataSetsArray
      }
    },
    updateMultipleChartData (newVal) {
      function getColorSchmeFromIndex (index) {
        let COLOR_SCHEME = [
          '#EA4C89',
          '#2FB9EF',
          '#67B675',
          '#f76511'
        ]
        return COLOR_SCHEME[index % COLOR_SCHEME.length]
      }

      let multipleData = []

      const countries = this.countries
      for (let i = 0; i < countries.length; i++) {
        const cssId = countries[i].toLowerCase().replace(' ', '-')
        const dom = document.getElementsByClassName(`${cssId}`)

        if (dom[0].checked) {
          const checkedColor = getColorSchmeFromIndex(i)
          dom[1].style.color = checkedColor
          dom[2].style.border = `1px solid ${checkedColor}`
          dom[3].style.color = checkedColor
          dom[4].style.color = checkedColor
          dom[9].style.color = checkedColor

          const chartData = {}
          const lessons = getLessons(countries[i])

          chartData.label = countries[i]
          chartData.backgroundColor = 'transparent'
          chartData.borderColor = checkedColor
          chartData.data = lessons.lessons
          chartData.pointRadius = 6
          chartData.borderWidth = 1.5
          chartData.pointBackgroundColor = '#FFFFFF'
          chartData.lineTension = 0
          multipleData.push(chartData)
        } else {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = '1px solid #D8D8D8'
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[9].style.color = '#686868'
        }
      }
      // console.log('multipleData', multipleData)

      this.updateLineChartData(multipleData)
    },
    setSummary () {
      const total = getLessons(this.selectedCountry, this.selectedCamp, this.selectedSchool)
      const countries = getCountries()

      function calcSum (country) {
        const sum = country.lessons.reduce(
          (prev, curr) => prev + curr)
        return sum
      }

      this.totalLessons = calcSum(total)

      const lessonSumDict = {}
      for (let i = 0; i < countries.length; i++) {
        const countryName = countries[i].replace(/\s+/g, '')
        const sum = calcSum(getLessons(countries[i]))
        lessonSumDict[countryName] = sum
      }
      this.lessonsByCountries = lessonSumDict
    },
    setTableData () {
      const countries = getCountries()
      function calcSum (country) {
        const sum = country.lessons.reduce(
          (prev, curr) => prev + curr)
        return sum
      }
      const tableDataArray = []
      // Table by country
      for (let i = 0; i < countries.length; i++) {
        const obj = {}
        const sum = calcSum(getLessons(countries[i]))
        const cssId = countries[i].toLowerCase().replace(' ', '-')
        const vForId = countries[i]
        const propId = countries[i].replace(/\s+/g, '')
        obj.type = 'Names'
        obj.name = countries[i]
        obj.totalLessons = sum
        obj.cssId = cssId
        obj.vForId = vForId
        obj.propId = propId
        obj.monthlyData = getLessons(countries[i])
        obj.monthlyData.lessons.push(sum)
        obj.monthlyData.lessons.push(0)
        obj.monthlyData.months.push('Total Lessons')
        obj.monthlyData.months.push('Difference in 12 Months')
        tableDataArray.push(obj)
      }
      this.tableData = tableDataArray
      this.dictForVfor = tableDataArray
    },
    updateTableData () {

    }
  },
  watch: {
    checkedCountries (newVal, oldVal) {
      this.updateMultipleChartData(newVal)
    },
    selectedCountry (newVal, oldVal) {
      const country = newVal
      const camps = getCamps(country)

      function getColorSchmeFromIndex (index) {
        let COLOR_SCHEME = [
          '#F69855',
          '#BED23F',
          '#3FC9D2',
          '#D23FC5'
        ]
        return COLOR_SCHEME[index % COLOR_SCHEME.length]
      }

      function calcSum (lessons) {
        const sum = lessons.reduce(
          (prev, curr) => prev + curr)
        return sum
      }

      const lineChartData = []
      const barDataDict = {}
      const tableDataArr = []

      for (let i = 0; i < camps.length; i++) {
        const camp = camps[i]
        const lessons = getLessons(country, camp)
        const lineChartDataSet = {
          label: camp,
          backgroundColor: 'transparent',
          borderColor: getColorSchmeFromIndex(i),
          data: lessons.lessons.slice(0, 12),
          pointRadius: 6,
          borderWidth: 1.5,
          pointBackgroundColor: '#FFFFFF',
          lineTension: 0
        }
        lineChartData.push(lineChartDataSet)

        barDataDict[camp] = {
          labels: lessons.months.slice(0, 12),
          datasets: [{
            data: lessons.lessons.slice(0, 12)
          }]
        }

        const tableDataSet = {
          type: 'Camps',
          name: camp,
          totalLessons: calcSum(lessons.lessons),
          cssId: camp.toLowerCase().replace(' ', '-'),
          vForId: camp,
          propId: camp.replace(/\s+/g, ''),
          monthlyData: {
            lessons: lessons.lessons,
            months: lessons.months
          }
        }
        tableDataSet.monthlyData.lessons.push(calcSum(lessons.lessons))
        tableDataSet.monthlyData.lessons.push(0)
        tableDataSet.monthlyData.months.push('Total Lessons')
        tableDataSet.monthlyData.months.push('Difference in 12 Months')
        tableDataArr.push(tableDataSet)
      }
      this.chartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: lineChartData
      }

      this.barChartData = barDataDict
      this.tableData = tableDataArr
      this.dictForVfor = tableDataArr

      // console.log('barDataDict', barDataDict)
      // console.log('tableDataSet', tableDataArr)

      // // Change line graph
      // function getColorSchmeFromIndex (index) {
      //   let COLOR_SCHEME = [
      //     '#F69855',
      //     '#BED23F',
      //     '#3FC9D2',
      //     '#D23FC5'
      //   ]

      //   return COLOR_SCHEME[index % COLOR_SCHEME.length]
      // }

      // const campLineChartData = []
      // for (let i = 0; i < this.camps.length; i++) {
      //   const camp = this.camps[i]
      //   const lessons = getLessons(this.country.substring(2), camp)
      //   const chartData = {}
      //   const chartColor = getColorSchmeFromIndex(i)
      //   chartData.label = camp
      //   chartData.backgroundColor = 'transparent'
      //   chartData.borderColor = chartColor
      //   chartData.data = lessons.lessons
      //   chartData.pointRadius = 6
      //   chartData.borderWidth = 1.5
      //   chartData.pointBackgroundColor = '#FFFFFF'
      //   chartData.lineTension = 0
      //   campLineChartData.push(chartData)
      // }
      // this.updateLineChartData(campLineChartData)
      // // Change Table
      // function calcSum (lessons) {
      //   const sum = lessons.reduce(
      //     (prev, curr) => prev + curr)
      //   return sum
      // }
      // const tableDataArray = []
      // for (let i = 0; i < this.camps.length; i++) {
      //   const camp = this.camps[i]
      //   const lessons = getLessons(this.country.substring(2), camp)
      //   const obj = {}

      //   const sum = calcSum(lessons.lessons)
      //   const cssId = camp.toLowerCase().replace(' ', '-')
      //   const vForId = camp
      //   const propId = camp.replace(/\s+/g, '')

      //   obj.type = 'Camps'
      //   obj.name = camp
      //   obj.totalLessons = sum
      //   obj.cssId = cssId
      //   obj.vForId = vForId
      //   obj.propId = propId
      //   obj.monthlyData = lessons
      //   obj.monthlyData.lessons.push(sum)
      //   obj.monthlyData.lessons.push(0)
      //   obj.monthlyData.months.push('Total Lessons')
      //   obj.monthlyData.months.push('Difference in 12 Months')
      //   tableDataArray.push(obj)
      // }
      // this.tableData = tableDataArray
      // this.school = 'Total'

      // // FIXME: Calculation for DR congo result NAN
      // if (this.tableData.length === 1) {
      //   this.totalLessons = tableDataArray[0].totalLessons
      // } else if (this.tableData.length > 1) {
      //   this.totalLessons = this.tableData.reduce((a, b) => {
      //     return a.totalLessons + b.totalLessons
      //   })
      // }
      // Change summary
      // this.dictForVfor = tableDataArray
      // console.log('this.dictForVfor', this.dictForVfor)

      // for (let i = 0; i < newVal.length; i++) {
      //   const cssId = newVal[i].toLowerCase().replace(' ', '-')
      //   const dom = document.getElementsByClassName(`${cssId}`)
      //   if (dom[0].checked === true) {
      //     const checkedColor = getColorSchmeFromIndex(i)
      //     dom[1].style.color = checkedColor
      //     dom[2].style.border = `1px solid ${checkedColor}`
      //     dom[3].style.color = checkedColor
      //     dom[4].style.color = checkedColor
      //     dom[9].style.color = checkedColor

      //     const chartData = {}
      //     const lessons = lessonsByCamp

      //     chartData.label = newVal[i]
      //     chartData.backgroundColor = 'transparent'
      //     chartData.borderColor = checkedColor
      //     chartData.data = lessons.lessons
      //     chartData.pointRadius = 6
      //     chartData.borderWidth = 1.5
      //     chartData.pointBackgroundColor = '#FFFFFF'
      //     chartData.lineTension = 0
      //     multipleData.push(chartData)
      //   } else if (dom[0].checked === false) {
      //     dom[1].style.color = '#D8D8D8'
      //     dom[2].style.border = '1px solid #D8D8D8'
      //     dom[3].style.color = '#ffffff'
      //     dom[4].style.color = '#D8D8D8'
      //     dom[9].style.color = '#686868'
      //   }
      // }
    }
    // country (newVal, oldVal) {
    //   const selectedCountry = newVal.substring(2)
    //   this.updateLineChartData(selectedCountry)
    // }
  }
}
</script>

<style>
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
  background-color: #ffffff;
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
  /* color: #666666; */
  letter-spacing: -0.01px;
  text-align: left;
}

.summary-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  border-left: solid 1px var(--color-light-grey);
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

.table-responsive {
  display: flex;
  color: var(--color-dark-grey);
  overflow: hidden;
  width: 100%;
}

#country-name {
  font-weight: 500;
}

.monthly-data {
  font-weight: 200;
}

#table-content {
  margin: 3rem;
  font-size: 1.2rem;
}

.table thead th {
  border-bottom: none;
}

.table thead {
  width: 100%;
}

/* .table {
  width: 100%;
} */
</style>
