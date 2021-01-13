export function getCountryColorSchme (index) {
  let COLOR_SCHEME = [
    '#EA4C89',
    '#2FB9EF',
    '#67B675',
    '#f76511'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export function getCampColorSchme (index) {
  let COLOR_SCHEME = [
    '#F69855',
    '#BED23F',
    '#3FC9D2',
    '#D23FC5'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}

export function getSchoolColorSchme (index) {
  let COLOR_SCHEME = [
    '#EF6D73',
    '#9355DE',
    '#ffa600',
    '#ff7c43',
    '#f95d6a',
    '#d45087',
    '#a05195',
    '#665191',
    '#2f4b7c',
    '#003f5c'
  ]
  return COLOR_SCHEME[index % COLOR_SCHEME.length]
}
