<template>
  <main id="ins">
    <section id="page-title" class="container-fluid">
      <div class="back"><router-link to="/"><img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back </router-link></div>
      <div><h1 class="title">INS Lessons</h1></div>
    </section>
    <section id="select-area" class="container-fluid">
      <row :gutter="12">
        <column :lg="1.5"><h3>Select Country</h3></column>
        <column :lg="2.5"><v-select :options="countries" v-model="selectedCountry" class="select-country" placeholder="Show all" ></v-select></column>
        <column :lg="1.5"><h3>Select Camp</h3></column>
        <column :lg="2.5"><v-select :options="camps" v-model="selectedCamp" class="select-camp" placeholder="Select country to activate"></v-select></column>
        <column :lg="1.5"><h3>Select School</h3></column>
        <column :lg="2.5"><v-select :options="schools" v-model="selectedSchool" class="select-school" placeholder="Select camp to activate"></v-select></column>
      </row>
    </section>
    <section :gutter="12" class="chart-title-area">
      <row class="chart-title">
        <column :lg="8" :xs="6"><h2>Number of lessons using INS {{country}} {{camp}} {{school}}</h2></column>
        <column class="chart-summary" :lg="4" :xs="6">
          <div class="total-lessons"> <span><h1>{{ totalLessons }}</h1> <h2>lessons</h2></span><h3>using INS</h3></div>
          <div class="growth-rate"> <h1>{{growthRate}}</h1> <h3>last 12months</h3></div>
        </column>
      </row>
    </section>
    <section class="chart-area">
      <row :gutter="12" class="chart-main">
        <column :lg="7.5" class="line-chart-area">
          <h3> No of lessons in {{selectedYear}}</h3>
          <line-chart :chart-data="chartData" :options="options" v-if="linechartShow === true"></line-chart>
          <stacked-bar-chart id="stacked-bar-chart" :chart-data="stackedBarChartData" :options="stackedBarchartOption" v-if="stackedChartShow === true"></stacked-bar-chart>
          <column :lg="4" :xs="12" class="year-select-box" ><v-select :options="yearOptions" v-model="selectedYear" class="select-year" placeholder="Show all" ></v-select></column>
        </column>
        <column :lg="4" class="summary-area">
          <div class="country-wrapper" v-for="country in summaryBoxData" v-bind:key="country.vForId" :value="country.vForId">
            <div class="text-container">
              <input type="checkbox" v-bind:class="country.cssId" v-bind:id="country.cssId" v-bind:key="country.vForId" :value="country.vForId" v-model="checkedItems" style="display:none">
                <label v-bind:class="country.cssId" v-bind:for="country.cssId">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="justify-content:center; align-item:center;">
                    <span v-bind:class="country.cssId" v-bind:for="country.cssId" style="color:#ffffff; margin:2px 2px 2px 5px; width:10px; height:10px;">V</span>
                  </div>
                </label>
                <!-- Lessons summary start-->
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId" v-if="linechartShow === true">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important;">
                      <h1 style="display: inline; margin-right: 5px; color:'#D8D8D8';" v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ country.totalLessons }}
                      </h1>
                      <h2 style="display: inline; color:'#D8D8D8';" v-bind:class="country.cssId" v-bind:for="country.cssId">lessons </h2>
                  </div>
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8';">
                    <h2 style="font-size:1rem; text-align:left">in {{country.vForId}}</h2>
                  </div>
                </div>
                <!-- Lessons summary end-->
                <!-- Topic summary -->
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId" v-if="stackedChartShow === true">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important;">
                      <h2 style="display: inline; margin-right: 5px; color:'#D8D8D8';" v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ country.vForId }}
                      </h2>
                  </div>
                </div>
                <!-- Topic summary end -->
            </div>
            <div class="chart-container" v-if="linechartShow === true">
              <bar-chart id="bar-chart" class="barChart" :chart-data="barChartData[country.name]" :options="barchartOption"></bar-chart>
            </div>
          </div>
        </column>
      </row>

      <Table :tableData="tableData" v-if="linechartShow === true"></Table>
      <table-for-topic :TopicTableData="TopicTableData" v-if="stackedChartShow === true"></table-for-topic>
    </section>
  </main>
</template>

