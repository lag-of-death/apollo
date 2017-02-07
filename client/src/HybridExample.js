import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

import MutationExample from './MutationExample'

const query = gql`
    query getVideo($id: ID) {
        video(id: $id) {
            title
            id
        }
    }
`

export default graphql(query, {
    options(ownProps) {
        return {
            variables: {
                id: ownProps.videoId
            },
            pollInterval: ownProps.pollInterval
        }
    }
})(MutationExample)