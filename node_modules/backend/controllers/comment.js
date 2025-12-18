const Product = require("../models/productModel");
const Comment = require("../models/commentModel");

const addComment = async (req, res) => {
  try {
    const { b_id, text, productId } = req.body;

    // if (!mongoose.Types.ObjectId.isValid(b_id) ||
    //     !mongoose.Types.ObjectId.isValid(productId)) {
    //   return res.status(400).json({ message: "Invalid ID format" });
    // }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const newComment = new Comment({
      b_id,
      text,
      product: productId
    });

    await newComment.save();

    res.status(201).json({
      message: "Comment added",
      comment: newComment
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCommentsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const comments = await Comment.find({ product: productId })
      .populate("b_id", "username email");

    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { addComment, getCommentsByProduct };