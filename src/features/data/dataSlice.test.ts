import dataSlice, { getData } from './dataSlice'
import { ParseResult } from 'papaparse'

test('getData', () => {
  expect(dataSlice(undefined, {})).toEqual({})

  expect(
    dataSlice(undefined, {
      type: getData.type,
    })
  ).toMatchInlineSnapshot(`Object {}`)
})
