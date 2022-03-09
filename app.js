const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const { engine } = require("express-handlebars");
const morgan = require("morgan");
const passport = require("passport");
const methodOverride = require("method-override");
const session = require("express-session");

const MongoStore = require("connect-mongo");
const app = express();
const loginRoute = require("./routes/index");
const authRoute = require("./routes/auth");
const passConf = require("./config/passport");
const storiesRoute = require("./routes/stories.js");

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

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

// Handlebars
app.engine(
  ".hbs",
  engine({
    helpers: { formatDate, stripTags, truncate, editIcon, select },
    defaultLayout: "main",
    extname: ".hbs",
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");

//Session
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: mongoose.connection._connectionString,
      mongoOptions: {},
    }),
  })
);

//Static folder
app.use(express.static(path.join(__dirname, "public")));

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

//logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

//Routes
app.use("/", loginRoute);
app.use("/auth", authRoute);
app.use("/stories", storiesRoute);

app.listen(PORT, () => {
  console.log(`App server is running on port ${PORT}`);
});
