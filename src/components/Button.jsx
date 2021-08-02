import React from 'react'
import './Button.css'

//export default props => {
export default function Button(props) {
    let classes = 'button '

    classes += props.sinal ? 'sinal' : ''
    classes += props.double ? 'double' : ''
    classes += props.triple ? 'triple' : ''

    return (                        //verifica se existe a props "função" pra depois chamar ela
        <button className={classes} onClick={e => props.funcao && props.funcao(props.label)} >
            {props.label}
        </button>
    )
}