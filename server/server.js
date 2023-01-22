const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const path = require("path");
const colors = require("colors");

//
const port = process.env.PORT || 5000;
const { connectDB } = require("./mongodb/connect.js");
const { errorHandler } = require("./errorHandler.js");
const { postRoutes } = require("./routes/postRoutes.js");
const { dalleRoutes } = require("./routes/dalleRoutes.js");

///
const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ limit: "50mb" }));

app.use(cors());

app.use("/api/imggenai/dalle", dalleRoutes);
app.use("/api/imggenai/posts", postRoutes);

// app.get("/", async (req, res) => {
// 	res.status(200).json({
// 		message: "Hello from DALL.E! world",
// 	});
// });

connectDB();

// Serve frontend
if (process.env.MODE === "production") {
	app.use(express.static(path.join(__dirname, "../client/build")));

	app.get("*", (req, res) =>
		res.sendFile(
			path.resolve(__dirname, "../", "client", "build", "index.html")
		)
	);
	console.log("static build is provides".bgCyan);
} else {
	//else condn not good for normal people
	app.get("/", (req, res) =>
		res.send("something went wrong/Please contact to production")
	);
}

app.use(errorHandler);
app.listen(port);
console.log(`server run successfully`.cyan);
