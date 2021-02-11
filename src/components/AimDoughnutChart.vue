<template>
  <div>
    <canvas id="box" width="114" height="114"></canvas>
  </div>
</template>

<script>
export default {
  props: {
    doughnutChartData: {
      type: Object
    }
  },
  mounted () {
    this.drawCircle(
      this.doughnutChartData.box,
      this.doughnutChartData.title,
      this.doughnutChartData.subtitle1,
      this.doughnutChartData.subtitle2,
      this.doughnutChartData.percentage,
      this.doughnutChartData.insideText,
      this.doughnutChartData.color)

    let min = 0
    let max = this.doughnutChartData.percentage
    setInterval(() => {
      if (min <= max) {
        min += 0.3
        this.drawCircle(min)
      }
    }, 0.01)
  },
  // data () {
  //   return {
  //     box: ''
  //   }
  // },
  methods: {
    drawCircle (endpoint) {
      const canvas = document.getElementById('box')
      const centerX = canvas.width / 1.65
      const centerY = canvas.height / 1.6
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Chart text
      ctx.font = '16.2px Helvetica'
      ctx.fillStyle = `${this.doughnutChartData.color}`
      ctx.fillText(this.doughnutChartData.title, 0, 15)
      ctx.font = '300 12px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.subtitle1, 0, 36.2, 60)
      ctx.font = '300 10px Helvetica'      
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.subtitle2, 0, 49.2, 60)
      ctx.font = '20px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(`${this.doughnutChartData.percentage}%`, 50, 68, 60)
      ctx.font = '300 12px Helvetica'
      ctx.fillStyle = '#686868'
      ctx.fillText(this.doughnutChartData.insideText, 45, 88, 60)
      // background
      ctx.beginPath()
      ctx.lineWidth = 8
      ctx.strokeStyle = '#D8D8D8'
      ctx.lineCap = 'round'
      ctx.arc(centerX, centerY, 38, 1.5 * Math.PI, 1 / 100 * 100 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
      // color
      ctx.beginPath()
      ctx.lineWidth = 8
      ctx.strokeStyle = `${this.doughnutChartData.color}`
      ctx.lineCap = 'round'
      const fraction = endpoint / 100
      ctx.arc(centerX, centerY, 38, 1.5 * Math.PI, (1.0 + fraction) * 1.5 * Math.PI, false)
      ctx.stroke()
      ctx.fillStyle = 'rgb(255, 255, 255, 0)'
      ctx.fill()
    }
    // fillCircle (color, min) {
    //   const canvas = document.getElementById('box')
    //   const centerX = canvas.width / 1.65
    //   const centerY = canvas.height / 1.8
    //   const ctx = canvas.getContext('2d')
    //   ctx.beginPath()
    //   ctx.lineWidth = 8
    //   ctx.strokeStyle = `${color}`
    //   ctx.lineCap = 'round'
    //   const fraction = min / 100
    //   ctx.arc(centerX, centerY, 38, 1.5 * Math.PI, (1.0 + fraction) * 1.5 * Math.PI, false)
    //   ctx.stroke()
    //   ctx.fillStyle = 'rgb(255, 255, 255, 0)'
    //   ctx.fill()
    // }
  }
}
</script>

<style>
</style>