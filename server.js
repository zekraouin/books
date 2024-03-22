require("dotenv").config();
const express = require("express");
const app = express();
//views and layouts
app.use(express.urlencoded({ extended: true }));
const expressLayouts = require("express-ejs-layouts");
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");
app.use(expressLayouts);
app.use(express.static("public"));
//db connection 
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to mongoose"));
//validation



// routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
//authors routes
const authorsRoutes = require("./routes/Authors")
app.use("/authors", authorsRoutes);
//books routes
const booksRoutes = require("./routes/Books")
app.use("/books", booksRoutes);

app.listen(process.env.PORT || 5000);
