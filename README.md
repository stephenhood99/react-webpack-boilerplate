# Getting started

This was made with npm `9.4.2` and might not work for earlier or later major versions.

Run `npm install` to setup dependencies, then run the app with `npm run start`.

The app will run on `localhost:3000`, but the port can be changed in `webpack.config.base.js`

# What is this?
This boilerplate code is a combination of React, React Redux, and Webpack. The actual code is configured for `typescript`, but `javascript` is also enabled.

## React
React is library for user interfaces which is concerned only with rendering. [See React's official website for more information](https://reactjs.org/).

## React Redux
Redux is essentially a predictable state container. Rather than needing to worry about `useState` throughout the project, Redux can manage state updates and propogate state changes for you (however, don't just throw all your stateful needs on Redux. `useState` is still good to use whenever that state is contained within one file). [See Redux's official website for more information](https://react-redux.js.org/)

### Where is it?
The sample code for Redux is in the `src/state` folder. The `hooks` and `store` files are pretty standard and won't need to be modified for the most part. The main logic is within the `exampleSlice`.

## Webpack
Webpack takes modules with dependencies and bundles them into static assets to make life easy. It also enables us to use cool things like `less`, which is an awesome version of `.css` files. The webpack files include
- `webpack.config.base.js`
- `webpack.config.dev.js`
- `webpack.config.prod.js`
- `tsconfig.json`
- `babel.config.json`
- And potentially others that I forgot

[See Webpack's official website for more information](https://webpack.js.org/concepts/why-webpack/)