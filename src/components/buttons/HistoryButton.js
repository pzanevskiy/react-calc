import React from 'react'
import './Button.css'

const HistoryButton = props => {
    return(
        <div className="btn width-ultra" onClick={()=>props.onClick()}>
           {props.value}
        </div>
    )
}

export default HistoryButton