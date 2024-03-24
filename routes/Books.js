const express = require("express");
const router = express.Router();

// Define custom validation using the `body()` method

const upload = require("../multerConfig");
const bookController=require("../controllers/bookController");
const { createBookValidation,editBookValidation} = require("../middlewares/validations");

//all books
router.get("/",bookController.index );
//create  page
router.get("/create",bookController.create);


// Your route handling image upload and other book details
router.post("/",upload.single("image"),createBookValidation,
  bookController.store
);

router.get("/detail/:slug", bookController.show);
router.post('/:id/delete', bookController.delete);
//edit
router.get('/:slug/edit',  bookController.editPage);
router.post('/:slug/edit',upload.single("image"),editBookValidation, bookController.edit);

router.get("/detail", (req, res) => {
  res.redirect("/books");
});
module.exports = router;

