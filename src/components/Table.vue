<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:80%" class="thead">
        <tr style="width:80%">
          <th style="width:15%; border-right:1px solid #D8D8D8;" scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyName" class="sort-button"/></th>
          <th style="width:3%" scope="col">1</th>
          <th style="width:3%" scope="col">2</th>
          <th style="width:3%" scope="col">3</th>
          <th style="width:3%" scope="col">4</th>
          <th style="width:3%" scope="col">5</th>
          <th style="width:3%" scope="col">6</th>
          <th style="width:3%" scope="col">7</th>
          <th style="width:3%" scope="col">8</th>
          <th style="width:3%" scope="col">9</th>
          <th style="width:3%" scope="col">10</th>
          <th style="width:3%" scope="col">11</th>
          <th style="width:3%; border-right:1px solid #D8D8D8;" scope="col">12</th>
          <th style="width:15%;" scope="col">Total lessons <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyLessons" class="sort-button"/></th>
          <th style="width:15%" scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyDifference" class="sort-button"/></th>
        </tr>
      </thead>
      <tbody style="width:80%; border-bottom:1px solid #D8D8D8;">
        <tr style="width:80%;" v-for="country in tableData" v-bind:key="country.name">
          <th v-bind:class="country.cssId" id="country-name" style="border-right:1px solid #D8D8D8;">
            {{country.name}}
          </th>
          <td scope="row" class="monthly-data" v-for="(month, index) in country.monthlyData.lessons" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{month}}
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    } },
  data () {
    return {
      sortedByName: false,
      sortedByLessons: false,
      sortedByDifference: false,
      tableName: 'Name'
    }
  },
  methods: {
    sortTableDatabyName () {
      if (this.sortedByName === false) {
        const unsorted = this.tableData
        unsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.sortedByName = true
      } else if (this.sortedByName === true) {
        const sorted = this.tableData
        sorted.sort((a, b) => (a.name < b.name) ? 1 : -1)
        this.sortedByName = false
      }
    },
    sortTableDatabyLessons () {
      if (this.sortedByLessons === false) {
        const unsorted = this.tableData
        unsorted.sort((a, b) => (a.totalLessons > b.totalLessons) ? 1 : -1)
        this.sortedByLessons = true
      } else if (this.sortedByLessons === true) {
        const sorted = this.tableData
        sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
        this.sortedByLessons = false
      }
    },
    sortTableDatabyDifference () {
      if (this.sortedByDifference === false) {
        const unsorted = this.tableData
        unsorted.sort((a, b) => (a.difference > b.difference) ? 1 : -1)
        this.sortedByLessons = true
      } else if (this.sortedByDifference === true) {
        const sorted = this.tableData
        sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
        this.sortedByLessons = false
      }
    },
    borderStyle (index) {
      if (index === 11) {
        return 'border-right:1px solid #D8D8D8;'
      }
    }
  },
  watch: {
    tableData () {
      this.tableName = this.tableData[0].type
    }
  }
}
</script>
