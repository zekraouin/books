const express = require("express");
const router = express.Router();
const Author = require('../models/Author')
const AuthorsController=require("../controllers/authorController")

// Routes
router.get("/create", AuthorsController.renderCreatePage);
router.get("/:slug", AuthorsController.renderDetailPage);
router.get("/", AuthorsController.renderAuthorsList);
router.post("/", AuthorsController.createAuthor);
router.post("/:slug/delete", AuthorsController.deleteAuthor);
router.get("/:slug/edit", AuthorsController.renderEditPage);
router.post("/:slug/edit", AuthorsController.updateAuthor);

module.exports = router;
