const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("config");
const path = require('path');


const app = express();

app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/link", require("./routes/links"));
app.use("/t", require("./routes/redirect"));

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
})


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
