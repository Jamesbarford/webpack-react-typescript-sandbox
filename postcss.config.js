const common = [ require("autoprefixer")({}), require('postcss-css-variables') ];

const plugins = process.env.ENV === "production" ?
  [
    require("cssnano")({ preset: 'default' }),
   ...common
  ] : common;


module.exports = {
  parser: "postcss-scss",
  syntax: "postcss-scss",
  plugins
};