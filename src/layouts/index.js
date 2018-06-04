import React from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'

import './base.css';

import Container from '../components/container'
import Navigation from '../components/navigation'
import AudioPlayer from "../components/audioPlayer";



class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header
    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <div>
        <Navigation />
        {children()}
        {this.props.AudioPlayerFile ? <AudioPlayer /> : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(Template)
