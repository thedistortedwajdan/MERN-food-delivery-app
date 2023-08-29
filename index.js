const express = require("express");
const app = express();
const db_connect = require("./db");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const port = process.env.port || 5000;
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
db_connect();
app.use(express.json());
app.use("/api", require("./Routes/api"));
if (process.env.NODE_ENV === "production") {
  app.use(express.static("front-end/build"));
}
try {
  if (process.env.NODE_ENV === "production") {
    app.use(express.static("front-end/build"));
    console.log(true);
  } else {
    console.log(false);
  }
} catch (error) {
  console.log(error.message);
}
app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
