const validator = require('validator')

const Meeting = require('../models/Meeting')

module.exports = {
  addMeeting: async function ({ meetingData }, req) {
    const errors = []
    if (
      validator.isEmpty(meetingData.topic) ||
      !validator.isLength(meetingData.topic, { min: 3 })
    ) {
      errors.push({ message: 'Title is invalid' })
    }
    if (
      validator.isEmpty(meetingData.description) ||
      !validator.isLength(meetingData.description, { min: 3 })
    ) {
      errors.push({ message: 'Description should be more than 3 characters' })
    }
    if (validator.isEmpty(meetingData.description)) {
      errors.push({ message: 'Duration should not be empty' })
    }
    if (errors.length) {
      const error = new Error('Invalid input')
      error.data = errors
      error.code = 422
      throw error
    }

    const meet = await Meeting.create({
      topic: meetingData.topic,
      description: meetingData.description,
      duration: meetingData.duration
    })

    return {
      ...meet._doc,
      _id: meet._id.toString(),
      createdAt: meet.createdAt.toISOString(),
      updatedAt: meet.updatedAt.toISOString()
    }
  },

  getMeeting: async function (args, req) {
    try {
      const totalCount = await Meeting.find().countDocuments()
      const meeting = await Meeting.find().sort({ createdAt: -1 })
      // console.log(meetList)
      return {
        meeting: meeting.map((m) => {
          return {
            ...m._doc,
            _id: m._id.toString(),
            createdAt: m.createdAt.toISOString(),
            updatedAt: m.updatedAt.toISOString()
          }
        }),
        total: totalCount
      }
    } catch (err) {
      console.log(err.message)
    }
  },

  updateMeeting: async function ({ id, meetingInput }, req) {
    const meeting = await Meeting.findById(id)

    if (!meeting) {
      const error = new Error('No meeting found')
      error.code = 404
      throw error
    }

    const errors = []
    if (
      validator.isEmpty(meetingInput.topic) ||
      !validator.isLength(meetingInput.topic, { min: 3 })
    ) {
      errors.push({ message: 'Title is invalid' })
    }
    if (
      validator.isEmpty(meetingInput.description) ||
      !validator.isLength(meetingInput.description, { min: 3 })
    ) {
      errors.push({ message: 'Description should be more than 3 characters' })
    }
    if (validator.isEmpty(meetingInput.description)) {
      errors.push({ message: 'Duration should not be empty' })
    }
    if (errors.length) {
      const error = new Error('Invalid input')
      error.data = errors
      error.code = 422
      throw error
    }

    meeting.topic = meetingInput.topic
    meeting.description = meetingInput.description
    meeting.duration = meetingInput.duration

    const updatedMeeting = await meeting.save()

    return {
      ...updatedMeeting._doc,
      _id: updatedMeeting._id.toString(),
      createdAt: updatedMeeting.createdAt.toISOString(),
      updatedAt: updatedMeeting.updatedAt.toISOString()
    }
  },

  deleteMeeting: async function ({ id }, req) {
    await Meeting.findByIdAndRemove(id)
    return true
  }
}
