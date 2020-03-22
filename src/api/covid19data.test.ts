import { covid19Data } from './covid19Data'

test('returns data', () => {
  return covid19Data().then((data) => {
    expect(data).toEqual(expect.arrayContaining(
      [
        {
          "date": "2020-01-01",
          "location": "Australia",
          "new_cases": 0,
          "new_deaths": 0,
          "total_cases": 0,
          "total_deaths": 0,
        },
      ]
    ))
  })
})
