# React / TypeScript App Boilerplate Setup ⚛
## With webpack, typescript and sass 👍

This is simply to save time for a front end build setup without the overhead of create react app.

It is highly configurable and provides a solid base to build projects off with the ability to do bundle splitting and async imports.

# Install 💾
## Requirements: node v 8.12^ & npm 🚩
- `npm install` to install dev & dependencies.
- `npm start` to run the app in development mode.
- `npm build` to build app in production mode.
- `npm build:analyse`, a bit of hack slash implementation but could be useful to view the size of the dependancies and dev code written. 

# Modes: Development | Production 🖥 🎪
## Development 🖥
- Setup to use webpack dev server.
- Watches for changes of any `TypeScript` or `scss` file and will refesh app
- Will only rebuild code written.

## Production 🎪
- Will build the entire app.
- Vendor modules (node modules) are hashed and split from the dev written code, external modules will be cached on the users browser to prevent reloading modules which have no changed thus decreasing initial load times.
- `template.html` can be written in to change title, add `divs` or whatever else is needed.

#### N.B 😮
- For `scss` files currently they would need to be `imported` into `src/App/style.scss` and would be bundled into one colossal `css` file which is somewhat unintuitive.
- If moving `style.scss` out of `App` change the location in `webpack.config.js`
- `build:analyse` is not properly configured.

