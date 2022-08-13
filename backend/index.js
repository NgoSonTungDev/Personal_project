const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const moongoose = require("mongoose");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movie");
const CommentRouter = require("./routes/cmt");
const CartRouter = require("./routes/cart");
const HistoryRouter = require("./routes/history");
const TotalRouter = require("./routes/total");

const app = express();
app.use(cors());
app.use(bodyparser.json());
app.use(express.json());
app.use(morgan("common"));

dotenv.config();

moongoose.connect(process.env.MOOGODB_CONNECT_DATABASE_FIX, (err) => {
  if (err) {
    console.log("Error : " + err);
  } else {
    console.log("Connect moogoosedb successfully !");
  }
});

app.listen(5000, () => {
  console.log("server is running.....");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/movie", movieRouter);
app.use("/api/comment", CommentRouter);
app.use("/api/cart", CartRouter);
app.use("/api/Historybought", HistoryRouter);
app.use("/api/TotalOrder", TotalRouter);





