import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchData, CompleteFunction} from '../../api/covid19data'
import { ParseResult } from 'papaparse'

const dataSlice = createSlice({
  name: 'data',
  initialState: {} as ParseResult,
  reducers: {
    getData: (state) => {
      let complete: CompleteFunction
      complete = (result) => {
        state = result
      }

      fetchData(complete)
    },
  },
})

export const {
  getData,
} = dataSlice.actions

export default dataSlice.reducer