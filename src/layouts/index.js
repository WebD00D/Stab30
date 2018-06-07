import React from 'react'
import Link from 'gatsby-link'
import { connect } from 'react-redux'
import get from 'lodash/get'

import './base.css'

import Container from '../components/container'
import AudioPlayer from '../components/audioPlayer'

class Template extends React.Component {
  componentDidMount() {
    const firstPost = get(this, 'props.data.allContentfulBlogPost.edges')[0]
      .node

    this.props.setInitialAudio(
      firstPost.audioFile,
      firstPost.title,
      firstPost.heroImage.file.url,
      firstPost.rank
    )
  }

  render() {
    const { location, children } = this.props
    let header
    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <div>
        {children()}
        {this.props.AudioPlayerFile ? <AudioPlayer /> : ''}
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
    setInitialAudio: (file, title, image, rank) =>
      dispatch({
        type: `SET_INITIAL_AUDIO`,
        file,
        title,
        image,
        rank,
      }),
    togglePlay: () =>
      dispatch({
        type: `TOGGLE_PLAY`,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Template)

export const pageQuery = graphql`
  query InitialLoadQuery {
    allContentfulBlogPost(sort: { fields: [rank], order: ASC }) {
      edges {
        node {
          title
          slug
          rank
          audioFile
          heroImage {
            file {
              url
            }
          }
          description {
            childMarkdownRemark {
              html
            }
          }
        }
      }
    }
  }
`
