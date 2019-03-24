const common = [
  require("autoprefixer")({ browsers: ['last 2 versions', 'iOS >= 8'] }),
  require('postcss-css-variables'),
  require('postcss-calc')
];

const plugins = process.env.ENV === "production" ?
  [
    require("cssnano")({ preset: 'default' }),
   ...common
  ] : common;


module.exports = { plugins };