import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import React, {Component} from 'react'
import renderState, {showNames} from './common/renderState'

const query = gql`query getVideos{
  videos {
    id, title
  }
}`

class QueryExample extends Component {
    static propTypes = {
        data: React.PropTypes.shape({
            loading: React.PropTypes.bool.isRequired,
            error: React.PropTypes.object,
            videos: React.PropTypes.array,
        }).isRequired
    }

    render() {
        return (
            <div>
                <div>{renderState(this.props.data, 'videos', showNames)}</div>
            </div>
        )
    }
}

export default graphql(query)(QueryExample)