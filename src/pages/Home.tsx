import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '../rootReducer'

export const Home: React.FC = () => {
  const data = useSelector((state: RootState) => state.data.result)
  return (
    <Fragment>
      <h1>hello Coronavirus (CoViD-19)</h1>
      <p>
        This is a simple web app to display real time information about the spread of CoViD-19 around the world.
        CoViD-19 is an infectious disease caused by a new virus.
         The source data is obtained from <a target="https://ourworldindata.org/coronavirus-source-data">Our World in Data</a>
      </p>
      <p>Data count: {data.length}</p>
    </Fragment>
  )
}
