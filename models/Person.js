const mongoose = require("mongoose");

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
});

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
