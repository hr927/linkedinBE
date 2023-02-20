const express = require("express");
const { PostModel } = require("../Model/Post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const user = req.body.user;
  const query = req.query;
  try {
    if (query.device) {
      const posts = await PostModel.find({ user, device: query.device });
      res.send(posts);
    } else if (query.device1 && query.device2) {
      console.log(query);
      const posts = await PostModel.find({
        user,
        $or: [{ device: query.device1 }, { device: query.device2 }],
      });
      res.send(posts);
    } else {
      const posts = await PostModel.find({ user });
      res.send(posts);
    }
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
});

postRouter.get("/top", async (req, res) => {
  const user = req.body.user;
  try {
    const posts = await PostModel.find({ user }).sort({ no_of_comments: -1 });
    res.send(posts[0]);
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
});

postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send({ msg: "New Post Created" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const payload = req.body;
  const postId = req.params.id;
  try {
    const post = await PostModel.findByIdAndUpdate({ _id: postId }, payload);
    res.send({ msg: "Post updated" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findByIdAndDelete({ _id: postId });
    res.send({ msg: "Post Deleted" });
  } catch (err) {
    res.send({ msg: "Something went wrong", error: err });
  }
});

module.exports = { postRouter };
