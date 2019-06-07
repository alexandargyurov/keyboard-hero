import React from 'react'

function GameScreen(props) {
    return (
        <div>
            <div>
                {props.props.letters.map((value, index) => {
                    return <h2 key={index}>{value}</h2>
                })}

                <h3>Score: {props.props.score}</h3>
                <h3>Level: {props.props.level}</h3>
            </div>
        </div>
    )
}

export default GameScreen