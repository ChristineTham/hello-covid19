import * as Papa from 'papaparse'

export function covid19Data(): Promise<unknown> {
  const url = 'https://covid.ourworldindata.org/data/owid-covid-data.csv'
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete(results) {
        resolve(results.data)
      },
      error(err) {
        reject(err)
      },
    })
  })
}
