import React from 'react'
import dragon from '../assests/dragon.png'
import player from '../assests/character.png'

class Core extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timer: 10000,
            score: 0,
            letters: ['a', 'b', 'c'],
            level: 1,
            failed: false,
            complete: false,
            start: false,
            page: 0
        }
    }

    componentDidMount() {
        let canvas = this.refs.canvas
        this.ctx = canvas.getContext("2d");

        this.listener()
        this.startScreen()
    }

    listener() {
        let self = this

        window.addEventListener("keypress", function (event) {

            // Player win level
            if (self.state.letters.length === 1) {
                self.setState({
                    level: self.state.level + 1,
                    complete: true
                })

                self.refreshScreen()
            }

            // Checks key press and updates score
            if (self.state.letters.includes(event.key) && self.state.failed === false) {

                let index = self.state.letters.indexOf(event.key)
                self.state.letters.splice(index, 1)

                self.setState({
                    score: self.state.score + 10
                })

                self.refreshScreen()

            } else if (!self.state.letters.includes(event.key) && self.state.complete === false && event.key !== '.' && event.code !== 'Space') {
                console.log(event.key)
                self.setState({
                    score: self.state.score - 10
                })

                self.refreshScreen()
            }

            // Continues to text round
            if (event.key === '.' && self.state.complete === true && self.state.failed === false) {
                self.state.complete = false

                clearInterval(self.timerLoop)
                self.startTimer()
                self.update_letter()
                self.refreshScreen()
            }

            // Game screen start
            if (event.code === 'Space' && self.state.page === 0) {
                self.setState({
                    start: true,
                    page: 1
                })

                self.clearScreen()
                self.gameScreen()
                self.startTimer()
            }
        })
    }

    clearScreen() {
        this.ctx.clearRect(0, 0, 1024, 600);
    }

    refreshScreen() {
        this.clearScreen()
        this.gameScreen()
    }

    showUpdate() {
        this.ctx.font = "20px Courier"
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "right"
        this.ctx.fillText(`++ gelplad`, 10, 50)
    }

    startScreen() {
        this.ctx.font = "40px Courier"
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText('KEYBOARD HERO', 512, 200)

        this.ctx.fillStyle = "blue";
        this.ctx.fillText('PRESS SPACE TO PLAY', 512, 300)
    }

    gameScreen() {
        this.scoreAssest()

        this.ctx.beginPath();
        this.ctx.strokeStyle = "#ffffff"
        this.ctx.lineWidth = 10
        this.ctx.rect(0, 505, 1024, 100);
        this.ctx.stroke();

        this.spawnLetters()

        let dragon = this.refs.dragon
        this.ctx.drawImage(dragon, 680, 100, 500, 400);

        let player = this.refs.player
        this.ctx.drawImage(player, 225, 400, 125, 100);

        this.ctx.font = "20px Courier"
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "right"
        this.ctx.fillText("Press '>' to continue", 1015, 540)

    }

    scoreAssest() {
        this.ctx.font = "20px Courier"
        this.ctx.fillStyle = "white"
        this.ctx.textAlign = "right"
        this.ctx.fillText(`Score: ${this.state.score}`, 1018, 30)
        this.ctx.textAlign = "left"
        this.ctx.fillText(`Level: ${this.state.level}`, 10, 30)
    }

    spawnLetters() {
        let self = this

        let counter = 100
        this.state.letters.forEach(function (item, index) {
            let x = Math.floor(Math.random() * (500 - 10 + 1)) + 10
            let y = Math.floor(Math.random() * (400 - 10 + 1)) + 10

            counter += 50

            self.ctx.beginPath();
            self.ctx.fillStyle = "rgb(200,0,0)";
            self.ctx.arc(x, y, 32/2, 0, 2 * Math.PI, false);
            self.ctx.fill();

            self.ctx.fillStyle = 'white';
            self.ctx.textAlign = 'center';
            self.ctx.font = "30px Courier"
            self.ctx.fillText(item, x, y+6);
        });

    }

    startTimer() {
        this.timerLoop = setInterval(
            () => this.checkStatus(),
            10000
        )
    }

    checkStatus() {
        if (this.state.letters.length !== 0) {
            this.setState({
                failed: true
            })

            clearInterval(this.timerLoop)
        }
    }

    calLetters(level) {
        if (level > 2) {
            return level + Math.floor(Math.random() * 3) + 1
        } else {
            return level + 1
        }
    }

    update_letter() {
        const keys = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']

        let next_letters = []

        let i = 0

        let nextAmount = this.calLetters(this.state.level)

        for (i = 0; i < nextAmount; i++) {
            const next_letter = keys[Math.floor(Math.random() * keys.length)]
            next_letters.push(next_letter)
        }

        this.setState({
            letters: next_letters
        });
    }

    render() {
        let failed;
        let game;
        let continue_;

        if (this.state.failed) {
            this.clearScreen()
            this.scoreAssest()

            this.ctx.font = "40px Courier"
            this.ctx.fillStyle = "red";
            this.ctx.textAlign = "center";
            this.ctx.fillText('GAME OVER', 512, 300)
        }

        return (
            <div>
                <canvas ref="canvas" width={1024} height={600} />
                <img ref="dragon" src={dragon} style={{display: 'none'}}/>
                <img ref="player" src={player} style={{display: 'none'}}/>
            </div>
        )
    }
}

export default Core