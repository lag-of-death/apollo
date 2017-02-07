const R          = require('ramda')
const reduxStore = require('../in-memory-store')

module.exports = {

    Mutation: {
        deleteVideo: (_, {id}) => {
            reduxStore.dispatch({type: 'DEL', payload: id})

            return id
        },

        changeVideo: (_, {id, title}) => {
            reduxStore.dispatch({type: 'CHANGE', payload: {id, title}})

            return reduxStore.getState().find(el => el.id == id)
        },

        addVideo: (_, {id, title}) => {
            reduxStore.dispatch({type: 'ADD', payload: {id, title}})

            return reduxStore.getState().find(el => el.id == id)
        }
    },

    Subscription: {
        videoAdded: (fromPublish, fromClient) => {
            return fromPublish
        }
    },

    Query: {
        video: (a, criteriaSpecs) => {

            return reduxStore
                .getState()
                .find(elem => elem.id == criteriaSpecs.id)
        },

        videos: () => {
            return reduxStore.getState()
        }
    }
}
