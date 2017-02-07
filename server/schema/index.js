const R                      = require('ramda')
const schema                 = require('./schema')
const pubsub                 = require('../pubsub')
const resolvers              = require('./resolvers')
const {makeExecutableSchema} = require('graphql-tools')

const lens = R.lensPath(['Mutation', 'addVideo'])

module.exports = makeExecutableSchema({
    typeDefs: [schema],
    resolvers: R.set(
        lens,
        R.compose(R.tap(publish), resolvers.Mutation.addVideo),
        resolvers
    )
})

function publish(newVideo) {
    pubsub.publish('someOtherChannel', newVideo);
}
