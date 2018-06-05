import React from 'react'
import Helmet from 'react-helmet'
import Link, { withPrefix } from 'gatsby-link'
import get from 'lodash/get'
import styles from './blog-post.module.css'
import { connect } from 'react-redux'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    this._handlePlay = this._handlePlay.bind(this)

    this.state = {
      playing: false,
    }
  }

  _handlePlay() {
    const post = get(this.props, 'data.contentfulBlogPost')

    if (this.props.AudioPlayerTitle != post.title) {
      // Either no titleis set, or user is requesting a new title be played.
      let formattedRank = post.rank < 10 ? `0${post.rank}` : post.rank
      this.props.playNewAudio(
        post.audioFile,
        post.title,
        post.heroImage.file.url,
        formattedRank
      )
    }

    if (this.props.AudioPlaying && this.props.AudioPlayerTitle === post.title) {
      // Audio is playing, this current title. Let's pause it.
      this.props.pauseAudio()
    }

    if (this.props.AudioPaused && this.props.AudioPlayerTitle === post.title) {
      // This track was playing. It is paused now and the user wants to unpause it
      this.props.resumeAudio()
    }
  }

  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    let formattedRank = post.rank < 10 ? `0${post.rank}` : post.rank

    let PlayerIcon

    if (post.title === this.props.AudioPlayerTitle) {
      PlayerIcon = this.props.AudioPlaying
        ? 'images/icons/pause.png'
        : 'images/icons/play-button.png'
    } else {
      PlayerIcon = 'images/icons/play-button.png'
    }

    return (
      <div>
        <Helmet title={`${post.title}`} />
        <div className="post-wrapper">
          <div className="post-padding">
            <Link to="/">
              <img
                className="blog-post-back"
                src={withPrefix('images/icons/arrow-right-purple.png')}
                alt="Logo"
              />
            </Link>

            <div className="post__header-img__wrapper">
              <img src={post.heroImage.file.url} className="post__header-img" />
              <div className="post__header-img__overlay" />
              <div className="fc-pink t-mono fw-700 f-32 rank">
                {formattedRank}
              </div>

              <div
                onClick={() => this._handlePlay()}
                className="play-box hover"
              >
                <img
                  className="icon-lg"
                  src={withPrefix(`${PlayerIcon}`)}
                  alt="PAUSED"
                />
              </div>
            </div>

            <h1 className="post-headline t-mono fc-blue t-upper fw-700 ls-2">
              {post.title}
            </h1>
            <div className="t-mono fc-grey f-12">Words by {post.wordsBy}</div>

            <div
              className="blog-post__words t-serif"
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
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
  AudioPaused,
  AudioPlayerImageURL,
  AudioPlayerTitle,
  AudioPlayerPersonRank,
}) => {
  return {
    count,
    AudioPlayerFile,
    AudioPlaying,
    AudioPaused,
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

    pauseAudio: () => dispatch({ type: `PAUSE_AUDIO` }),

    resumeAudio: () => dispatch({ type: `RESUME_AUDIO` }),

    playNewAudio: (file, title, image, rank) =>
      dispatch({
        type: `PLAY_NEW_AUDIO`,
        file,
        title,
        image,
        rank,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogPostTemplate)

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      rank
      wordsBy
      audioFile
      heroImage {
        file {
          url
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
