
const Author = require("../models/Author");

// Function to handle rendering the create author page
exports.renderCreatePage = (req, res) => {
  res.render("authors/create");
};

// Function to handle rendering the author detail page
exports.renderDetailPage = async (req, res) => {
  try {
    const author = await Author.findOne({ slug: req.params.slug });
    if (!author) {
      return res.status(404).send("Author not found");
    }
    res.render("authors/show", { author });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Function to handle rendering the list of authors page
exports.renderAuthorsList = async (req, res) => {
  try {
    const authors = await Author.find();
    authors.reverse();
    res.render("authors/index", { authors });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Function to handle creating a new author
exports.createAuthor = async (req, res) => {
  try {
    const existingAuthor = await Author.findOne({ name: req.body.name });
    if (existingAuthor) {
      return res.render("authors/create", {
        error: "Author already exists",
        author: { name: req.body.name },
      });
    }
    const author = new Author({ name: req.body.name });
    await author.save();
    res.redirect("/authors");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

// Function to handle deleting an author
exports.deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findOneAndDelete({
      slug: req.params.slug,
    });
    if (!deletedAuthor) {
      return res.status(404).send("Author not found");
    }
    res.redirect("/authors");
  } catch (error) {
    res.redirect("back");
  }
};

// Function to handle rendering the edit author page
exports.renderEditPage = async (req, res) => {
  try {
    const author = await Author.findOne({ slug: req.params.slug });
    if (!author) {
      return res.status(404).send("Author not found");
    }
    res.render("authors/edit", { author });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
exports.updateAuthor = async (req, res) => {
  try {
    const author = await Author.findOne({ slug: req.params.slug });
    if (!author) {
      return res.status(404).send("Author not found");
    }
    author.name = req.body.name;
    await author.save();
    res.render(`authors/show`, { author });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

