const express = require("express");
const app = express();
const cors = require("cors");

const userRoute = require("./routes/transaction");

require("./config/database").connect();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
  Credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", userRoute);
app.listen(3000, () => {
  console.log("server is running");
});
