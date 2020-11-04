const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path")
const middlewares = require("./middlewares");
const blood = require("./api/blood");
const {MONGODB_URI} = require("./keys")

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  MONGODB_URI || process.env.MONGODB_URI || "mongodb://localhost/mongo_db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to database")
);

app.use("/api/blood", blood);

//not found handler
app.use(middlewares.notFound);

//general error handler
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;

if(process.env.NODE_ENV == "production") {
	app.use(express.static("/client/build"))
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
	})
}

app.listen(port, () => console.log("listening on " + port));
