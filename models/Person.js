const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "waiter"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  console.log("Pre-save hook triggered for:", this.username);
  //we need to hash the password only if it is modified (or is New)
  if (!person.isModified("password")) return next();

  console.log("Is password modified?", person.isModified("password"));
  console.log("Current password before hashing:", person.password); // Debug log

  try {
    //hash password generation
    const salt = await bcrypt.genSalt(10);
    //hash password
    const hashPassword = await bcrypt.hash(person.password, salt);
    //overrided the normal password with the hash password

    console.log("Generated Salt:", salt); // Debug log
    //console.log("Hashed Password:", hashPassword); // Debug log
    person.password = hashPassword;
    console.log("Hashed Password:", person.password);

    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//create person model
const Person = mongoose.model("Person", personSchema);

module.exports = Person;

// async function foo(){
//   console.log('1');
//   await console.log('2')
//   console.log('3');
// }
// console.log('4');
// foo();
// console.log('5');
