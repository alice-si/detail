// For INS Page
export function calcSum (lessons) {
  const sum = lessons.reduce(
    (prev, curr) => prev + curr
  )
  return sum
}

export function compareDataByYear (prevYearLessons, currYearLessons) {
  const prevSum = calcSum(prevYearLessons)
  const currSum = calcSum(currYearLessons)
  const growthRate = ((currSum / prevSum) - 1) * 100
  if (Number.isNaN(growthRate)) {
    return '-'
  } else if (growthRate !== Infinity) {
    return growthRate.toFixed(0) + '%'
  } else {
    return '+ 100%'
  }
}

export function getLineChartData (lessons, colorScheme) {
  const totalLessons = lessons.lessons.flatMap(el => Object.values(el))
  const sum = calcSum(totalLessons)

  const labels = lessons.labels
  const dataset = lessons.lessons
  const lineChartData = []
  let chartDataObj = {}

  if (sum === 0) {
    chartDataObj = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [{
        label: 'No lessons data for this year',
        backgroundColor: 'transparent',
        borderColor: '#D8D8D8',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        pointRadius: 6,
        borderWidth: 1.5,
        pointBackgroundColor: '#FFFFFF',
        lineTension: 0
      }]
    }
  } else {
    for (let i = 0; i < dataset.length; i++) {
      const color = colorScheme(i)
      const lineChartDataSet = {
        label: labels[i],
        backgroundColor: 'transparent',
        borderColor: color,
        data: Object.values(dataset[i]),
        pointRadius: 6,
        borderWidth: 1.5,
        pointBackgroundColor: '#FFFFFF',
        lineTension: 0
      }
      lineChartData.push(lineChartDataSet)
    }
    chartDataObj = {
      labels: Object.keys(dataset[0]),
      datasets: lineChartData
    }
  }
  return chartDataObj
}

export function getTableData (tabletype, lessons, prevYear) {
  const countries = lessons.labels
  const tableDataArray = []

  for (let countryIndex = 0; countryIndex < countries.length; countryIndex++) {
    const lessonsData = lessons.lessons[countryIndex]
    const prevYearLessonsData = prevYear.lessons[countryIndex]
    const total = calcSum(Object.values(lessonsData))
    let growthRate = ''

    if (prevYearLessonsData) {
      growthRate = compareDataByYear(Object.values(prevYearLessonsData), Object.values(lessonsData))
    } else {
      growthRate = '+100%'
    }

    const tableDataSet = {
      type: tabletype,
      name: countries[countryIndex],
      totalLessons: total,
      cssId: countries[countryIndex].toLowerCase().replaceAll(' ', '-'),
      vForId: countries[countryIndex],
      propId: countries[countryIndex].replace(/\s+/g, ''),
      monthlyData: {
        lessons: Object.values(lessonsData),
        months: Object.keys(lessonsData)
      },
      colorIndex: countryIndex
    }

    tableDataSet.monthlyData.lessons.push(total)
    tableDataSet.monthlyData.lessons.push(growthRate)
    tableDataSet.monthlyData.months.push('Total Lessons')
    tableDataSet.monthlyData.months.push('Difference in 12 Months')
    tableDataArray.push(tableDataSet)
  }
  return tableDataArray
}

export function getBarChartData (dataByCountry) {
  const allDataDict = {}
  dataByCountry.forEach(el => {
    let key = el.name
    let value = el.monthlyData.lessons.slice(0, 12)
    allDataDict[key] = {
      labels: el.monthlyData.months.slice(0, 12),
      datasets: [{
        data: value
      }]
    }
  })
  return allDataDict
}

export function getStackedBarChartData (lessons, colorScheme) {
  const totalLessons = lessons.lessons.flatMap(el => Object.values(el))
  const sum = calcSum(totalLessons)
  const barChartData = []
  for (let i = 0; i < lessons.labels.length; i++) {
    const barChartDataSet = {
      label: lessons.labels[i],
      backgroundColor: colorScheme(i),
      data: Object.values(lessons.lessons[i])
    }
    barChartData.push(barChartDataSet)
  }

  let chartDataObj = {}
  if (sum === 0) {
    chartDataObj = {
      labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
      datasets: [{
        label: 'No lessons data for this year',
        backgroundColor: 'transparent',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }]
    }
  } else if (lessons.lessons.length > 0) {
    chartDataObj = {
      labels: Object.keys(lessons.lessons[0]),
      datasets: barChartData
    }
  }
  return chartDataObj
}

// For ICT page
import { getIctSchoolAvg } from './data-provider'

export function getIctRate (school, type, year) {
  const avgSchoolIctSkill = getIctSchoolAvg(`${school}`, `${type}`, `${year}`)
  return avgSchoolIctSkill
}

export function calcDifference (base, end) {
  const difference = end.map((end, index) => {
    if (end - base[index] < 0) {
      return '-' + end - base[index] + '%'
    } else if (end - base[index] > 0) {
      const plus = '+'
      return plus.concat('', end - base[index]) + '%'
    } else {
      return 0 + '%'
    }
  })
  return difference
}
