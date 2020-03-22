import { configureStore } from '@reduxjs/toolkit'

import data, { requestData, receiveData, fetchData } from './dataSlice'

const initialState: DataState = {
  isFetching: false,
  lastFetched: 0,
  result: [],
}

test('data actions', () => {
  expect(data(undefined, {})).toEqual(initialState)

  expect(
    data(undefined, {
      type: requestData.type,
    })
  ).toEqual({
    "isFetching": true,
    "lastFetched": 0,
    "result": [],
  })

  expect(
    data(undefined, {
      type: receiveData.type,
      action: [],
    })
  ).toEqual({
    isFetching: false,
    lastFetched: 0,
    result: [],
  })
})

// test('fetchData', () => {
//   const store = configureStore({
//     reducer: data,
//   })

//   store.dispatch(fetchData())
//   expect(store.getState().result).toEqual(
//     expect.arrayContaining([
//       {
//         date: '2020-01-01',
//         location: 'Australia',
//         new_cases: 0,
//         new_deaths: 0,
//         total_cases: 0,
//         total_deaths: 0,
//       },
//     ])
//   )
// })
