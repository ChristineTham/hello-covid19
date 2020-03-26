# hello Coronavirus (CoViD-19)

This is a simple web app to display real time information about the spread of CoViD-19 around the world.
CoViD-19 is an infectious disease caused by a new virus.
The source data is obtained from [Our World in Data](https://ourworldindata.org/coronavirus-source-data)
and is based on data collected by the European CDC.

This app represents my very first attempt to write a modern serverless web app.
I have been learning Javascript since the start of the CoViD-19 outbreak
as a way to pass time while staying at home.

## App Architecture

The app is written in React (with Hooks) (using the Materialize front-end framework).
It fetches the latest CoViD-19 data as a CSV from
[Our World in Data](https://ourworldindata.org/coronavirus-source-data")
using Papaparse asynchronously on load (using `async`/`await`) via the Papaparse
module via Redux Thunk into a Redux store using the Redux Toolkit.

The data is used to render visualisations via Redux React. Data manipulation is done
in native Javascript using array methods, and rendered as charts using Plot.ly JS.
React Select is used for the interactive controls.

The application is written in Typescript (with eslint and prettier checking) using
Visual Studio Code as the editor on macOS. It uses the Create React App build
framework (with the typescript-redux template) and is served via static web files
from Surge.sh.

## Technology Stack

- Create React App with the typescript-redux template
- React (Hooks)
- Redux, React, Redux, Redux Toolkit
- React Select
- Plot.ly JS
- Papaparse
- Typescript with eslint and prettier
- Visual Studio Code
- Surge.sh (static/serverless web hosting)

## Available Scripts

In the project directory, you can run:

- `yarn start` - runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

- `yarn test` - launches the test runner in the interactive watch mode.

- `yarn build` - builds the app for production to the `build` folder.

- `yarn eject` - exposes content of `react-script` package

- `yarn lint` - lints project files according to eslint rules, see below. Typical use case: continuous integration environments, Travis, CircleCI, etc.

- `yarn fix` - same as `yarn lint`, but also fixes errors, when possible. Typical use case: local development environment, git hooks.

Due to CRA template limitations (we can change only `scripts` and `dependencies` inside generated `package.json`) all configuration is done by adding config files where possible. Also no `devDependencies` for now, sorry.

## Testing

Testing is done with [Enzyme](https://airbnb.io/enzyme/).
