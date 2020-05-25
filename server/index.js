const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");

const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/link", require("./routes/links"));
app.use("/t", require("./routes/redirect"));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await mongoose.connect(config.get("DB_CONNECT"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`App has been started on port ${PORT} ...`));
  } catch (error) {
    console.log("Server Error", error.message);
    process.exit(1);
  }
}

start();
