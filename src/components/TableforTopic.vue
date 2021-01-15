<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead>
        <tr>
          <th scope="col">{{tableName}}<img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyName" class="sort-button"/></th>
          <th scope="col">Jan</th>
          <th scope="col">Feb</th>
          <th scope="col">Mar</th>
          <th scope="col">Apr</th>
          <th scope="col">May</th>
          <th scope="col">Jun</th>
          <th scope="col">Jul</th>
          <th scope="col">Aug</th>
          <th scope="col">Sep</th>
          <th scope="col">Oct</th>
          <th scope="col">Nov</th>
          <th scope="col">Dec</th>
          <th scope="col">Total times <img src="../../src/assets/Sorting.svg" v-on:click="sortTableDatabyLessons" class="sort-button"/></th>
          <!-- TODO:% of total usage?? -->
          <th scope="col">Difference in 12 Months <img src="../../src/assets/Sorting.svg" class="sort-button"/></th>
        </tr>
      <tbody>
        <tr v-for="topic in TopicTableData" v-bind:key="topic.name">
          <td v-bind:class="topic.cssId" id="country-name">
            {{topic.name}}
          </td>
          <th scope="row" class="monthly-data" v-for="(month, index) in topic.monthlyData"  v-bind:key="index">
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
<style>

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
</style>
