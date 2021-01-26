<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%" class="thead">
        <tr style="width:100%">
          <th style="width:7%; border-right:1px solid #D8D8D8;" scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyName" class="sort-button"/></th>
          <th style="width:3.77%" scope="col">Jan</th>
          <th style="width:3.77%" scope="col">Feb</th>
          <th style="width:3.77%" scope="col">Mar</th>
          <th style="width:3.77%" scope="col">Apr</th>
          <th style="width:3.77%" scope="col">May</th>
          <th style="width:3.77%" scope="col">Jun</th>
          <th style="width:3.77%" scope="col">Jul</th>
          <th style="width:3.77%" scope="col">Aug</th>
          <th style="width:3.77%" scope="col">Sep</th>
          <th style="width:3.77%" scope="col">Oct</th>
          <th style="width:3.77%" scope="col">Nov</th>
          <th style="width:3.77%; border-right:1px solid #D8D8D8;" scope="col">Dec</th>
          <th style="width:10%;" scope="col">Total lessons <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyLessons" class="sort-button"/></th>
          <th style="width:14.5%" scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyDifference" class="sort-button"/></th>
        </tr>
      </thead>
      <tbody style="width:100%; border-bottom:1px solid #D8D8D8;">
        <tr style="width:100%;" v-for="country in tableData" v-bind:key="country.name">
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
