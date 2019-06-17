## This is a test for ClearScore.

### Info
- node version used: `v10.15.3`;
- npm version used: `6.9.0`.

### How to
- `npm i` <- this first
- `npm start` to run the server;
- `npm test` to run tests.

### Folder structure:
- clientcomponent: all dumb components
- client/containers: all container connected to the store
- client/gobals: all global styles / javascript
- client/state: configuration for the redux state
- client/utilities: all custom utilities which are used within the project

## What is missing
- some test coverage:
  1. i've implemented the storage and the sortBy functionalities later so some tests are missing here (i.e. checking that by adding an idea, the ideas should be sorted straight away, checking that the app loads the storage data on refresh).

## What could be improved
- some styling for input
- styleguide with variables etc
- abstraction of few components (inputs, textarea, grid)
- typechecking
- add components to storybook
- documentation
