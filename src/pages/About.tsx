import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

export const About: React.FC = () => {
  const history = useHistory()

  return (
    <Fragment>
      <h1>About</h1>
      <p>
        This app represents my very first attempt to write a modern serverless web app.
        I have been learning Javascript since the start of the CoViD-19 outbreak
        as a way to pass time while staying at home.
      </p>
      <p>
        This app is licensed under the MIT licence and the source code is available on
         <a href="https://github.com/ChristineTham/hello-covid19.git"> GitHub</a>.
      </p>
      <button type="button" className="btn purple" onClick={() => history.push('/')}>
        Back to home
      </button>
      <div className="section">
        <h4>App Architecture</h4>
        <p>
          The app is written in React (with Hooks) (using the Materialize front-end framework).
          It fetches the latest CoViD-19 data as a CSV from
          <a href="https://ourworldindata.org/coronavirus-source-data"> Our World in Data </a>
          using Papaparse asynchronously on load (using <code>async</code>/<code>await</code>) via the Papaparse
          module via Redux Thunk into a Redux store using the Redux Toolkit.
        </p>
        <p>
          The data is used to render visualisations via Redux React. Data manipulation is done
          in native Javascript using array methods, and rendered as charts using Plot.ly JS.
          React Select is used for the interactive controls.
        </p>
        <p>
          The application is written in Typescript (with eslint and prettier checking) using
          Visual Studio Code as the editor on macOS. It uses the Create React App build
          framework (with the typescript-redux template) and is served via static web files
          from Surge.sh.
        </p>
        <div className="row">
          <div className="col s12 m6 offset-m3">
            <ul className="collection with-header">
              <li className="collection-header white-text pink lighten-1"><h5>Technology Stack</h5></li>
              <li className="collection-item">Create React App with the typescript-redux template</li>
              <li className="collection-item">React (Hooks)</li>
              <li className="collection-item">Redux, React, Redux, Redux Toolkit</li>
              <li className="collection-item">Materialize CSS framework</li>
              <li className="collection-item">React Flexbox Grid</li>
              <li className="collection-item">React Select</li>
              <li className="collection-item">Plot.ly JS</li>
              <li className="collection-item">Papaparse</li>
              <li className="collection-item">Typescript with eslint and prettier</li>
              <li className="collection-item">Visual Studio Code</li>
              <li className="collection-item">Surge.sh (static/serverless web hosting)</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="section">
        <h4>About Me</h4>
        <div className="col s12 m8 offset-m2 l6 offset-l3">
          <div className="card-panel pink lighten-5 z-depth-1">
            <div className="row valign-wrapper">
              <div className="col s2">
                <img src="images/HaHaHa.jpg" alt="Profile" className="circle responsive-img" />
              </div>
              <div className="col s10">
                <span className="black-text">
                    Hello, my name is Chris Tham.
                    I am the Owner and Founder of
                    <a href="https://www.hellotham.com"> Hello Tham </a>
                    (a boutique strategy and management consulting company) and
                    <a href="https://visualvoyager.net"> Visual Voyager </a>
                    (a photography review, tours and workshops web site).
                    I am taking the opportunity during the CoViD-19 pandemic crisis
                    to learn how to write serverless web and mobile apps.
                  </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
