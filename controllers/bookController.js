const { validationResult } = require("express-validator");
const Book = require("../models/Book");
const Author = require("../models/Author");


exports.index = async (req, res) => {
  const books = await Book.find();
  books.reverse();
  res.render("books/index", { books: books });
};

exports.create = async (req, res) => {
  authors = await Author.find();
  res.render("books/create", { authors: authors, book: {} });
};
exports.show = async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug }).populate(
      "author"
    );
    if (!book) throw new Error("Book not found");
    res.render("books/detail", { book: book });
  } catch (error) {
    res.render("books/detail", { error: error });
  }
};
exports.delete = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (error) {
    res.redirect("back");
  }
};

exports.store = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      authors = await Author.find();
      res.render("books/create", {
        errors: errors.array(),
        error: "invalid inputs data",
        authors: authors,
        book: {
          title: req.body.title,
          description: req.body.description,
          author: req.body.author,
          createdAt: req.body.createdAt,
        },
      });
    }

    const author = await Author.findById(req.body.author);
    const book = {
      title: req.body.title,
      description: req.body.description,
      author: author,
      createdAt: req.body.createdAt,
      image: "/uploads/" + req.file.filename,
    };

    const savedBook = new Book(book);
    await savedBook.save();

    // Send a response
    res.render("books/index", {
      books: await Book.find().populate("author"),
    });
  } catch (error) {
    authors = await Author.find();
    res.render("books/create", {
      error: "Failed to create book :" + error,
      authors: authors,
      book: {
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        createdAt: req.body.createdAt,
      },
    });
  }
};
exports.editPage = async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.params.slug });
    if (!book) {
      return res.status(404).send("Book not found ");
    }
    authors = await Author.find();
    res.render("books/edit", { book: book, authors: authors });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
exports.edit = async (req, res) => {
  try {
    var mybook = await Book.findOne({ slug: req.params.slug });
    if (!mybook) {
      return res.status(404).send("Book not found");
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const authors = await Author.find();
      return res.render(`books/edit`, {
        errors: errors.array(),
        authors,
        book: mybook,
      });
    }

    // Update book details
    mybook.title = req.body.title;
    mybook.description = req.body.description;
    mybook.author = req.body.author;
    mybook.createdAt = req.body.createdAt;
    if (req.file) {
      mybook.image = "/uploads/" + req.file.filename;
    }

    // Save the updated
    await mybook.save();

    res.redirect(`/books/detail/${mybook.slug}`);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};