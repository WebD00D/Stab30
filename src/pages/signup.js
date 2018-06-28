import React from 'react'
import { Link, withPrefix } from 'gatsby-link'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import Hero from '../components/hero'
import ArticlePreview from '../components/article-preview'
import { connect } from 'react-redux'
import _ from 'lodash'

import Navigation from '../components/navigation'
import PeopleList from '../components/PeopleList'

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this._handleChange = this._handleChange.bind(this)
    this._handleFormSubmission = this._handleFormSubmission.bind(this)
    this._resetForm = this._resetForm.bind(this)

    this.emailRef
    this.phoneRef

    this.state = {
      email: '',
      phone: '',
      message: '',
      checked: true
    }
  }

  componentDidMount() {
    const pageParent = document.getElementsByClassName('blog-page__parent')[0]
    pageParent.style.height = '100vh'

    const postWrapper = document.getElementsByClassName('post-wrapper')[0]
    postWrapper.style.backgroundColor = '#FFFFFF'
    postWrapper.style.marginTop = '0px'
  }

  _resetForm() {
    this.phoneRef.value = ''
    this.emailRef.value = ''

    this.setState({
      email: '',
      phone: '',
      message: '',
    })
  }

  _handleFormSubmission() {
    const env = 'PROD' // PROD
    let base =
      env === 'DEV'
        ? 'http://localhost:8082'
        : 'https://stabnewsletter-api.herokuapp.com'

    const url = `${base}/get-audio-link?phone=${this.state.phone}&email=${
      this.state.email
    }`

    fetch(url)
      .then(function(response) {
        return response
      })
      .then(
        function() {
          this.setState({
            message: 'Email Added!',
          })
        }.bind(this)
      )
  }

  _handleChange(value, field) {
    switch (field) {
      case 'email':
        this.setState({
          email: value,
        })
        break
      case 'phone':
        this.setState({
          phone: value,
        })
        break
      default:
        break
    }
  }

  render() {
    return (
      <div>
        <Helmet title="Stab x Agenda's 30 Under 30" />

        <div className="blog-page__parent">
          <div
            className="post-wrapper m-t-130-mb"
            style={{ marginLeft: '0px' }}
          >
            <div className="post-padding post-alignment">
            

              <div className="sponsored-logos">
             <img
                className="log logo-signup--stab"
                src={withPrefix('images/stab30.png')}
                alt="Logo"
              />
              <div className="t-mono presented-by">PRESENTED BY </div>
             
              <img
                className="log logo-signup--agenda"
                src={withPrefix('images/agenda.png')}
                alt="Logo"
              />
              </div>

              <div className="blog-post__words t-mono">
                <p>
                  Enter your email address and phone number to get the Stab30
                  Audio link sent to your phone.
                </p>
                <h4 className="fc-pink">Email</h4>
                <div className="search-box">
                  <input
                    onChange={e => {
                      this._handleChange(e.target.value, 'email')
                    }}
                    ref={ref => (this.emailRef = ref)}
                    type="text"
                    placeholder="..."
                  />
                  <img
                    className="icon-sm"
                    src={withPrefix('images/icons/email.png')}
                    alt="Logo"
                  />
                </div>
                <h4 className="fc-pink">Phone</h4>
                <div className="search-box">
                  <input
                    onChange={e => {
                      this._handleChange(e.target.value, 'phone')
                    }}
                    ref={ref => (this.phoneRef = ref)}
                    type="number"
                    placeholder="..."
                  />
                  <img
                    className="icon-sm"
                    src={withPrefix('images/icons/phone.png')}
                    alt="Logo"
                  />
                </div>

                <div className="m-b-22">
                <input onChange={()=> this.setState({ checked: !this.state.checked })} className="styled-checkbox" id="styled-checkbox-2" type="checkbox" value="value2" checked={this.state.checked} />
                 <label htmlFor="styled-checkbox-2">Stay current with Stab news, events, and more by signing up for our newsletter</label>
                </div>

                <div>
                  {' '}
                  <button
                    onClick={() => this._handleFormSubmission()}
                    className="submit-btn"
                  >
                    Submit
                  </button>
                </div>

                <div>
                  {' '}
                  <button
                    onClick={() => this._resetForm()}
                    className="clear-form"
                  >
                    Reset Form
                  </button>
                </div>
                <div className="t-mono fc-pink m-t-22">
                  {this.state.message}
                </div>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
