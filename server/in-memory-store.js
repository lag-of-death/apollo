const R             = require('ramda')
const {createStore} = require('redux')

module.exports = createStore(reducer, [
    {id: 0, title: 'movie1', actors: [{name: 'John Lol'}], rating: 'GOOD'},
    {id: 1, title: 'movie2', actors: [{name: 'Tom Omg'}], rating: 'BAD'}
])

function reducer(state, action) {

    const type = action.type || 'DEFAULT'

    const getState = ({
            'DEL': () => {
                const without = state.findIndex(el => el.id == action.payload)

                return without >= 0 ? R.remove(without, 1, state) : state
            },

            'ADD': () => {
                return state.find(el => el.id == action.payload.id) ?
                    state :
                    state.concat(action.payload)
            },

            'CHANGE': () => {
                const toBeChanged = state.findIndex(el => el.id == action.payload.id)

                return toBeChanged >= 0 ? R.update(toBeChanged, action.payload, state) : state
            },

            'DEFAULT': R.always(state)
        })[type] || R.always(state)

    return getState()

}