import SubscriptionExample from './SubscriptionExample'
import HybridExample from './HybridExample'
import QueryEntitiesExample from './QueryEntitiesExample'
import MutationExample from './MutationExample'
import {
    Example as QueryEntityExample,
    ExampleWithPolling as QueryEntityExampleWithPolling
} from './QueryEntityExample'

import React from 'react'
import ReactDOM from 'react-dom'

import {ApolloProvider} from 'react-apollo'
import {Client} from 'subscriptions-transport-ws'
import {addGraphQLSubscriptions} from 'vue-apollo'
import ApolloClient, {createNetworkInterface} from 'apollo-client'

const wsClient = new Client('ws://localhost:8081')

const networkInterface = createNetworkInterface({
    uri: 'http://localhost:7777/graphql',
    opts: {
        credentials: 'same-origin',
    },
})

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
    networkInterface,
    wsClient
)

const client = new ApolloClient({
    dataIdFromObject(obj) {
        return obj.id
    },
    networkInterface: networkInterfaceWithSubscriptions,
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <div>
            <QueryEntityExample title="lol" id={10}/>
            {/*<QueryEntityExampleWithPolling videoId={33} pollInterval={10000}/>*/}
            {/*<QueryEntitiesExample />*/}
            {/*<MutationExample />*/}
            {/*<HybridExample videoId={0} pollInterval={5000}/>*/}
            {/*<SubscriptionExample />*/}
        </div>
    </ApolloProvider>,
    document.getElementById('root')
)


