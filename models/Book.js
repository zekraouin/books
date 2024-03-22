const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Author", 
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  slug: {
    type: String,
    slug: "title"
  } 

});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
