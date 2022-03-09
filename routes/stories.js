const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");

const {
  getAdd,
  postAdd,
  storiesShow,
  singleStory,
  getEdit,
  updateStory,
  deleteStory,
  getUserId,
} = require("../controllers/stories");

// @desc    Show add page
// @route   GET /stories/add
router.route("/add").get(ensureAuth, getAdd);

// @desc    Process add from
// @route   POST stories/
router.route("/").post(ensureAuth, postAdd);

// @desc    show all stories
// @route   Get stories/
router.route("/").get(ensureAuth, storiesShow);

// @desc    Show single story
// @route   GET /stories/:id
router.route("/:id").get(ensureAuth, singleStory);

// @desc    Show edit page
// @route   GET /stories/edit/:id
router.route("/edit/:id").get(ensureAuth, getEdit);

// @desc    Update story
// @route   PUT /stories/:id
router.route("/:id").put(ensureAuth, updateStory);

// @desc    Delete story
// @route   DELETE /stories/:id
router.route("/:id").delete(ensureAuth, deleteStory);

// @desc    User stories
// @route   GET /stories/user/:userId
router.route("/user/:userId").get(ensureAuth, getUserId);

module.exports = router;
