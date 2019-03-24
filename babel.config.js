module.exports = {
  presets: [
    [ "@babel/preset-env", { useBuiltIns: "entry", corejs:"core-js@3" } ],
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-object-rest-spread",
  ]
}