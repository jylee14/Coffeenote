const mongoose = require('mongoose')

const beanSchema = new mongoose.Schema({
  roastDate: {
    type: Date,
    required: true
  },
  origin: {
    type: String,
    required: true
  }
})

beanSchema.set('toJSON', {
  transform: (doc, obj) => {
    obj.id = obj._id.toString()
    delete obj._id
    delete obj.__v
  }
})

module.exports = new mongoose.model('Bean', beanSchema)