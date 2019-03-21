require("./models/db");

const express = require("express");
const router = express.Router();
const path = require("path");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const shell = require("shelljs");

const customerController = require("./controllers/customerController");
const invoiceController = require("./controllers/invoiceController");
const emailController = require("./controllers/emailController");
const mongoose = require("mongoose");
const Invoice = mongoose.model("Invoice");
const Customer = mongoose.model("Customer");

const app = express();

app.use(
  bodyparser.urlencoded({
    extended: true
  })
);
app.use(bodyparser.json());
app.set("views", path.join(__dirname, "/views/"));
app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: "mainLayout",
    layoutsDir: __dirname + "/views/layouts/"
  })
);
app.set("view engine", "hbs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  let list = [];
  list.result = await Invoice.countDocuments({ isPaid: "False" });
  list.result2 = await Invoice.countDocuments({ isPaid: "True" });
  list.result3 = await Invoice.countDocuments({});
  list.result4 = await Customer.countDocuments({});
  list.result5 = await Invoice.find({ isPaid: "False" });
  res.render("dashboard", list);
});

var port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use("/customer", customerController);

app.use("/invoice", invoiceController);

app.use("/email", emailController);
