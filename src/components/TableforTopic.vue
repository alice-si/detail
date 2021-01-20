<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead style="width:100%">
        <tr style="width:100%">
          <th style="width:15%" scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyName" class="sort-button"/></th>
          <th style="width:3%" scope="col">Jan</th>
          <th style="width:3%" scope="col">Feb</th>
          <th style="width:3%" scope="col">Mar</th>
          <th style="width:3%" scope="col">Apr</th>
          <th style="width:3%" scope="col">May</th>
          <th style="width:3%" scope="col">Jun</th>
          <th style="width:3%" scope="col">Jul</th>
          <th style="width:3%" scope="col">Aug</th>
          <th style="width:3%" scope="col">Sep</th>
          <th style="width:3%" scope="col">Oct</th>
          <th style="width:3%" scope="col">Nov</th>
          <th style="width:3%" scope="col">Dec</th>
          <th style="width:16%" scope="col">Total times <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyLessons" class="sort-button"/></th>
          <!-- TODO:% of total usage?? -->
          <th style="width:21%" scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" class="sort-button"/></th>
        </tr>
      <tbody style="width:100%">
        <tr style="width:100%" v-for="topic in TopicTableData" v-bind:key="topic.name">
          <td v-bind:class="topic.cssId" id="country-name">
            {{topic.name}}
          </td>
          <th scope="row" class="monthly-data" v-for="(lesson, index) in topic.monthlyData.lessons"  v-bind:key="index">
            {{lesson}}
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
    TopicTableData: {
      type: Array
    } },
  data () {
    return {
      sortedByName: false,
      sortedByLessons: false,
      tableName: 'Topic'
    }
  },
  methods: {
    sortTableDatabyName () {
      if (this.sortedByName === false) {
        const unsorted = this.TopicTableData
        unsorted.sort((a, b) => (a.name > b.name) ? 1 : -1)
        this.sortedByName = true
      } else if (this.sortedByName === true) {
        const sorted = this.TopicTableData
        sorted.sort((a, b) => (a.name < b.name) ? 1 : -1)
        this.sortedByName = false
      }
    },
    sortTableDatabyLessons () {
      if (this.sortedByLessons === false) {
        const unsorted = this.TopicTableData
        unsorted.sort((a, b) => (a.totalLessons > b.totalLessons) ? 1 : -1)
        this.sortedByLessons = true
      } else if (this.sortedByLessons === true) {
        const sorted = this.TopicTableData
        sorted.sort((a, b) => (a.totalLessons < b.totalLessons) ? 1 : -1)
        this.sortedByLessons = false
      }
    }
  },
  watch: {
    TopicTableData () {
      this.tableName = this.TopicTableData[0].type
    }
  }
}
</script>