<script>
import LineChart from '../components/LineChart.js'
import BarChart from '../components/BarChart.js'
import Table from '../components/Table'
import TableForTopic from '../components/TableforTopic'
import StackedBarChart from '../components/StackedBarChart.js'
import { setYearSelectBox, getCountries, getCamps, getSchools, getLessons, getLessonsByTopics } from '../data/data-provider.js'
import { getCountryColorSchme, getCampColorSchme, getSchoolColorSchme, getTopicColorSchme } from '../data/colour-scheme.js'

export default {
  components: {
    LineChart,
    BarChart,
    Table,
    TableForTopic,
    StackedBarChart
  },
  data () {
    return {
      viewMode: 'All',
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,
      selectedYear: 2019,
      chartData: {},
      linechartShow: true,
      stackedChartShow: false,
      barChartData: [],
      stackedBarChartData: {},
      tableData: [],
      summaryBoxData: [],
      TopicTableData: [],
      yearOptions: [],
      countries: [],
      camps: [],
      schools: [],
      country: '',
      camp: '',
      school: '',
      checkedItems: [],
      totalLessons: '',
      growthRate: '',
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
      stackedBarchartOption: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              color: '#ffffff'
            }
          }],
          yAxes: [{
            stacked: true,
            suggestedMin: true,
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
      }
    }
  },
  mounted () {
    this.countries = getCountries() // Set initial Country select box options
    this.yearOptions = setYearSelectBox() // Set initial Year select box options
    this.updateData()
    // this.changeIconColor()
  },
  methods: {
    // changeIconColor () {
    //   const dashboard = document.getElementById('dashboard')
    //   const home = document.getElementById('home-icon')
    //   home.style.border = '0px'
    //   dashboard.style.borderRight = '3px solid #8954BA'
    // },
    uncheckAllCheckboxes () {
      for (let i = 0; i < this.checkedItems.length; i++) {
        const checkedItem = this.checkedItems[i]
        const cssId = checkedItem.toLowerCase().replaceAll(' ', '-')
        const dom = document.getElementsByClassName(`${cssId}`)
        dom[0].checked = false
      }
      this.checkedItems = []
    },
    getLineChartData (lessons, colorScheme) {
      const totalLessons = lessons.lessons.flatMap(el => Object.values(el))
      const sum = this.calcSum(totalLessons)

      const labels = lessons.labels
      const dataset = lessons.lessons
      const lineChartData = []
      let chartDataObj = {}

      if (sum === 0) {
        chartDataObj = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          datasets: [{
            label: 'No lessons data for this year',
            backgroundColor: 'transparent',
            borderColor: '#D8D8D8',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            pointRadius: 6,
            borderWidth: 1.5,
            pointBackgroundColor: '#FFFFFF',
            lineTension: 0
          }]
        }
      } else {
        for (let i = 0; i < dataset.length; i++) {
          const color = colorScheme(i)
          const lineChartDataSet = {
            label: labels[i],
            backgroundColor: 'transparent',
            borderColor: color,
            data: Object.values(dataset[i]),
            pointRadius: 6,
            borderWidth: 1.5,
            pointBackgroundColor: '#FFFFFF',
            lineTension: 0
          }
          lineChartData.push(lineChartDataSet)
        }
        chartDataObj = {
          labels: Object.keys(dataset[0]),
          datasets: lineChartData
        }
      }
      return chartDataObj
    },
    getTableData (tabletype, lessons, prevYear) {
      const countries = lessons.labels
      const tableDataArray = []

      for (let countryIndex = 0; countryIndex < countries.length; countryIndex++) {
        const lessonsData = lessons.lessons[countryIndex]
        const prevYearLessonsData = prevYear.lessons[countryIndex]
        const total = this.calcSum(Object.values(lessonsData))
        let growthRate = ''

        if (prevYearLessonsData) {
          growthRate = this.compareDataByYear(Object.values(prevYearLessonsData), Object.values(lessonsData))
        } else {
          growthRate = '+100%'
        }

        const tableDataSet = {
          type: tabletype,
          name: countries[countryIndex],
          totalLessons: total,
          cssId: countries[countryIndex].toLowerCase().replaceAll(' ', '-'),
          vForId: countries[countryIndex],
          propId: countries[countryIndex].replace(/\s+/g, ''),
          monthlyData: {
            lessons: Object.values(lessonsData),
            months: Object.keys(lessonsData)
          },
          colorIndex: countryIndex
        }

        tableDataSet.monthlyData.lessons.push(total)
        tableDataSet.monthlyData.lessons.push(growthRate)
        tableDataSet.monthlyData.months.push('Total Lessons')
        tableDataSet.monthlyData.months.push('Difference in 12 Months')
        tableDataArray.push(tableDataSet)
      }
      return tableDataArray
    },
    filterChartData (chartData, filter) {
      if (filter.length !== 0) {
        const filtered = chartData.datasets.filter(el => filter.indexOf(el.label) !== -1)
        chartData.datasets = filtered
      }
      return chartData
    },
    calcSum (lessons) {
      const sum = lessons.reduce(
        (prev, curr) => prev + curr
      )
      return sum
    },
    compareDataByYear (prevYearLessons, currYearLessons) {
      const prevSum = this.calcSum(prevYearLessons)
      const currSum = this.calcSum(currYearLessons)
      const growthRate = ((currSum / prevSum) - 1) * 100
      if (Number.isNaN(growthRate)) {
        return '-'
      } else if (growthRate !== Infinity) {
        return growthRate.toFixed(0) + '%'
      } else {
        return '+ 100%'
      }
    },
    getBarChartData (dataByCountry) {
      const allDataDict = {}
      dataByCountry.forEach(el => {
        let key = el.name
        let value = el.monthlyData.lessons.slice(0, 12)
        allDataDict[key] = {
          labels: el.monthlyData.months.slice(0, 12),
          datasets: [{
            data: value
          }]
        }
      })
      return allDataDict
    },
    getStackedBarChartData (lessons, colorScheme) {
      const totalLessons = lessons.lessons.flatMap(el => Object.values(el))
      const sum = this.calcSum(totalLessons)
      const barChartData = []
      for (let i = 0; i < lessons.labels.length; i++) {
        const barChartDataSet = {
          label: lessons.labels[i],
          backgroundColor: colorScheme(i),
          data: Object.values(lessons.lessons[i])
        }
        barChartData.push(barChartDataSet)
      }

      let chartDataObj = {}
      if (sum === 0) {
        chartDataObj = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          datasets: [{
            label: 'No lessons data for this year',
            backgroundColor: 'transparent',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          }]
        }
      } else if (lessons.lessons.length > 0) {
        chartDataObj = {
          labels: Object.keys(lessons.lessons[0]),
          datasets: barChartData
        }
      }
      return chartDataObj
    },
    updateData () {
      this.updateConditionalRendering()
      let lessons = {}
      let prevYearLessons = {}
      let totalCurrLessons = []
      let totalPrevLessons = []

      switch (this.viewMode) {
        case 'All':
          const tableLessons = getLessons(getCountries(), [], [], this.selectedYear)
          const prevTableLessons = getLessons(getCountries(), [], [], this.selectedYear - 1)
          if (this.checkedItems.length === 0) {
            lessons = getLessons([], [], [], this.selectedYear)
            prevYearLessons = getLessons([], [], [], this.selectedYear - 1)
            this.totalLessons = this.calcSum(Object.values(lessons.lessons[0]))
            this.growthRate = this.compareDataByYear(Object.values(prevYearLessons.lessons[0]), Object.values(lessons.lessons[0]))
            this.chartData = this.getLineChartData(lessons, getCountryColorSchme)
          } else {
            lessons = tableLessons
            this.chartData = this.filterChartData(this.getLineChartData(lessons, getCountryColorSchme), this.checkedItems)
          }
          this.barChartData = this.getBarChartData(this.getTableData('Country', tableLessons, prevTableLessons))
          this.tableData = this.getTableData('Country', tableLessons, prevTableLessons)
          this.summaryBoxData = this.filterTopics(this.getTableData('Country', tableLessons, prevTableLessons))
          this.updateColors(this.viewMode, getCountryColorSchme)
          break

        case 'Country':
          lessons = getLessons([this.selectedCountry], getCamps(this.selectedCountry), [], this.selectedYear)
          prevYearLessons = getLessons([this.selectedCountry], getCamps(this.selectedCountry), [], this.selectedYear - 1)
          totalCurrLessons = lessons.lessons.flatMap(el => Object.values(el))
          totalPrevLessons = prevYearLessons.lessons.flatMap(el => Object.values(el))
          this.totalLessons = this.calcSum(totalCurrLessons)
          this.growthRate = this.compareDataByYear(totalPrevLessons, totalCurrLessons)
          this.chartData = this.filterChartData(this.getLineChartData(lessons, getCampColorSchme), this.checkedItems)
          this.barChartData = this.getBarChartData(this.getTableData('Camps', lessons, prevYearLessons))
          this.tableData = this.getTableData('Camps', lessons, prevYearLessons)
          this.summaryBoxData = this.filterTopics(this.getTableData('Camps', lessons, prevYearLessons))
          this.updateColors(this.viewMode, getCampColorSchme)
          break

        case 'Camp':
          lessons = getLessons([this.selectedCountry], [this.selectedCamp], getSchools(this.selectedCountry, this.selectedCamp), this.selectedYear)
          prevYearLessons = getLessons([this.selectedCountry], [this.selectedCamp], getSchools(this.selectedCountry, this.selectedCamp), this.selectedYear - 1)
          totalCurrLessons = lessons.lessons.flatMap(el => Object.values(el))
          totalPrevLessons = prevYearLessons.lessons.flatMap(el => Object.values(el))
          this.totalLessons = this.calcSum(totalCurrLessons)
          this.growthRate = this.compareDataByYear(totalPrevLessons, totalCurrLessons)
          this.chartData = this.filterChartData(this.getLineChartData(lessons, getSchoolColorSchme), this.checkedItems)
          this.barChartData = this.getBarChartData(this.getTableData('Schools', lessons, prevYearLessons))
          this.tableData = this.getTableData('Schools', lessons, prevYearLessons)
          this.summaryBoxData = this.filterTopics(this.getTableData('Schools', lessons, prevYearLessons))
          this.updateColors(this.viewMode, getSchoolColorSchme)
          break

        case 'School':
          lessons = getLessonsByTopics([this.selectedCountry], [this.selectedCamp], [this.selectedSchool], this.selectedYear)
          prevYearLessons = getLessonsByTopics([this.selectedCountry], [this.selectedCamp], [this.selectedSchool], this.selectedYear - 1)
          totalCurrLessons = lessons.lessons.flatMap(el => Object.values(el))
          totalPrevLessons = prevYearLessons.lessons.flatMap(el => Object.values(el))
          this.totalLessons = this.calcSum(totalCurrLessons)
          this.growthRate = this.compareDataByYear(totalPrevLessons, totalCurrLessons)
          this.stackedBarChartData = this.filterChartData(this.getStackedBarChartData(lessons, getTopicColorSchme), this.checkedItems)
          this.TopicTableData = this.getTableData('Topics', lessons, prevYearLessons)
          this.summaryBoxData = this.filterTopics(this.getTableData('Topics', lessons, prevYearLessons)) // for checkbox rendering
          this.updateColors(this.viewMode, getTopicColorSchme)
      }
    },
    updateConditionalRendering () {
      switch (this.viewMode) {
        case 'All':
          this.linechartShow = true
          this.stackedChartShow = false
          this.selectedCountry = null
          this.selectedCamp = null
          this.selectedSchool = null
          this.country = ''
          this.camp = ''
          this.school = ''
          break
        case 'Country':
          this.linechartShow = true
          this.stackedChartShow = false
          this.selectedCamp = null
          this.selectedSchool = null
          this.camps = getCamps(this.selectedCountry)
          this.country = '- ' + this.selectedCountry
          this.camp = ''
          this.school = ''
          break
        case 'Camp':
          this.linechartShow = true
          this.stackedChartShow = false
          this.selectedSchool = null
          this.schools = getSchools(this.selectedCountry, this.selectedCamp)
          this.camp = ', ' + this.selectedCamp
          this.school = ''
          break
        case 'School':
          this.linechartShow = false
          this.stackedChartShow = true
          this.school = ', ' + this.selectedSchool
          break
      }
    },
    filterTopics (tableData) {
      const filtered = tableData.filter(el => el.totalLessons !== 0)
      return filtered
    },
    updateColors (view, colorScheme) {
      const tableFontDomIndex = view === 'School' ? 7 : 9
      for (let i = 0; i < this.summaryBoxData.length; i++) {
        const cssId = this.summaryBoxData[i].cssId
        const dom = document.getElementsByClassName(`${cssId}`)
        if (dom.length !== 0 && dom[0].checked === true) {
          const checkedColor = colorScheme(this.summaryBoxData[i].colorIndex)
          dom[1].style.color = checkedColor // label
          dom[2].style.border = `1px solid ${checkedColor}` // connected div to checkbox
          dom[3].style.color = checkedColor // V
          dom[4].style.color = checkedColor // Topic text
          dom[tableFontDomIndex].style.color = checkedColor // Table name
        } else if (dom.length !== 0 && !dom[0].checked) {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = '1px solid #D8D8D8'
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[tableFontDomIndex].style.color = '#212529'
        }
      }
    }
  },
  watch: {
    checkedItems () {
      this.updateData()
    },
    selectedYear () {
      this.uncheckAllCheckboxes()
      this.updateData()
    },
    selectedCountry () {
      if (this.selectedCountry === null) {
        console.log(this.selectedCountry)
        this.viewMode = 'All'
        this.uncheckAllCheckboxes()
        this.updateData()
      } else {
        this.viewMode = 'Country'
        this.uncheckAllCheckboxes()
        this.updateData()
      }
    },
    selectedCamp () {
      if (this.selectedCamp === null) {
        this.viewMode = 'Country'
        this.uncheckAllCheckboxes()
        this.updateData()
      } else {
        this.viewMode = 'Camp'
        this.uncheckAllCheckboxes()
        this.updateData()
      }
    },
    selectedSchool () {
      if (this.selectedSchool === null) {
        this.viewMode = 'Camp'
        this.uncheckAllCheckboxes()
        this.updateData()
      } else {
        this.viewMode = 'School'
        this.uncheckAllCheckboxes()
        this.updateData()
      }
    }
  }
}
</script>

