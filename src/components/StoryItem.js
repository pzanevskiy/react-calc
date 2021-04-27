import React from 'react'

const StoryItem = props => {
    return (
        <div>
            {props.expression}={props.answer}
        </div>
    )
}

export default StoryItem