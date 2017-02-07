import gql from 'graphql-tag'
import React, {Component} from 'react'
import {withApollo, graphql, compose} from 'react-apollo';
import renderState, {showNames} from './common/renderState'

const unfitQuery = gql`query getVideo{
  video(id: 1) {
    id, title
  }
}`

const query = gql`query getVideos{
  videos {
    id, title
  }
}`

const subscription = gql`
    subscription videoAdded {
        videoAdded {
            id
            title
        }
    }
`

class SubscriptionExample extends Component {

    static propTypes = {
        client: React.PropTypes.object,
        data: React.PropTypes.object
    }

    componentDidMount() {
        const that = this

        this.props.client
            .subscribe({
                query: subscription
            })
            .subscribe({
                next(data) {
                    console.log(data)

                    that.props.data.updateQuery(prev => {
                        const addedVideo = data.videoAdded

                        return prev.videos.find(el => el.id == addedVideo.id) ?
                            prev :
                            Object.assign({}, prev, {videos: prev.videos.concat(addedVideo)})
                    })

                },
                error(err) {
                    console.error('err', err)
                }
            })
    }

    render() {
        return <div>{renderState(this.props.data, 'videos', showNames)}</div>
    }

}

export default compose(
    graphql(subscription),
    graphql(query),
    withApollo
)(SubscriptionExample)