const { buildSchema } = require('graphql')

module.exports = buildSchema(`

    type Meeting {
        _id: ID!
        topic: String!
        description: String!
        duration: Int!
        createdAt: String!
        updatedAt: String!
    }

    type GetMeetingData {
        meeting: [Meeting!]!
        total: Int!
    }

    input AddMeetingData {
        topic: String!
        description: String!
        duration: Int!
    }

    type RootMutation {
        addMeeting(meetingData: AddMeetingData): Meeting!
        updateMeeting(id: ID!, meetingInput: AddMeetingData): Meeting!
        deleteMeeting(id: ID!): Boolean
    }

    type RootQuery {
        getMeeting: GetMeetingData!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`)
