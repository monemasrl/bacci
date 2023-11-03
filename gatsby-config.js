/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Bacci COM`,
    description: `Bacci COM`,
    author: `Tesecom`,
    siteUrl: `https://bacci-bedrock.monema.dev/`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    {
        resolve: `gatsby-source-wordpress`,
        options: {
            // Specify the URL of the WordPress source
            // baseURL: `localhost:8888`,
            // options: {
            //   verbose: true,
            // },
            // url: `https://bacci.monema.dev/graphql`,
            url: `https://bacci-bedrock.monema.dev/wp/graphql`,
            // protocol: `http`,
            // Indicates if a site is hosted on WordPress.com
            // hostingWPCOM: false,
            // Specify which URL structures to fetch
            // includedRoutes: [
            //   '**/posts',
            //   '**/tags',
            //   '**/categories'
            // ]
        }
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
