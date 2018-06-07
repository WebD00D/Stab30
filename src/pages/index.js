import React from 'react'
import { Link, withPrefix } from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'

import Navigation from '../components/navigation'
import PeopleList from '../components/PeopleList'

class RootIndex extends React.Component {
  constructor(props) {
    super(props)

    this._handleWindowResize = this._handleWindowResize.bind(this)

    this.state = {
      redirect: false,
    }
  }

  componentDidMount() {
    this._handleWindowResize()
    window.addEventListener('resize', this._handleWindowResize)
  }

  _handleWindowResize() {
    const isHomepage = location.pathname === withPrefix('/')

    if (isHomepage && window.innerWidth > 899) {
      this.setState({
        redirect: true,
      })
    }
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')

    if (this.state.redirect) {
      return <Redirect to="/list/1" />
    }

    return (
      <div>
        <Helmet title="Stab x Agenda's 30 Under 30" />
        <Navigation />
        <PeopleList people={posts} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(RootIndex)

export const pageQuery = graphql`
  query HomeQuery {
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
