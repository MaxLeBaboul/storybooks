const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

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

//body parser
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.listen(PORT, () => {
  console.log(`App server is running on port ${PORT}`);
});
