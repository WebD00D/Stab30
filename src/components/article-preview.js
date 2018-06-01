import React from 'react'
import Link , { withPrefix } from 'gatsby-link'

// <p
//   dangerouslySetInnerHTML={{
//     __html: article.description.childMarkdownRemark.html,
//   }}
// />

export default ({ article, idx }) => (
  <Link to={`/list/${article.slug}`} className="article-preview">
    <div className="article-preview__overlay"></div>
    <div
      className="article-preview__image"
      style={{ backgroundImage: `url(${article.heroImage.file.url})` }}
    />
    <div  className="article-preview__content">

      <div className="fx-row">
        <div className="w-40p fc-pink t-mono fw-700 f-12">{idx}</div>
        <div className="fc-blue t-upper ls-2 t-mono fw-700 f-12">{article.title}</div>
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
