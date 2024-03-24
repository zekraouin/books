const { body } = require("express-validator");
const path = require("path");

// Define custom validation using the `body()` method
const imageValidator = {
  isImage: function (value, { req }, isCreate) {
    if ((!req.file || !req.file.originalname) && isCreate) {
      return false; // No file uploaded
    }
    if (!isCreate && !req.file) return true;

    const extension = path.extname(req.file.originalname).toLowerCase();
    switch (extension) {
      case ".jpg":
      case ".jpeg":
      case ".png":
        return true;
      default:
        return false;
    }
  },
};

exports.createBookValidation = [
  body("title").trim().notEmpty().escape(),
  body("description").notEmpty().escape(),
  body("createdAt").notEmpty().escape(),
  body("image")
    .custom((value, { req }) => imageValidator.isImage(value, { req }, true))
    .withMessage("Please upload a valid image file"),
  body("author").notEmpty().escape(),
];
exports.editBookValidation = [
  body("title").trim().notEmpty().escape(),
  body("description").notEmpty().escape(),
  body("createdAt").notEmpty().escape(),
  body("image")
    .custom((value, { req }) => imageValidator.isImage(value, { req }, false))
    .withMessage("Please upload a valid image file"),
  body("author").notEmpty().escape(),
];