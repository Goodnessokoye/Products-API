const notFoundMiddleware = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const connectDB = require("./db/connect");
require("dotenv").config();
const productRouter = require("./routes/products");
const express = require("express");
const app = express();

//middlewares
app.use(express.json());

//routes
app.use("/api/v1/product", productRouter);
app.get("/", (req, res) => {
  res.send("Hello");
  console.log("hello");
});

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
