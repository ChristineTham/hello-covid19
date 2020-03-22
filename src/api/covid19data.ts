import * as Papa from 'papaparse'

export function covid19Data() {
  const url = 'https://covid.ourworldindata.org/data/ecdc/full_data.csv'
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete(results, file) {
        resolve(results.data)
      },
      error(err, file) {
        reject(err)
      },
    })
  })
}