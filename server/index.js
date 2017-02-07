const httpServer          = require('./http-server')
const pubsub              = require('./pubsub')
const subscriptionManager = require('./subscription-manager')

const server = require('subscriptions-transport-ws')

require('./express-server')

module.exports = new server.SubscriptionServer({subscriptionManager}, httpServer)

// publishToChannels()

function publishToChannels() {
    setInterval(() => {
        pubsub.publish('someOtherChannel', {title: 'A', id: Math.round(Math.random() * 100)});
    }, 3000)

    setInterval(() => {
        pubsub.publish('videoAddedChannel', {title: 'B', id: Math.round(Math.random() * 100)});
    }, 2000)
}
