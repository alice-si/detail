<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%" class="thead">
        <tr style="width:100%">
          <th scope="col">Students<img src="../../src/assets/Sorting.svg" class="sort-button"/></th>
          <th scope="col">Schools</th>
          <th scope="col">Lycee de la Paix</th>
          <th scope="col">Amani</th>
          <th scope="col">Amitie</th>
          <th scope="col">Rechema</th>
          <th scope="col">Hodari</th>
          <th scope="col">Fraternite</th>
          <th scope="col">Avg No of ICT skills/student across schools <img src="../../src/assets/Sorting.svg" class="sort-button"/></th>
        </tr>
      </thead>
      <tbody style="width:100%">
        <tr>
          <th rowspan="3" align = "center">Total</th>
          <td>before INS</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>after INS</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
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
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>after INS</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
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
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
        </tr>
        <tr>
          <td>after INS</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
          <td>20%</td>
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
  // props: {
  //   tableData: {
  //     type: Array
  //   } },
  // data () {
  //   return {
  //     sortedByName: false,
  //     sortedByLessons: false,
  //     sortedByDifference: false,
  //     tableName: 'Name'
  //   }
  // },
  // methods: {
  //   sortTableDatabyName () {
  //     if (this.sortedByName === false) {
  //       const unsorted = this.tableData
  //       unsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
  //       this.sortedByName = true
  //     } else if (this.sortedByName === true) {
  //       const sorted = this.tableData
  //       sorted.sort((a, b) => (a.name < b.name) ? 1 : -1)
  //       this.sortedByName = false
  //     }
  //   },
  //   sortTableDatabyLessons () {
  //     if (this.sortedByLessons === false) {
  //       const unsorted = this.tableData
  //       unsorted.sort((a, b) => (a.totalLessons > b.totalLessons) ? 1 : -1)
  //       this.sortedByLessons = true
  //     } else if (this.sortedByLessons === true) {
  //       const sorted = this.tableData
  //       sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
  //       this.sortedByLessons = false
  //     }
  //   },
  //   sortTableDatabyDifference () {
  //     if (this.sortedByDifference === false) {
  //       const unsorted = this.tableData
  //       unsorted.sort((a, b) => (a.difference > b.difference) ? 1 : -1)
  //       this.sortedByLessons = true
  //     } else if (this.sortedByDifference === true) {
  //       const sorted = this.tableData
  //       sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
  //       this.sortedByLessons = false
  //     }
  //   }
  // },
  // watch: {
  //   tableData () {
  //     this.tableName = this.tableData[0].type
  //   }
  // }
}
</script>
