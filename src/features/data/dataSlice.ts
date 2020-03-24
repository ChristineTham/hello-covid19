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
    },
  },
})

export const { requestData, receiveData } = dataSlice.actions

// Define a thunk that dispatches those action creators
export const fetchData = () => async (dispatch: (action: { payload: unknown; type: string }) => void) => {
  dispatch(requestData())
  const response = await covid19Data()
  dispatch(receiveData(response))
  console.log(response)
}

export default dataSlice.reducer
