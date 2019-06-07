import React from 'react'
import Core from './components/Core'
import './assests/main.css'
import './assests/background.png'
import music from './assests/music.mp3'

class App extends React.Component {
    render() {
        return(
            <div>
                <Core/>

                <audio autoPlay loop>
                    <source src={music}/>
                </audio>
            </div>

        )
    }
}

export default App