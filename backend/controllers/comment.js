const Product = require("../models/productModel")
const Comment = require("../models/commentModel")


const addComment = async (req, res) => {
  try {
    const { b_id, text } = req.body;

    const product = await Product.findById(req.body._id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const newComment = new Comment({ b_id, text, product: product._id });
    await newComment.save();

    res.status(201).json({ message: "Comment added", comment: newComment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getCommentsByProduct = async (req, res) => {
  try {
    const comments = await Comment.find({ product : req.params._id });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addComment, getCommentsByProduct };