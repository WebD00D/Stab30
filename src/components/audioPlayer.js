import React from 'react'
import { Link, withPrefix } from 'gatsby-link'
import { connect } from 'react-redux'

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)

    this._loadAudio = this._loadAudio.bind(this)
    this._handlePause = this._handlePause.bind(this)
    this._handleResume = this._handleResume.bind(this)
    this._handleTrackState = this._handleTrackState.bind(this)

    this.state = {
      currentTrackTitle: '',
    }
  }

  componentDidMount() {

    // Player is mounting for the first time due to a request
    // to play audio.  This should only happen once during usage,
    // or every new refreshed visit.
    this._loadAudio()

    this.setState({
      currentTrackTitle: this.props.AudioPlayerTitle,
    })
  }

  componentDidUpdate(nextProps, nextState) {

    if (this.state.currentTrackTitle != this.props.AudioPlayerTitle) {
      // LOAD NEW TRACK.. If What we've currently got, is
      // different then the track set in the redux store.
      this._loadAudio()
      this.setState({
        currentTrackTitle: this.props.AudioPlayerTitle,
      })

    }

    if (this.props.AudioPaused) {
      // Audio is playing, this current title. Let's pause it.
      this._handlePause()
    }

    if (
      !this.props.AudioPaused &&
      this.props.AudioPlaying &&
      this.state.currentTrackTitle === this.props.AudioPlayerTitle
    ) {
      this._handleResume()
    }

  }

  _loadAudio() {
    let audio = document.getElementById('audio')
    audio.load()
    audio.play()
  }

  _handlePause() {
    let audio = document.getElementById('audio')
    audio.pause()
  }

  _handleResume() {
    let audio = document.getElementById('audio')
    audio.play()
  }

  _handleTrackState() {
    if (this.props.AudioPlaying) {
      this.props.pauseAudio()
    } else {
      this.props.resumeAudio()
    }
  }

  render() {
    let PlayerIcon = this.props.AudioPlaying
      ? 'images/icons/pause.png'
      : 'images/icons/play-button.png'


      let audio = document.getElementById('audio')
      console.log("AUDIO", audio.duration)


    return (
      <div className="article-preview stab30Player">
        <div className="article-preview__overlay" />
        <div
          className="article-preview__image"
          style={{ backgroundImage: `url(${this.props.AudioPlayerImageURL})` }}
        />
        <div className="article-preview__content">
          <div className="fx-row">
            <div className="w-40p fc-white t-mono fw-700 f-12 f-18-dt">
              {this.props.AudioPlayerPersonRank}
            </div>
            <div className="fc-white t-upper ls-2 t-mono fw-700 f-12 m-r-12 f-18-dt">
              {this.props.AudioPlayerTitle}
              <audio loop id="audio">
                <source src={this.props.AudioPlayerFile} />
              </audio>
            </div>
          </div>

          <div
            onClick={() => this._handleTrackState()}
            className="w-40p fx-end hover"
          >
            <img
              className="icon-lg"
              src={withPrefix(`${PlayerIcon}`)}
              alt="PLAYER BTN"
            />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({
  count,
  AudioPlayerFile,
  AudioPlaying,
  AudioPlayerImageURL,
  AudioPlayerTitle,
  AudioPlayerPersonRank,
  AudioPaused,
}) => {
  return {
    count,
    AudioPlayerFile,
    AudioPlaying,
    AudioPlayerImageURL,
    AudioPlayerTitle,
    AudioPlayerPersonRank,
    AudioPaused,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCount: () =>
      dispatch({
        type: `INCREMENT`,
      }),
    pauseAudio: () => dispatch({ type: `PAUSE_AUDIO` }),
    resumeAudio: () => dispatch({ type: `RESUME_AUDIO` }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)
