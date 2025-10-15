const path = require('path');

module.exports = {
  mode: 'production',              // Set mode to production or development
  entry: './js/index.js',              // Your main JS file path (adjust if needed)
  output: {
    filename: 'bundle.js',         // Name for the bundled file
    path: path.resolve(__dirname, 'dist'),  // Output directory 'dist'
  },
};
