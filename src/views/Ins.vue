<template>
  <main id="ins">

    <section id="page-title" class="container-fluid">
      <div class="back"><router-link to="/"><img src="../../src/assets/BackArrow.svg" alt="back-arrow"/> Back </router-link></div>
      <div><h1 class="title">INS Lessons</h1></div>
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
          <line-chart :chart-data="chartData" :options="options" v-if="linechartShow === true"></line-chart>
          <stacked-bar-chart id="stacked-bar-chart" :chart-data="stackedBarChartData" :options="stackedBarchartOption" v-if="stackedChartShow === true"></stacked-bar-chart>
        </column>
        <column :lg="4" class="summary-area">
          <div class="country-wrapper" v-for="country in dictForVfor" v-bind:key="country.vForId" :value="country.vForId">
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
                      <h1 style="display: inline; margin-right: 5px;" v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ country.totalLessons }}
                      </h1>
                      <h2 style="display: inline;" v-bind:class="country.cssId" v-bind:for="country.cssId">lessons </h2>
                  </div>
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8';">
                    <h2 style="font-size:1rem; text-align:left">in {{country.vForId}}</h2>
                  </div>
                </div>
                <!-- Lessons summary end-->
                <!-- Topic summary -->
                <div class="summary-text" v-bind:class="country.cssId" v-bind:for="country.cssId" v-if="stackedChartShow === true">
                  <div v-bind:class="country.cssId" v-bind:for="country.cssId" style="border:none; color:'#D8D8D8' !important;">
                      <h1 style="display: inline; margin-right: 5px; color:'#D8D8D8';" v-bind:class="country.cssId" v-bind:for="country.cssId">
                        {{ country.vForId }}
                      </h1>
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
      <div v-if="noData === true"> No Data </div>
    </section>
  </main>
</template>