<style>
main#ins {
  display: flex;
  flex-direction: column;
  padding: 10rem 8rem 5rem 12rem;
}

.navbar {
  background: white;
}
.back {
  align-self: start;
  padding: 1.5rem 0 1.5rem 0;
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
  padding-bottom: 3rem;
  align-items: center;
}

.back a {
  color: var(--color-dark-grey);
  font-size: 1.2rem;
}

.title {
  padding-bottom: 2rem;
}

.container[data-v-42e9a5e0] {
  width: 100% !important;
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

.growth-rate {
  margin-left: 2rem;
}

.growth-rate h3 {
  font-size: 1rem;
  font-weight: 100;
}

.total-lessons {
  display: flex;
  flex-direction: column;
  padding-left: 7rem;
  padding-right: 2rem;
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
  padding: 0 !important;
}

.chart-title h2 {
  text-align:left;
  margin: 0;
  color: var(--color-purple)
}

.line-chart-area {
  padding: 3rem 0 0 3rem !important;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-light-grey)
}

canvas#line-chart.chartjs-render-monitor {
  padding-right: 3rem;
}

.line-chart-area h3 {
  font-family: Helvetica;
  font-size: 12px;
  letter-spacing: -0.01px;
  text-align: left;
}

.summary-area {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: none;
  align-items: center;
  padding: 1rem;
}

