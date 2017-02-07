import React from 'react'
import R from 'ramda'

export function showNames({videos}) {
    return (
        <ul>
            {videos.map(video => <li key={video.id}>{video.id} : {video.title}</li>)}
        </ul>
    )
}

export default function renderState(data, prop, show) {
    return R.cond([

        [R.prop('loading'), showLoadingIndicator],
        [R.prop('error'), showError],
        [R.prop(prop), show],

        [R.T, R.always('no data')]

    ])(data)
}

function showLoadingIndicator() {
    return <div>Loading...</div>;
}

function showError({error}) {
    return <div>{error}</div>;
}