<script>
import LineChart from '../components/LineChart.js'
import BarChart from '../components/BarChart.js'
import Table from '../components/Table'
import TableForTopic from '../components/TableforTopic'
import StackedBarChart from '../components/StackedBarChart.js'
import { getCountries, getCamps, getSchools, getLessons, getLessonsByTopics } from '../data/data-provider.js'
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
      selectedCountry: null,
      selectedCamp: null,
      selectedSchool: null,
      chartData: {},
      linechartShow: true,
      stackedChartShow: false,
      noData: false,
      barChartData: [],
      stackedBarChartData: {},
      tableData: [],
      TopicTableData: [],
      countries: [],
      dictForVfor: [],
      camps: [],
      schools: [],
      country: '',
      school: '',
      checkedItems: [],
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
      stackedBarchartOption: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          xAxes: [{
            stacked: true,
            gridLines: {
              color: '#ffffff'
            }
          }],
          yAxes: [{
            stacked: true,
            beginAtZero: true,
            suggestedMin: true
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
    this.countries = getCountries()
    this.updateLineChartData()
    this.updateBarChartData()
    this.setSummary()
    this.setTableData()
    this.unchekcAllCheckbox()
  },
  methods: {
    changeCountry (value) {
      this.linechartShow = true
      this.stackedChartShow = false
      this.selectedCamp = null
      this.selectedSchool = null
      this.camps = getCamps(this.selectedCountry)
      this.country = '- ' + this.selectedCountry
    },
    changeCamp (value) {
      this.linechartShow = true
      this.stackedChartShow = false
      this.selectedSchool = null
      this.updateLineChartData()
      this.schools = getSchools(this.selectedCountry, this.selectedCamp)
      this.school = ', ' + this.selectedCamp
    },
    changeSchool (value) {
      this.linechartShow = false
      this.stackedChartShow = true
      this.updateLineChartData()
    },
    updateBarChartData (name, lessons) {
      const allDataDict = {}
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
      this.linechartShow = true
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
    updateMultipleChartData () {
      this.linechartShow = true
      let multipleData = []

      if (this.selectedCamp !== null) {
        // For schools
        const country = this.selectedCountry
        const camp = this.selectedCamp
        const schoolsArr = getSchools(country, camp)

        for (let i = 0; i < schoolsArr.length; i++) {
          const cssId = schoolsArr[i].toLowerCase().replace(' ', '-')
          const dom = document.getElementsByClassName(`${cssId}`)

          if (dom[0] && dom[0].checked) {
            const checkedColor = getSchoolColorSchme(i)
            dom[1].style.color = checkedColor
            dom[2].style.border = `1px solid ${checkedColor}`
            dom[3].style.color = checkedColor
            dom[4].style.color = checkedColor
            dom[9].style.color = checkedColor

            const chartData = {}
            const lessons = getLessons(country, camp, schoolsArr[i])
            chartData.label = schoolsArr[i]
            chartData.backgroundColor = 'transparent'
            chartData.borderColor = checkedColor
            chartData.data = lessons.lessons
            chartData.pointRadius = 6
            chartData.borderWidth = 1.5
            chartData.pointBackgroundColor = '#FFFFFF'
            chartData.lineTension = 0
            multipleData.push(chartData)
          } else if (dom[0] && !dom[0].checked) {
            dom[1].style.color = '#D8D8D8'
            dom[2].style.border = '1px solid #D8D8D8'
            dom[3].style.color = '#ffffff'
            dom[4].style.color = '#D8D8D8'
            dom[9].style.color = '#686868'
          }
        }
      } else if (this.selectedCountry !== null) {
        // For camps
        const country = this.selectedCountry
        const camp = getCamps(country)
        for (let i = 0; i < camp.length; i++) {
          const cssId = camp[i].toLowerCase().replace(' ', '-')
          const dom = document.getElementsByClassName(`${cssId}`)

          if (dom[0] && dom[0].checked) {
            const checkedColor = getCampColorSchme(i)
            dom[1].style.color = checkedColor
            dom[2].style.border = `1px solid ${checkedColor}`
            dom[3].style.color = checkedColor
            dom[4].style.color = checkedColor
            dom[9].style.color = checkedColor

            const chartData = {}
            const lessons = getLessons(country, camp[i])
            chartData.label = camp[i]
            chartData.backgroundColor = 'transparent'
            chartData.borderColor = checkedColor
            chartData.data = lessons.lessons
            chartData.pointRadius = 6
            chartData.borderWidth = 1.5
            chartData.pointBackgroundColor = '#FFFFFF'
            chartData.lineTension = 0
            multipleData.push(chartData)
          } else if (dom[0] && !dom[0].checked) {
            dom[1].style.color = '#D8D8D8'
            dom[2].style.border = '1px solid #D8D8D8'
            dom[3].style.color = '#ffffff'
            dom[4].style.color = '#D8D8D8'
            dom[9].style.color = '#686868'
          }
        }
      } else {
        // For countries
        const countries = this.countries
        for (let i = 0; i < countries.length; i++) {
          const cssId = countries[i].toLowerCase().replace(' ', '-')
          const dom = document.getElementsByClassName(`${cssId}`)
          if (dom[0] && dom[0].checked) {
            const checkedColor = getCountryColorSchme(i)
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
          } else if (dom[0] && !dom[0].checked) {
            dom[1].style.color = '#D8D8D8'
            dom[2].style.border = '1px solid #D8D8D8'
            dom[3].style.color = '#ffffff'
            dom[4].style.color = '#D8D8D8'
            dom[9].style.color = '#686868'
          }
        }
      }

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
        obj.type = 'Name'
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
    setTopicsData (country, camp, school) {
      this.linechartShow = false
      this.stackedChartShow = true
      function calcSum (lessons) {
        const sum = lessons.reduce(
          (prev, curr) => prev + curr)
        return sum
      }

      const lessonsByTopics = getLessonsByTopics(country, camp, school)
      const stackedBarchartDataArr = []
      const tableDataArr = []

      for (let i = 0; i < lessonsByTopics.topics.length; i++) {
        const topic = lessonsByTopics.topics[i]
        const lessons = JSON.parse(JSON.stringify(lessonsByTopics.lessons[i])).values
        const sum = calcSum(Object.values(lessons))

        if (sum !== 0) {
          const barChartDataSet = {
            label: topic,
            backgroundColor: getSchoolColorSchme(i),
            data: Object.values(lessons)
          }
          stackedBarchartDataArr.push(barChartDataSet)

          const tableDataSet = {
            type: 'Topics',
            name: lessonsByTopics.topics[i],
            totalLessons: sum,
            cssId: lessonsByTopics.topics[i].toLowerCase().replace(' ', '-'),
            vForId: lessonsByTopics.topics[i],
            propId: lessonsByTopics.topics[i].replace(/\s+/g, ''),
            monthlyData: Object.values(lessons)
          }
          tableDataSet.monthlyData.push(calcSum(Object.values(lessons)))
          tableDataSet.monthlyData.push(0) // hard-coded Difference in 12 months

          tableDataArr.push(tableDataSet)
        }
      }

      this.TopicTableData = tableDataArr
      this.stackedBarChartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: stackedBarchartDataArr
      }
      this.dictForVfor = tableDataArr

      // Total no of lessons by country
      let sum = 0
      for (let i = 0; i < tableDataArr.length; i++) {
        sum += tableDataArr[i].totalLessons
      }
      this.totalLessons = sum
    },
    updateStackedBarChartData () {
      this.linechartShow = false
      this.stackedChartShow = true
      const country = this.selectedCountry
      const camp = this.selectedCamp
      const school = this.selectedSchool
      const topics = getLessonsByTopics(country, camp, school)
      const stackedBarchartDataArr = []

      for (let i = 0; i < topics.topics.length; i++) {
        const topic = topics.topics[i]
        const lessons = topics.lessons[i].values
        const cssId = topic.toLowerCase().replace(' ', '-')
        const dom = document.getElementsByClassName(`${cssId}`)

        if (dom[0] && dom[0].checked) { // checkbox
          const checkedColor = getTopicColorSchme(i)
          dom[1].style.color = checkedColor // label
          dom[2].style.border = `1px solid ${checkedColor}` // connected div to checkbox
          dom[3].style.color = checkedColor // V
          dom[4].style.color = checkedColor // Topic text
          dom[7].style.color = checkedColor // Table name
          const barChartDataSet = {
            label: topic,
            backgroundColor: getTopicColorSchme(i),
            data: Object.values(lessons)
          }
          stackedBarchartDataArr.push(barChartDataSet)
        } else if (dom[0] && !dom[0].checked) {
          dom[1].style.color = '#D8D8D8'
          dom[2].style.border = '1px solid #D8D8D8'
          dom[3].style.color = '#ffffff'
          dom[4].style.color = '#D8D8D8'
          dom[7].style.color = '#686868'
        }
      }
      this.stackedBarChartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: stackedBarchartDataArr
      }
    },
    unchekcAllCheckbox () {
      if (this.checkedItems) {
        const checked = this.checkedItems
        for (let i = 0; i < checked.length; i++) {
          const checkedItem = checked[i]
          const cssId = checkedItem.toLowerCase().replace(' ', '-')
          const dom = document.getElementsByClassName(`${cssId}`)
          dom[0].checked = false
          this.checkedItems = []
        }
      }
    }
  },
  watch: {
    checkedItems () {
      if (this.selectedSchool === null) {
        this.linechartShow = true
        this.stackedChartShow = false
        this.updateMultipleChartData()
      } else {
        this.linechartShow = false
        this.stackedChartShow = true
        this.updateStackedBarChartData()
      }
    },
    selectedCountry () {
      this.linechartShow = true
      this.stackedChartShow = false
      // this.changeCountry()
      function calcSum (lessons) {
        const sum = lessons.reduce(
          (prev, curr) => prev + curr)
        return sum
      }
      if (this.checkedItems) this.unchekcAllCheckbox()

      const country = this.selectedCountry
      const camps = getCamps(country)

      const lineChartData = []
      const barDataDict = {}
      const tableDataArr = []

      for (let i = 0; i < camps.length; i++) {
        const camp = camps[i]
        const lessons = getLessons(country, camp)

        // Line chart update
        const lineChartDataSet = {
          label: camp,
          backgroundColor: 'transparent',
          borderColor: getCampColorSchme(i),
          data: lessons.lessons.slice(0, 12),
          pointRadius: 6,
          borderWidth: 1.5,
          pointBackgroundColor: '#FFFFFF',
          lineTension: 0
        }
        lineChartData.push(lineChartDataSet)

        // Bar chart update
        barDataDict[camp] = {
          labels: lessons.months.slice(0, 12),
          datasets: [{
            data: lessons.lessons.slice(0, 12)
          }]
        }

        // table update
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

      // Total no of lessons by country
      let sum = 0
      for (let i = 0; i < tableDataArr.length; i++) {
        sum += tableDataArr[i].totalLessons
      }

      // replace old data with updated values
      this.chartData = {
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        datasets: lineChartData
      }
      this.barChartData = barDataDict
      this.tableData = tableDataArr
      this.dictForVfor = tableDataArr
      this.totalLessons = sum
    },
    selectedCamp () {
      this.linechartShow = true
      this.stackedChartShow = false
      // this.changeCamp()
      if (this.checkedItems) this.unchekcAllCheckbox()

      function calcSum (lessons) {
        const sum = lessons.reduce(
          (prev, curr) => prev + curr)
        return sum
      }

      if (this.selectedCamp !== null) {
        const country = this.selectedCountry
        const camp = this.selectedCamp

        const schoolsArr = getSchools(country, camp)

        const lineChartData = []
        const barDataDict = {}
        const tableDataArr = []

        for (let i = 0; i < schoolsArr.length; i++) {
          const school = schoolsArr[i]
          const lessons = getLessons(country, camp, school)

          // Line chart update
          const lineChartDataSet = {
            label: school,
            backgroundColor: 'transparent',
            borderColor: getSchoolColorSchme(i),
            data: lessons.lessons.slice(0, 12),
            pointRadius: 6,
            borderWidth: 1.5,
            pointBackgroundColor: '#FFFFFF',
            lineTension: 0
          }
          lineChartData.push(lineChartDataSet)

          // Bar chart update
          barDataDict[school] = {
            labels: lessons.months.slice(0, 12),
            datasets: [{
              data: lessons.lessons.slice(0, 12)
            }]
          }

          // table Update
          const tableDataSet = {
            type: 'School',
            name: school,
            totalLessons: calcSum(lessons.lessons),
            cssId: school.toLowerCase().replace(' ', '-'),
            vForId: school,
            propId: school.replace(/\s+/g, ''),
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

        // Total no of lessons by camp
        let sum = 0
        for (let i = 0; i < tableDataArr.length; i++) {
          sum += tableDataArr[i].totalLessons
        }

        // replace old data with updated values
        this.chartData = {
          labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          datasets: lineChartData
        }
        this.barChartData = barDataDict
        this.tableData = tableDataArr
        this.dictForVfor = tableDataArr
        this.totalLessons = sum
      }
      // FIXME: Selectbox에서 x 자가 눌릴 경우의 케이스 핸들링
      // if (this.selectedCamp === null) {
      //   this.updateMultipleChartData()
      // }
    },
    selectedSchool () {
      if (this.checkedItems) this.unchekcAllCheckbox()
      if (this.selectedSchool !== null) {
        const country = this.selectedCountry
        const camp = this.selectedCamp
        const school = this.selectedSchool
        this.linechartShow = false
        this.stackedChartShow = true
        this.setTopicsData(country, camp, school)
      }
      // FIXME: Selectbox에서 x 자가 눌릴 경우의 케이스 핸들링
      // if (this.selectedSchool === null) {
      //   this.updateMultipleChartData()
      // }
    }
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

#bar-chart #bar-chart {
  width: 100px !important;
  height: 50px !important;
}

.stacked-bar-chart {
  display: flex;
}

#stacked-bar-chart #bar-chart {
  width: 100% !important;
  height: 50% !important;
}

#stacked-bar-chart canvas {
  width: 100% !important;
  height: 50% !important;
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

/* .table-responsive {
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
} */

/* #table-content {
  margin: 3rem;
  font-size: 1.2rem;
}

.table thead th {
  border-bottom: none;
}

.table thead {
  width: 100%;
} */

/* .table {
  width: 100%;
} */
</style>
