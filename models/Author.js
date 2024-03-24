const mongoose = require("mongoose")
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);
const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    slug: "name",
  },
  createdAt: {
      type: Date,
    default:Date.now(),
    required: true,
  },
});
module.exports=mongoose.model("Author",authorSchema)