import React from 'react'
import Helmet from 'react-helmet'
import  Link, { withPrefix } from 'gatsby-link'
import get from 'lodash/get'
import styles from './blog-post.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    console.log(post)

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
              <div className="post__header-img__overlay"></div>
              <div className="play-box">
              <img
                className="play-box-icon"
                src={withPrefix('images/icons/play-white.png')}
                alt="Logo"
              />
              </div>
            </div>

            <h1 className="post-headline t-mono fc-blue t-upper fw-700 ls-2">{post.title}</h1>

            <div
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

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
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
