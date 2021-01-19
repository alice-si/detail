
export function lineChartData (item, color, context) {
  const lineChartDataSet = {
    label: item,
    backgroundColor: 'transparent',
    borderColor: color,
    data: context.lessons.slice(0, 12),
    pointRadius: 6,
    borderWidth: 1.5,
    pointBackgroundColor: '#FFFFFF',
    lineTension: 0
  }

  return lineChartDataSet
}
