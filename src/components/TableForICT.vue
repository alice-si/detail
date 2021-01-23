<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%" class="thead">
        <tr style="width:100%">
          <th scope="col">Students<img src="../../src/assets/Sorting.svg" class="sort-button"/></th>
          <th scope="col">Schools</th>
          <th v-for="(school, index) in column" v-bind:key="index">
            {{school}}
          </th>
          <th scope="col">Avg No of ICT skills/student across schools <img src="../../src/assets/Sorting.svg" class="sort-button"/></th>
        </tr>
      </thead>
      <tbody style="width:100%; border-bottom:1px solid #D8D8D8;">
        <tr>
          <th rowspan="3" align="center">Total</th>
          <td>before INS</td>
          <td v-for=" (data, index) in totalBeforeIns" v-bind:key="index">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in totalAfterIns" v-bind:key="index">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
        </tr>
        <tr>
          <th rowspan="3" align = "center">Male</th>
          <td>before INS</td>
          <td v-for=" (data, index) in maleBeforeIns" v-bind:key="index">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in maleAfterIns" v-bind:key="index">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
        </tr>
        <tr>
          <th rowspan="3" align = "center">Female</th>
          <td>before INS</td>
          <td v-for=" (data, index) in femaleBeforeIns" v-bind:key="index">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in femaleAfterIns" v-bind:key="index">
            {{data}}%
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Object
    } },
  data () {
    return {
      sortedByName: false,
      sortedByLessons: false,
      sortedByDifference: false,
      tableName: 'Name',
      column: '',
      totalBeforeIns: [],
      totalAfterIns: [],
      maleBeforeIns: [],
      maleAfterIns: [],
      femaleBeforeIns: [],
      femaleAfterIns: []
    }
  },
  watch: {
    tableData () {
      console.log('this.tableData', this.tableData)
      if (this.tableData.columns.length !== 0) {
        console.log('prop loaded')
        this.column = this.tableData.columns
        this.totalBeforeIns = this.tableData.total.beforeIns
        this.totalAfterIns = this.tableData.total.afterIns
        this.maleBeforeIns = this.tableData.male.beforeIns
        this.maleAfterIns = this.tableData.male.afterIns
        this.femaleBeforeIns = this.tableData.female.beforeIns
        this.femaleAfterIns = this.tableData.female.afterIns
      } else {
        console.log('not loaded', this.tableData)
        return null
      }
    }
    // sortTableDatabyName () {
    //   if (this.sortedByName === false) {
    //     const unsorted = this.tableData
    //     unsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
    //     this.sortedByName = true
    //   } else if (this.sortedByName === true) {
    //     const sorted = this.tableData
    //     sorted.sort((a, b) => (a.name < b.name) ? 1 : -1)
    //     this.sortedByName = false
    //   }
    // },
    // sortTableDatabyLessons () {
    //   if (this.sortedByLessons === false) {
    //     const unsorted = this.tableData
    //     unsorted.sort((a, b) => (a.totalLessons > b.totalLessons) ? 1 : -1)
    //     this.sortedByLessons = true
    //   } else if (this.sortedByLessons === true) {
    //     const sorted = this.tableData
    //     sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
    //     this.sortedByLessons = false
    //   }
    // },
    // sortTableDatabyDifference () {
    //   if (this.sortedByDifference === false) {
    //     const unsorted = this.tableData
    //     unsorted.sort((a, b) => (a.difference > b.difference) ? 1 : -1)
    //     this.sortedByLessons = true
    //   } else if (this.sortedByDifference === true) {
    //     const sorted = this.tableData
    //     sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
    //     this.sortedByLessons = false
    //   }
    // }
  }
  // watch: {
  //   tableData () {
  //     this.setTableData()
  //   }
  // }
}
</script>
