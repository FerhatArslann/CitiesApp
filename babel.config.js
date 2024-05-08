module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@components": "./components",
        "@screens": "./screens",
        "@slices": "./Store/Slices"  // Alias Slices-kansiolle
      }
    }]
  ]
};
