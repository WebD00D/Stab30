import React from 'react'
import { Link, withPrefix } from 'gatsby-link'
import { connect } from 'react-redux'

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)

    this._togglePlay = this._togglePlay.bind(this)
  }
  //
  // componentDidMount() {
  //
  //   console.log("PLAY AUDIO??", this.props.AudioPlaying)
  //
  //   let audio = document.getElementById('audio')
  //   if ( this.props.AudioPlaying ){
  //     audio.play()
  //   }
  //
  //
  // }

  componentDidMount() {
    console.log('Component Will Mount', this.props.AudioPlaying)

    let audio = document.getElementById('audio')

    if (this.props.AudioPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // if (nextState.open == true && this.state.open == false) {
    //   this.props.onWillOpen();
    // }
    console.log('COMPOENET WILL UPDATE', nextProps.AudioPlaying)

    let audio = document.getElementById('audio')


    if (nextProps.AudioPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  _togglePlay() {
    let audio = document.getElementById('audio')

    if (this.props.AudioPlaying) {
      audio.pause()
    } else {
      audio.play()
    }

    this.props.togglePlay()
  }

  render() {
    return (
      <div className="article-preview stab30Player">
        <div className="article-preview__overlay" />
        <div
          className="article-preview__image"
          style={{ backgroundImage: `url(${this.props.AudioPlayerImageURL})` }}
        />
        <div className="article-preview__content">
          <div className="fx-row">
            <div className="w-40p fc-white t-mono fw-700 f-12">
              {this.props.AudioPlayerPersonRank}
            </div>
            <div className="fc-white t-upper ls-2 t-mono fw-700 f-12 m-r-12">
              {this.props.AudioPlayerTitle}
              <audio id="audio">
                <source src={this.props.AudioPlayerFile} />
              </audio>
            </div>
          </div>

          <div
            onClick={() => this._togglePlay()}
            className="w-40p fx-end hover"
          >
            {this.props.AudioPlaying ? (
              <img
                className="icon-lg"
                src={withPrefix('images/icons/pause.png')}
                alt="PLAY"
              />
            ) : (
              <img
                className="icon-lg"
                src={withPrefix('images/icons/play-button.png')}
                alt="PAUSE"
              />
            )}
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
}) => {
  return {
    count,
    AudioPlayerFile,
    AudioPlaying,
    AudioPlayerImageURL,
    AudioPlayerTitle,
    AudioPlayerPersonRank,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCount: () =>
      dispatch({
        type: `INCREMENT`,
      }),
    togglePlay: () =>
      dispatch({
        type: `TOGGLE_PLAY`,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)
