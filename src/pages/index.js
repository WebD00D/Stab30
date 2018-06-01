import React from 'react'
import { Link, withPrefix } from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'

import _ from 'lodash'

class RootIndex extends React.Component {
  constructor(props) {
    super(props)

    this._handleFiltering = this._handleFiltering.bind(this)
    this._handleChange = this._handleChange.bind(this)
    this._triggerChange = this._triggerChange.bind(this)

    this.state = {
      allPosts: [],
      filteredPosts: [],
    }
  }

  componentWillMount() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    this.timer = null

    this.setState({
      allPosts: posts,
      filteredPosts: posts,
      filterValue: '',
    })
  }

  _triggerChange() {}

  _handleChange(value) {
    clearTimeout(this.timer)

    this.setState({
      filterValue: value,
    })

    this.timer = setTimeout(this._handleFiltering, 500)
  }

  _handleFiltering() {
    let valueToFilterBy = this.state.filterValue.trim()
    let posts = this.state.allPosts

    let filtered = _.filter(posts, function(item) {
      let title = item.node.title.toUpperCase()
      return title.indexOf(valueToFilterBy.toUpperCase()) > -1
    })

    this.setState({
      filteredPosts: filtered,
    })
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    console.log(' POSTS OG ', posts)
    console.log('state posts', this.state.allPosts)
    console.log('state filterd posts', this.state.filteredPosts)

    return (
      <div>
        <Helmet title="Stab x Agenda's 30 Under 30" />
        <div className="page-wrap">
          <div className="container">
            <div className="search-box">
              <input
                onChange={e => {
                  this._handleChange(e.target.value)
                }}
                type="text"
                placeholder="Search for someone"
              />
              <img
                className="icon-sm"
                src={withPrefix('images/icons/icon-search.png')}
                alt="Logo"
              />
            </div>
          </div>

          {this.state.filteredPosts.map(({ node }, idx) => {
            let formattedIdx = idx < 10 ? `0${idx + 1}` : idx
            return (
              <div className="container" key={node.slug}>
                <ArticlePreview article={node} idx={formattedIdx} />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    allContentfulBlogPost(sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
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
