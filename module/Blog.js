var mongoose = require('mongoose');


var blogSchema = new mongoose.Schema({
  title: String,
  body: String,
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = mongoose.model("Blog", blogSchema);