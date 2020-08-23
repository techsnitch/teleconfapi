const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    duration: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Meeting', meetingSchema)
