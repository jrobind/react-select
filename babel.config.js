module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
        "@babel/plugin-proposal-class-properties",
        "transform-object-rest-spread"
    ],
    env: {
      test: {
        presets: [['@babel/preset-env', { "modules": "commonjs"}]]
      }
    }
  };
