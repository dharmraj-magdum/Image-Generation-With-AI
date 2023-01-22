const express = require("express");
const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const cloudinary = require("cloudinary").v2;
const asyncHandler = require("express-async-handler");

const { postModel } = require("../mongodb/models/post.js");

const postRoutes = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

postRoutes.route("/get").get(
	asyncHandler(async (req, res) => {
		const posts = await postModel.find({});
		res.status(200).json({ success: true, data: posts });
	})
);

postRoutes.route("/set").post(
	asyncHandler(async (req, res) => {
		// console.log("posting data");
		const { name, prompt, photo } = req.body;
		if (!name || !prompt || !photo) {
			res.status(400);
			console.log("Unable to create a post, please try again");
			throw new Error("Unable to create a post, please try again");
		}
		var photoUrl;
		try {
			photoUrl = await cloudinary.uploader.upload(photo);
		} catch (err) {
			console.log(err);
			res.status(400);
			throw new Error("cant upload image");
		}

		// console.log(photoUrl);
		const newPost = await postModel.create({
			name,
			prompt,
			photo: photoUrl.url,
		});
		// console.log(newPost);
		res.status(200).json({ success: true, data: newPost });
	})
);

module.exports = { postRoutes };
