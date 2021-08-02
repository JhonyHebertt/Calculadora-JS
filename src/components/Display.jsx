import React from 'react'
import './Display.css'

//export default props => <div className="display">{props.value}</div>

export default function Display(props) {
    return <div className="display"> {props.value} </div>
}