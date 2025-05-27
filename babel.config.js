module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Only include essential plugins
      'react-native-reanimated/plugin'
    ]
  };
};
