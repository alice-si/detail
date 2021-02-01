<template>
  <div class="table-responsive">
    <table id="table-content" class="table">
      <thead class="thead">
        <tr>
          <th style="border-right:1px solid #D8D8D8;" scope="col">Students</th>
          <th scope="col">Skills</th>
          <th v-for="(school, index) in column" v-bind:key="index" v-bind:class="school">
            {{school}}
          </th>
          <th style="white-space:nowrap;" scope="col">Avg No of ICT skills/student in {{tableName}}</th>
        </tr>
      </thead>
      <tbody style="border-bottom:1px solid #D8D8D8;">
        <tr>
          <th rowspan="3" align="center" style="border-right:1px solid #D8D8D8;">Total</th>
          <td style="white-space:nowrap;">before INS</td>
          <td v-for=" (data, index) in totalBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in totalAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <!-- <td v-for=" (data, index) in totalDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td> -->
        </tr>
        <tr>
          <th rowspan="3" align = "center" style="border-right:1px solid #D8D8D8;">Male</th>
          <td>before INS</td>
          <td v-for=" (data, index) in maleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in maleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in maleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <th rowspan="3" align = "center" style="border-right:1px solid #D8D8D8;">Female</th>
          <td>before INS</td>
          <td v-for=" (data, index) in femaleBeforeIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <td>after INS</td>
          <td v-for=" (data, index) in femaleAfterIns" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
          </td>
        </tr>
        <tr>
          <td>Difference</td>
          <td v-for=" (data, index) in femaleDifference" v-bind:key="index" v-bind:style="borderStyle(index)">
            {{data}}
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
      type: Object
    } },
  data () {
    return {
      sortedByName: false,
      sortedByLessons: false,
      sortedByDifference: false,
      tableName: 'Name',
      column: ['Skill1', '%', 'Skill2', '%', 'Skill3', '%', 'Skill4', '%', 'Skill5', '%', 'Skill6', '%', 'Skill7', '%',
      'Skill8', '%', 'Skill9', '%', 'Skill10', '%', 'Skill11', '%', 'Skill12', '%', 'Skill13', '%', 'Skill14', '%',
      'Skill15', '%', 'Skill16', '%', 'Skill17', '%', 'Skill18', '%', 'Skill19', '%', 'Skill20', '%', 'Skill21', '%'],
      totalBeforeIns: [],
      totalAfterIns: [],
      totalDifference: [],
      maleBeforeIns: [],
      maleAfterIns: [],
      maleDifference: [],
      femaleBeforeIns: [],
      femaleAfterIns: [],
      femaleDifference: []
    }
  },
  mounted () {
    console.log(this.tableData.maleDifference)
    this.maleBeforeIns = this.tableData.maleBaseYearData
    this.maleAfterIns = this.tableData.maleEndYearData
    this.femaleBeforeIns = this.tableData.femaleBaseYearData
    this.femaleAfterIns = this.tableData.femaleEndYearData
    this.maleDifference = this.tableData.maleDiff
    this.femaleDifference = this.tableData.femaleDiff
  },
  methods: {
    borderStyle (index) {
      const columnLength = this.column.length
      if (index === columnLength - 1) {
        return 'border-right:1px solid #D8D8D8;'
      }
    }
  },
  watch: {
    tableData () {
      if (this.tableData.maleBaseYearData.length !== 0) {
        this.maleBeforeIns = this.tableData.maleBaseYearData
        this.maleAfterIns = this.tableData.maleEndYearData
        this.femaleBeforeIns = this.tableData.femaleBaseYearData
        this.femaleAfterIns = this.tableData.femaleEndYearData
        this.femaleDifference = this.tableData.femaleDiff
        this.maleDifference = this.tableData.maleDiff
      } else {
        return null
      }
    }
  }
}
</script>
