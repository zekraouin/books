const express = require("express");
const router = express.Router();
const Author = require('../models/Author')

//create authors page
router.get("/create", (req, res) => {
  res.render("authors/create");
});
//all athors
router.get("/", async(req, res) => {
    const authors = await Author.find();
    authors.reverse()
    res.render("authors/index",{authors:authors});
});

//new author
router.post("/", async(req, res) => {
    try {
        const existingAuthor= await Author.findOne({ name: req.body.name });
        
        if (existingAuthor) {
          return res.render("authors/create", {
            error: "Author already exists",
            author: { name: req.body.name },
          });
        }

        const author = new Author({ name: req.body.name });

        await author.save().then(async () => {
            authors = await Author.find();
            authors.reverse();
            return res.render("authors/index",{authors:authors});
        })
        .catch(error => {
            return res.render("authors/create",{ error:'Internal server error',
            author: { name: req.body.name }, });
        });
        
    } catch (error) {
       return res.render("authors/create",{ error:'Internal server error',
            author: { name: req.body.name }, });
    }
});
   
//search autocomplete
router.get("/search", async (req, res) => {
  try {
    const query = req.query.query;
    const authors = await Author.find({
      name: { $regex: query, $options: "i" },
    });
    const suggestions = authors.map((author) => author.name);

    res.status(200).json({ suggestions });
  } catch (error) {
    console.log("Error fetching search suggestions:", error);
    res.status(500).json({ error: error });
  }
});


module.exports = router;
