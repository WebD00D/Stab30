import React from 'react'
import { Link, withPrefix } from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import { connect } from 'react-redux'
import _ from 'lodash'

class PeopleList extends React.Component {
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
    const posts = this.props.people

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

    let orderedList = _.sortBy(filtered, ['rank'])

    this.setState({
      filteredPosts: orderedList,
    })
  }

  render() {
    const posts = this.props.people

    return (
      <div>
        <div className="page-wrap">
          <div className="container">
            <div className="search-box">
              <input
                onChange={e => {
                  this._handleChange(e.target.value)
                }}
                type="text"
                placeholder="..."
              />
              <img
                className="icon-sm"
                src={withPrefix('images/icons/icon-search.png')}
                alt="Logo"
              />
            </div>
          </div>

          <div className="people-list-wrap">
            {this.state.filteredPosts.map(({ node }, idx) => {
              let formattedIdx = node.rank < 10 ? `0${node.rank}` : node.rank

              return (
                <div className="container article-container" key={node.slug}>
                  <ArticlePreview
                    article={node}
                    nonFormattedIdx={idx}
                    idx={formattedIdx}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ count }) => {
  return { count }
}

const mapDispatchToProps = dispatch => {
  return {
    increaseCount: () =>
      dispatch({
        type: `INCREMENT`,
      }),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PeopleList)