.text-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.summary-text{
  color: #D8D8D8;
}

.chart-container {
  display: flex;
  padding-left: 1.5rem;
}

.year-select-box {
  align-self: flex-end;
  margin-top: 1rem;
}

.summary-area #bar-chart #bar-chart {
  width: 100px !important;
  height: 50px !important;
}

#stacked-bar-chart canvas#bar-chart.chartjs-render-monitor {
  width: 100% !important;
  height: 400px !important;
  padding-right: 3rem;
}

.country-wrapper {
  display: flex;
  align-items: center;
  height: 80px;
  padding: 1rem 2.5rem 1rem 2.5rem;
}

label {
  display: flex;
  flex-direction: row;
  text-align: left;
  color: var(--color-light-grey);
}

label div {
  display:flex;
  width:18px;
  height:18px;
  background:white;
  /* border:1px solid var(--color-light-grey); */
  cursor:pointer;
  border-radius: 3px;
  /* margin-right: 10px; */
}

.table-responsive {
  display: flex;
  color: var(--color-dark-grey);
  overflow: hidden;
  width: 100%;
}

table#table-content tr {
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
  width: 100%;
}

#table-content thead th {
  border-bottom: none;
}

#table-content.thead{
  width: 100%;
}

#table-content .thead {
  width: 100%;
}

</style>
