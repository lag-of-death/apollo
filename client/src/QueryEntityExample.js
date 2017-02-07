import gql from 'graphql-tag'
import {graphql} from 'react-apollo'
import React, {Component} from 'react'
import renderState from './common/renderState'

const fragments = {
    video: gql`
        fragment VideoId on Video {
            id
        }
    `
}

const query = gql`
    query getVideo($id: ID) {
        video(id: $id) {
            title
            ... VideoId
        }
    }
    ${fragments.video}  
`

class QueryExample extends Component {
    static propTypes = {
        data: React.PropTypes.shape({
            loading: React.PropTypes.bool.isRequired,
            error: React.PropTypes.object,
            video: React.PropTypes.object,
        }).isRequired
    }

    state = {
        videoId: this.props.videoId
    }

    _setVideoId = evt => {
        this.setState({videoId: evt.target.value})
    }

    _fetch = () => {
        this.props.data.refetch({id: this.state.videoId})
    }

    render() {
        return (
            <div>
                <input
                    onChange={this._setVideoId}
                    type="number"
                    value={this.state.videoId}/>
                <button onClick={this._fetch}>fetch</button>

                <div>{renderState(this.props.data, 'video', showName)}</div>
            </div>
        )
    }
}

export const Example = graphql(query)(QueryExample)





export const ExampleWithPolling = graphql(query, {
    options(ownProps) {
        return {
            variables: {
                id: ownProps.videoId
            },
            pollInterval: ownProps.pollInterval
        }
    }
})(QueryExample)

function showName({video}) {
    return <div>Video title: {video.title}</div>;
}