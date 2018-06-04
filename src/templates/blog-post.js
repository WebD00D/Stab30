import React from 'react'
import Helmet from 'react-helmet'
import Link, { withPrefix } from 'gatsby-link'
import get from 'lodash/get'
import styles from './blog-post.module.css'
import { connect } from 'react-redux'

class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)

    this._togglePlay = this._togglePlay.bind(this)

    this.state = {
      playing: false,
    }

  }

  _togglePlay() {
    const post = get(this.props, 'data.contentfulBlogPost')

    this.setState({
      playing: !this.state.playing
    })

    let formattedRank = post.rank < 10 ? `0${post.rank}` : post.rank

    this.props.togglePlay()
    this.props.setAudio(
      'https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/wwy.mp3',
      post.title,
      post.heroImage.file.url,
      formattedRank
    )
  }

  componentDidMount() {

    const post = get(this.props, 'data.contentfulBlogPost')

    if ( this.props.AudioPlayerTitle === post.title  ) {
      this.setState({
        playing: true
      })
    }

  }

  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    console.log(post)

    let formattedRank = post.rank < 10 ? `0${post.rank}` : post.rank

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
                onClick={() => { this._togglePlay() } }
                className="play-box hover"
              >
                {this.state.playing ? (
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
    setAudio: (file, title, image, rank) =>
      dispatch({
        type: `SET_AUDIO`,
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
