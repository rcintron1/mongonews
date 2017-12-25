var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var NoteSchema = new Schema({
  // `title` must be of type String
  title: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var Note = mongoose.model("note", NoteSchema);

// Export the Note model
module.exports = Note;
