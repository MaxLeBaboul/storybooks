const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const path = require("path");
const app = express();
const loginRoute = require("./routes/index");

const PORT = process.env.PORT || 5000;

//load config
dotenv.config({ path: "./config/config.env" });

//Enable cors
app.use(cors());

//connect db
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(
    process.env.MONGO_URL,
    {
      useNewUrlParser: true,
    },
    () => {
      console.log("Connected to MongoDB");
    }
  );
}

//handlebars
app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

//Static folder
app.use(express.static(path.join(__dirname, "public")));

//body parser
app.use(express.json());

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Routes
app.use("/", loginRoute);
app.listen(PORT, () => {
  console.log(`App server is running on port ${PORT}`);
});
