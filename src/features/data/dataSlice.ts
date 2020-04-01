import { createSlice } from '@reduxjs/toolkit'
import { covid19Data } from '../../api/covid19Data'

export interface DataState {
  isFetching: boolean
  lastFetched: number
  result: any[]
}

const initialState: DataState = {
  isFetching: false,
  lastFetched: 0,
  result: [],
}

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    requestData(state) {
      if (!state.isFetching) {
        state.isFetching = true
      }
    },
    receiveData(state, action) {
      if (state.isFetching) {
        state.isFetching = false
        state.result = action.payload
      }
      state.result = state.result.map((item) => ({
        ...item,
        total_fatality: item.total_deaths / item.total_cases,
        daily_fatality: item.new_deaths / item.new_cases,
        case_growth: item.new_cases / (item.total_cases - item.new_cases),
        death_growth: item.new_deaths / (item.total_deaths - item.new_deaths),
      }))
    },
  },
})

export const { requestData, receiveData } = dataSlice.actions

// Define a thunk that dispatches those action creators
export const fetchData = () => async (dispatch: (action: { payload: unknown; type: string }) => void) => {
  dispatch(requestData())
  const response = await covid19Data()
  dispatch(receiveData(response))
}

export default dataSlice.reducer
