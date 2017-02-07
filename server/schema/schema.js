module.exports = `
enum Rating {
    GOOD
    BAD
}

type Actor {
    name: String
}

type Video {
    id: ID,
    title: String,
    rating: Rating,
    actors: [Actor]
}

type Mutation {
    deleteVideo(id: ID!): ID
    changeVideo(id: ID!, title: String!): Video
    addVideo(id: ID!, title: String!): Video
}

type Query {
    video: Video
    video(id: ID, actor: String): Video
    videos: [Video]
}

type Subscription {
    videoAdded: Video
}

schema {
    mutation: Mutation
    query: Query
    subscription: Subscription
}
`
