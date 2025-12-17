const express = require("express");
const router = express.Router();
const { addComment, getCommentsByProduct } = require("../controllers/comment");


router.post("/comments", addComment);
router.get("/comments/:_id", getCommentsByProduct);

module.exports = router;