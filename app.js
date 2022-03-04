const express = require("express");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const passport = require("passport");

const session = require("express-session");
const path = require("path");
const MongoStore = require("connect-mongo");
const app = express();
const loginRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const passConf = require("./config/passport");

const PORT = process.env.PORT || 5000;

//load config
dotenv.config({ path: "./config/config.env" });

//Passport config
passConf(passport);

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

//Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/storybooks" }),
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`App server is running on port ${PORT}`);
});
