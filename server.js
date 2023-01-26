const express = require("express");
const routes = require("./controllers");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Connect mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/social-network-api",
  {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Log mongoose queries
mongoose.set("debug", true);

// turn on connection to server
app.listen(PORT, () =>
  console.log(`Now listening on http://localhost:${PORT}`)
);
