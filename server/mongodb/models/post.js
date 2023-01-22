const mongoose = require("mongoose");

const Post = new mongoose.Schema({
	name: { type: String, required: true },
	prompt: { type: String, required: true },
	photo: { type: String, required: true },
});

const postModel = mongoose.model("Post", Post);

module.exports = { postModel };
