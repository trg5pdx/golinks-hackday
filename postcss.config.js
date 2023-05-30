/* Obtained from:
  https://www.smashingmagazine.com/2020/02/tailwindcss-react-project/
*/
const tailwindcss = require("tailwindcss");
module.exports = {
  plugins: [tailwindcss("./tailwind.js"), require("autoprefixer")],
};
