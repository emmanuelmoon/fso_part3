const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://emmenual123:${password}@cluster0.cbt0drp.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", phonebookSchema);

if (process.argv.length == 3) {
  Contact.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((contact) => {
      console.log(`${contact.name} ${contact.number}`);
    });
    mongoose.connection.close();
  });
} else if (process.argv.length == 5) {
  const contact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  });
  contact.save().then((result) => {
    console.log(`added ${contact.name} number ${contact.number} to phonebook`);
    mongoose.connection.close();
  });
}
