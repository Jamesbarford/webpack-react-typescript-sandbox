const common = [
  require("autoprefixer"),
  require('postcss-css-variables'),
  require('postcss-calc')
];

const plugins = process.env.NODE_ENV === "production" ?
  [
    require("cssnano")({ preset: 'default' }),
   ...common
  ] : common;


module.exports = { plugins };