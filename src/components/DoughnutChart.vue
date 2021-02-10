<template>
  <canvas id="box" width="150" height="150">
    <div class="box">
      <div class="percent">
        <svg class="circle">
          <circle cx="40" cy="40" r="40"></circle>
          <circle cx="40" cy="40" r="40"></circle>
        </svg>
      </div>
      <div class="number">
        <h2>{{percentage}}<span>%</span></h2>
        <h3 class="text">{{insideText}}</h3>
      </div>
      <div class="aim">
        <h1 v-bind:style="{color: fontcolor}">{{title}}</h1>
        <h3 class="aim-text">{{subtitle}}</h3>
      </div>
    </div>
  </canvas>
</template>

<script>
export default {
  props: {
    doughnutChartData: {
      type: Object
    }
  },
  mounted () {
    this.title = this.doughnutChartData.title
    this.subtitle = this.doughnutChartData.subtitle
    this.percentage = this.doughnutChartData.percentage
    this.insideText = this.doughnutChartData.insideText
    this.fontcolor = this.doughnutChartData.color
    const canvas = document.getElementById('box')
    console.log(canvas)
  },
  data () {
    return {
      title: '',
      subtitle: '',
      percentage: '',
      insideText: '',
      color: ''
    }
  }
}
</script>

<style>
.box {
  background-color: rgb(255, 255, 255, 0);
  width: 11.4rem;
  height: 11.4rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 3.5rem;
}

.box svg {
  /* position: relative; */
  width: 8.1rem;
  height: 8.1rem;
  top: 65px;
}

.box circle {
  fill:rgb(255, 255, 255, 0);
  transform: translate(5px, 5px);
  stroke: var(--color-light-grey);
  stroke-width: 0.8rem;
}

.box circle:nth-child(1) {
  stroke: var(--color-light-grey);
  stroke-width: 0.8rem;
  fill:rgb(255, 255, 255, 0);
}

.box circle:nth-child(2) {
  stroke-width: 0.8rem;
  /* stroke: #8954BA; */
  /* stroke-dasharray: 108.75 80 ; */
  stroke-dasharray: 125 65;
  /* stroke-dasharray: calc(125/100*20) calc(190 - (125/100*20)); */
  /* total 190  = 125 65 */
}

.box .circle {
  width: 90px;
  height: 90px;
  /* position: relative;
  left: 10px; */
  stroke-dasharray: 125 65;
  stroke-width: 0.8rem;
}

.number {
  /* position: relative;
  top: 2px;
  left: 10px; */
}

.number h2 {
  font-family: Helvetica;
  font-size: 1.993rem;
  color: #677991;
  letter-spacing: 0.01px;
}

.number h3 {
  font-family: Helvetica-Light;
  font-size: 0.81rem;
  color: #96A4B7;
  letter-spacing: 0;
}

.aim {
  background-color: rgb(255, 255, 255, 0);
  /* position: relative; */
  /* top: -90px; */
  width: 7rem;
}

.aim h3 {
  font-family: Helvetica-Light;
  font-size: 12.15px;
  color: #8D9AA9;
  letter-spacing: -0.13px;
  text-align: left;
}

.aim h1 {
  font-family: Helvetica-Light;
  font-size: 16.2px;
  color: #8954BA;
  letter-spacing: -0.17px;
  text-align: left;
}
</style>