import { configureStore, Action } from '@reduxjs/toolkit'
import { ThunkAction } from 'redux-thunk'

import rootReducer, { RootState } from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
})

if (
  process.env.NODE_ENV === 'development' &&
  (
    module as NodeModule & {
      hot?: { accept: (path: string, cb: () => void) => void }
    }
  ).hot
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(module as any).hot.accept('./rootReducer', () => {
    import('./rootReducer').then((module) => {
      store.replaceReducer(module.default)
    })
  })
}

export type AppDispatch = typeof store.dispatch

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export default store
