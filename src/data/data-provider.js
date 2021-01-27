const data = require('./parsed.json')
const ICT_STUDENT_DATA = require('./ict-data.json')
const ICT_TEACHER_DATA = require('./ict-teachers-data.json')

// for INS
export function getCountries () {
  const countryList = Object.keys(data.children)
  return countryList
}

export function getCamps (country) {
  return Object.keys(data.children[country].children)
}

export function getSchools (country, camp) {
  return Object.keys(data.children[country].children[camp].children)
}

function getZeroLessonData () {
  return {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
    '6': 0,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': 0,
    '11': 0,
    '12': 0
  }
}

export function getLessons (countries, camps, schools, year) {
  let values = {}

  if (countries.length === 0) {
    values['All'] = data.values[year] ? data.values[year] : getZeroLessonData()
  } else {
    for (let countryIndex = 0; countryIndex < countries.length; countryIndex++) {
      const country = countries[countryIndex]
      if (camps.length === 0) {
        const lessons = data.children[country].values[year]
        if (lessons) {
          values[country] = lessons
        } else {
          values[country] = getZeroLessonData()
        }
      } else {
        for (let campIndex = 0; campIndex < camps.length; campIndex++) {
          const camp = camps[campIndex]
          if (schools.length === 0) {
            const lessons = data.children[country].children[camp].values[year]
            if (lessons) {
              values[camp] = lessons
            } else {
              values[camp] = getZeroLessonData()
            }
          } else {
            for (let schoolIndex = 0; schoolIndex < schools.length; schoolIndex++) {
              const school = schools[schoolIndex]
              const lessons = data.children[country].children[camp].children[school].values[year]
              if (lessons) {
                values[school] = lessons
              } else {
                values[school] = getZeroLessonData()
              }
            }
          }
        }
      }
    }
  }

  values = {
    labels: Object.keys(values),
    lessons: Object.values(values)
  }

  return values
}

export function getLessonsByTopics (country, camp, school, year) {
  let values = data.children[country].children[camp].children[school].children
  let allMonthlyDataByYears = Object.values(values)

  const allTopics = Object.keys(values)
  let existingTopicsInYear = {}

  allTopics.forEach((el, index) => {
    const monthlyData = allMonthlyDataByYears[index].values[year]
    existingTopicsInYear[el] = monthlyData || getZeroLessonData()
  })

  return {
    labels: Object.keys(existingTopicsInYear),
    lessons: Object.values(existingTopicsInYear)
  }
}

// set year select box options
export function setYearSelectBox (country, camp, school) {
  const totalDataByCountry = Object.values(data.children)
  let yearlyIndex = []
  let uniqueYear = []

  if (country === undefined) {
    totalDataByCountry.forEach(el => {
      const totalData = el.values
      yearlyIndex.push(...Object.keys(totalData))
    })
    uniqueYear = yearlyIndex.filter((item, index) => yearlyIndex.indexOf(item) === index).sort((a, b) => b - a)
  }

  return uniqueYear.slice(1, uniqueYear.length)
}

// for ICT
export function getIctCountries () {
  const countries = ICT_STUDENT_DATA
  return Object.keys(countries.children)
}

export function getAvgPercentage (absolute) {
  const MAX_ICT = 21
  const percentage = absolute / MAX_ICT * 100
  return percentage
}

export function getIctSchoolList () {
  const list = Object.keys(ICT_STUDENT_DATA.children.Tanzania.children.Nyarugusu.children)
  return list
}

export function getStudentIctSchoolAvg (school, type, year) {
  let percentage = ''
  if (year === 'Base') {
    const base = ICT_STUDENT_DATA.children.Tanzania.children.Nyarugusu.children[school].values[type].base_avg
    percentage = getAvgPercentage(base).toFixed(0)
  } else if (year === 'End') {
    const end = ICT_STUDENT_DATA.children.Tanzania.children.Nyarugusu.children[school].values[type].end_avg
    percentage = getAvgPercentage(end).toFixed(0)
  }
  return percentage
}

export function getStudentAvgAcrossSchools (type, year) {
  let percentage = ''
  if (year === 'Base') {
    const base = ICT_STUDENT_DATA.values[type].base_avg
    percentage = getAvgPercentage(base).toFixed(0)
  } else if (year === 'End') {
    const end = ICT_STUDENT_DATA.values[type].end_avg
    percentage = getAvgPercentage(end).toFixed(0)
  }
  return percentage
}

export function getTeacherIctSchoolAvg (school, type, year) {
  let percentage = ''
  if (year === 'Base') {
    const base = ICT_TEACHER_DATA.children.Tanzania.children.Nyarugusu.children[school].values[type].base_avg
    percentage = getAvgPercentage(base).toFixed(0)
  } else if (year === 'End') {
    const end = ICT_TEACHER_DATA.children.Tanzania.children.Nyarugusu.children[school].values[type].end_avg
    percentage = getAvgPercentage(end).toFixed(0)
  }
  return percentage
}

export function getTeacherAvgAcrossSchools (type, year) {
  let percentage = ''
  if (year === 'Base') {
    const base = ICT_TEACHER_DATA.values[type].base_avg
    percentage = getAvgPercentage(base).toFixed(0)
  } else if (year === 'End') {
    const end = ICT_TEACHER_DATA.values[type].end_avg
    percentage = getAvgPercentage(end).toFixed(0)
  }
  return percentage
}
