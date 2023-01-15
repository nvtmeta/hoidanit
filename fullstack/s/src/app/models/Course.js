const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Course = new Schema({
  name:{type: String, maxLength:200},
  description:{type : String,maxLength:200} ,
  image:{type : String,maxLength:200} ,
  createdAt :{type : Date, default: Date.now},
  updatedAt :{type : Date, default: Date.now}
 
});
module.exports = mongoose.model("courses" , Course)