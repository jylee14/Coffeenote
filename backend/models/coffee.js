const mongoose = require("mongoose")

const coffeeSchema = new mongoose.Schema({
  roastDate: {
    type: Date,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  brewMethod: {
    type: String,
    required: true
  },
  tasteRating: {
    type: Number,
    required: true
  },
  brewNotes: String,
  tasteNotes: String
})

coffeeSchema.set("toJSON", {
  transform: (doc, obj) => {
    obj.id = obj._id.toString() 
    delete obj._id
    delete obj.__v
  }
})

module.exports = new mongoose.model("Coffee", coffeeSchema)