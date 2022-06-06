import React from 'react'

export default function Die(props) {

  const styles={
        backgroundColor:props.select ? 'blue':'white'
    }
    return (
        <div className="die-face" style={styles} onClick={props.changeColor}>
            <h2>{props.value} </h2>

            
        </div>
    )
}
