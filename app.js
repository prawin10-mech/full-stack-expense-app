const express = require("express");
const cors = require("cors");
const path = require("path");

const sequelize = require("./models/expenses");
const expensesRoute = require("./routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "frontend")));

app.use(expensesRoute);

sequelize
  .sync()
  .then(() => {
    app.listen(3000, () => {
      console.log("server started");
    });
  })
  .catch((err) => console.log(err));
