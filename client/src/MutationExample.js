import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import React, {Component} from 'react'

const addQuery = gql`
    mutation addVideo($id: ID!, $title: String!) {
        addVideo(id: $id, title: $title) {
            id
            title
        }
    }
`

const deleteQuery = gql`
    mutation deleteVideo($id: ID!) {
        deleteVideo(id: $id)
    }
`

const changeQuery = gql`
    mutation changeVideo($id: ID!, $title: String!) {
        changeVideo(id: $id, title: $title) {
            id
            title
        }
    }
`

class MutationExample extends Component {
    static defaultProps = {
        videoTitle: '',
        videoId: 0
    }

    state = {
        videoId: this.props.videoId,
        videoTitle: this.props.videoTitle
    }

    static propTypes = {
        //mutate: React.PropTypes.func.isRequired
        addQuery: React.PropTypes.func,
        deleteQuery: React.PropTypes.func,
        changeQuery: React.PropTypes.func
    }

    _setVideoTitle = evt => {
        this.setState({
            videoTitle: evt.target.value
        })
    }

    _setVideoId = evt => {
        this.setState({
            videoId: evt.target.value
        })
    }

    _deleteVideo = () => {
        this.props
            .deleteQuery({
                variables: {id: this.state.videoId},
                refetchQueries: [
                    {
                        query: gql`
                            query {
                                videos {
                                    id
                                }
                            }
                        `
                    }
                ]
            })
            .then(data => data)
            .catch(error => console.log(error))
    }

    _changeVideo = () => {
        this.props
            .changeQuery({  //no need for updating cache, we change sth that already exists
                variables: {id: this.state.videoId, title: this.state.videoTitle}
            })
            .then(data => data)
            .catch(error => console.log(error))
    }

    _addVideo = () =>
        this.props
            .addQuery({
                variables: {id: this.state.videoId, title: this.state.videoTitle},
                // updateQueries: {
                //     getVideos: (prev, {mutationResult}) => {
                //         const addedVideo = mutationResult.data.addVideo
                //
                //         return prev.videos.find(el => el.id == addedVideo.id) ?
                //             prev :
                //             Object.assign({}, prev, {videos: prev.videos.concat(addedVideo)})
                //     },
                // }
            })
            .then(data => data)
            .catch(error => console.log(error))

    render() {
        return (
            <div>
                <div>
                    <input type="number" onChange={this._setVideoId} value={this.state.videoId}/>
                    <input type="text" onChange={this._setVideoTitle} value={this.state.videoTitle}/>
                </div>

                <button onClick={this._addVideo}>add</button>
                <button onClick={this._changeVideo}>change</button>
                <button onClick={this._deleteVideo}>delete</button>
            </div>
        )
    }
}

export default compose(
    graphql(addQuery, {name: 'addQuery'}),
    graphql(deleteQuery, {name: 'deleteQuery'}),
    graphql(changeQuery, {name: 'changeQuery'})
)(MutationExample)
