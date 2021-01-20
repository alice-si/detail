<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%" class="thead">
        <tr style="width:100%">
          <th style="width:15%" scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyName" class="sort-button"/></th>
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
          <th style="width:3%" scope="col">12</th>
          <th style="width:16%" scope="col">Total lessons <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyLessons" class="sort-button"/></th>
          <th style="width:21%" scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyDifference" class="sort-button"/></th>
        </tr>
      <tbody style="width:100%">
        <tr style="width:100%" v-for="country in tableData" v-bind:key="country.name">
          <td v-bind:class="country.cssId" id="country-name">
            {{country.name}}
          </td>
          <th scope="row" class="monthly-data" v-for="(month, index) in country.monthlyData.lessons"  v-bind:key="index">
            {{month}}
          </th>
        </tr>
      </tbody>
      </thead>
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
        sorted.sort((a, b) => (a.difference < b.difference) ? 1 : -1)
        this.sortedByLessons = false
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
