const express = require("express");
const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const dalleRoutes = express.Router();

const configuration = new Configuration({
	apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

dalleRoutes.route("/").get((req, res) => {
	res.status(200).json({ message: "Hello from DALL-E!" });
});

dalleRoutes.route("/").post(async (req, res) => {
	// console.log("creating image in router");
	try {
		const { prompt } = req.body;
		const aiResponse = await openai.createImage({
			prompt,
			n: 1,
			size: "512x512",
			response_format: "b64_json",
		});
		// console.log(aiResponse);
		const image = aiResponse.data.data[0].b64_json;
		res.status(200).json({ photo: image });
	} catch (error) {
		console.error(error);
		res.status(500).send(
			error?.response.data.error.message ||
				"Something went wrong while taking to ai"
		);
	}
});

module.exports = { dalleRoutes };
