const {SubscriptionManager} = require('graphql-subscriptions')
const schema                = require('./schema')
const R                     = require('ramda')
const pubsub                = require('./pubsub')

module.exports = new SubscriptionManager({
    schema,
    pubsub,
    setupFunctions: {
        videoAdded: (options, args) => ({
            videoAddedChannel: {
                filter: videoFromPublish => {
                    return true;
                }
            },

            someOtherChannel: {
                filter: R.always(true)
            }
        })

    },
})
