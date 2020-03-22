import * as Papa from 'papaparse'

export interface CompleteFunction {
  (result: Papa.ParseResult): void;
}

export function fetchData(complete: CompleteFunction): void {
  const url = 'https://covid.ourworldindata.org/data/ecdc/full_data.csv'
  Papa.parse(url, {
    download: true,
    header: true,
    dynamicTyping: true,
    complete: complete,
  })
}
