const fs = require("node:fs");
const morgan = require("morgan");

/* ------------------------------------------------------- */

const now = new Date();
console.log(now);

const today = now.toISOString().split("T")[0];
console.log(today);

module.exports = morgan("combined", {
  stream: fs.createWriteStream(`./logs/${today}.log`, { flags: "a+" }),
});
