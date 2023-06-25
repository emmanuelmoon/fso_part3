const mongoose = require("mongoose");

const url = process.env.url;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.log("Connection failed", error);
  });

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

phonebookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", phonebookSchema);
