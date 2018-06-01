let contentfulConfig

// try {
//   contentfulConfig = require('./.contentful')
// } catch (_) {
//   contentfulConfig = {
//     spaceId: process.env.CONTENTFUL_SPACE_ID,
//     accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
//   }
// } finally {
//   const { spaceId, accessToken } = contentfulConfig
//
//   if (!spaceId || !accessToken) {
//     throw new Error(
//       'Contentful spaceId and the delivery token need to be provided.'
//     )
//   }
// }

contentfulConfig = {
  spaceId: "f3iz1rclx2a1",
  accessToken: "dd1cafe7f642b9d8be9b6545a303ec5d8c05040e3e808de5dfeeb51c4f4c5e92",
}

module.exports = {
  pathPrefix: '/gatsby-contentful-starter',
  plugins: [
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: contentfulConfig,
    },
  ],
}
