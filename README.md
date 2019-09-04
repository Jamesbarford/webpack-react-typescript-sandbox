# React / TypeScript App Boilerplate Setup ⚛

## With webpack, typescript, sass & jest 👍

This is simply to save time for a front end build setup without the overhead of create react app.

It is highly configurable and provides a solid base to build projects off with the ability to do bundle splitting and async imports.

Testing is run through `jest` & `enzyme` which has been configured for `TypeScript`. Yahoo!

# Install 💾

## Requirements: node v 10^ & npm or yarn🚩

- `npm install` or `yarn` to install dev & dependencies.
- `npm start` to run the app in development mode.
- `npm build` to build app in production mode.
- `npm run test` runs jest.
- `npm run test:watch` runs jest in watch mode and will watch files for changes re-running tests.

# Modes: Development | Production 🖥 🎪

## Development 🖥

- Setup to use webpack dev server.
- Watches for changes of any `TypeScript` or `scss` file and will refesh app
- Will only rebuild code written.

## Production 🎪

- Will build the entire app.
- Vendor modules (node modules) are hashed and split from the dev written code, external modules will be cached on the users browser to prevent reloading modules which have no changed thus decreasing initial load times.
- `template.html` can be written in to change title, add `divs` or whatever else is needed.
