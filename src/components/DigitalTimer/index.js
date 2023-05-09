import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    date: new Date(),
    isTimerStarted: false,
    isTimerReset: false,
  }

  componentDidMount() {
    const {timerLimit, date} = this.state
    date.setMinutes(timerLimit)
    date.setSeconds(0)
    this.setState({date})
  }

  handleLimit = e => {
    const {date} = this.state
    if (e.target.id === 'decrease') {
      date.setMinutes(date.getMinutes() - 1)
      this.setState(prevState => ({timerLimit: prevState.timerLimit - 1, date}))
    } else {
      date.setMinutes(date.getMinutes() + 1)
      this.setState(prevState => ({timerLimit: prevState.timerLimit + 1, date}))
    }
  }

  startTimer = () => {
    const {date} = this.state
    if (date.getMinutes() === 0 && date.getSeconds() === 0) {
      date.setMinutes(25)
      date.setSeconds(0)
      this.setState({
        timerLimit: 25,
        date,
      })
    }
    this.setState({isTimerStarted: true, isTimerReset: true})
    this.timerId = setInterval(this.tick, 1000)
  }

  tick = () => {
    const {date} = this.state
    date.setSeconds(date.getSeconds() - 1)
    if (date.getMinutes() === 0 && date.getSeconds() === 0) {
      clearInterval(this.timerId)
      this.setState({
        isTimerStarted: false,
      })
    } else {
      this.setState({date})
    }
  }

  pauseTimer = () => {
    this.setState({isTimerStarted: false})
    clearInterval(this.timerId)
  }

  resetTimer = () => {
    clearInterval(this.timerId)
    const {date} = this.state
    date.setMinutes(25)
    date.setSeconds(0)
    this.setState({
      timerLimit: 25,
      date,
      isTimerStarted: false,
      isTimerReset: false,
    })
  }

  render() {
    const {timerLimit, isTimerStarted, date, isTimerReset} = this.state
    let minutes
    let seconds
    if (date.getMinutes() < 10) {
      minutes = `0${date.getMinutes()}`
    } else {
      minutes = date.getMinutes()
    }
    if (date.getSeconds() < 10) {
      seconds = `0${date.getSeconds()}`
    } else {
      seconds = date.getSeconds()
    }
    return (
      <div className="bg-container">
        <div className="outer-container">
          <h1 className="main-head">Digital Timer</h1>
          <div className="content-container">
            <div className="section-1">
              <div className="section-1-1">
                <h1 className="time-head">
                  {minutes}:{seconds}
                </h1>
                <p className="time-para">
                  {isTimerStarted ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="section-2">
              <div className="section-2-1">
                <div className="start-pause-btn-container">
                  {isTimerStarted ? (
                    <>
                      <button
                        className="play-pause-btn"
                        type="button"
                        onClick={this.pauseTimer}
                      >
                        <img
                          className="play-pause-img"
                          alt="pause icon"
                          src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                        />
                        <span className="pp-para">Pause</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="play-pause-btn"
                        type="button"
                        onClick={this.startTimer}
                      >
                        <img
                          className="play-pause-img"
                          alt="play icon"
                          src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                        />
                        <span className="pp-para">Start</span>
                      </button>
                    </>
                  )}
                </div>
                <div className="reset-btn-container">
                  <button
                    className="play-pause-btn"
                    type="button"
                    onClick={this.resetTimer}
                  >
                    <img
                      className="reset-img"
                      alt="reset icon"
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    />
                  </button>
                  <p className="pp-para">reset</p>
                </div>
              </div>
              <div className="section-2-2">
                <p className="set-timer-limit">Set Timer limit</p>

                <div className="timer-limit-container">
                  <button
                    className="increase-decrease-btn"
                    disabled={isTimerReset}
                    id="decrease"
                    type="button"
                    onClick={this.handleLimit}
                  >
                    -
                  </button>
                  <p className="timer-limit">{timerLimit}</p>
                  <button
                    className="increase-decrease-btn"
                    disabled={isTimerReset}
                    id="increase"
                    onClick={this.handleLimit}
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
