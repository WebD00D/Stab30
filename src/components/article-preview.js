import React from 'react'
import Link, { withPrefix } from 'gatsby-link'
import { connect } from 'react-redux'

class ArticlePreview extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      linkURL: ''
    }
  }

  componentDidMount() {
    let linkURL = window.innerWidth > 899 ? `/list/${this.props.article.slug}#${this.props.article.rank}` : `/list/${this.props.article.slug}`
    this.setState({
      linkURL
    })
  }

  render() {
    let myIndex = this.props.nonFormattedIdx
    let activeIndex = this.props.activeIndex

    let previewClassName =
      myIndex === activeIndex
        ? 'article-preview article-preview--active'
        : 'article-preview';



    return (
      <Link id={this.props.article.rank} to={this.state.linkURL} className={previewClassName}>
        <div className="article-preview__overlay" />
        <div
          className="article-preview__image"
          style={{
            backgroundImage: `url(${this.props.article.heroImage.file.url})`,
          }}
        />
        <div className="article-preview__content">
          <div className="fx-row">
            <div className="w-40p fc-pink t-mono fw-700 f-12 ">
              {this.props.idx === "01" ? this.props.idx : ""}
            </div>
            <div className="fc-pink t-upper ls-2 t-mono fw-700 f-12 ">
              {this.props.article.title}
            </div>
          </div>

          <div className="w-40p fx-end">
            <img
              className="icon-sm"
              src={withPrefix('images/icons/arrow-right-purple.png')}
              alt="Logo"
            />
          </div>
        </div>
      </Link>
    )
  }
}

const mapStateToProps = ({ count, activeIndex }) => {
  return { count, activeIndex }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCount: () =>
      dispatch({
        type: `INCREMENT`,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePreview)
