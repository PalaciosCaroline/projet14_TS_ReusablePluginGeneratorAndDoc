// module.exports = {
//     transformIgnorePatterns: [
//       "node_modules/(?!(typescript-table)/)",
//       "node_modules/(?!(typescript-exportdata)/)"
//     ],
// };

module.exports = {
  transformIgnorePatterns: [
    "node_modules/(?!typescript-table|typescript-exportdata)/"
  ],
};