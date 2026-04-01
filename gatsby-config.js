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
    title: `Bacci.com`,
    description: `Bacci descrizione`,
    author: `Bacci.com`,
    siteUrl: `https://www.bacci.com/`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-plugin-react-leaflet',
      options: {
        linkStyles: true // (default: true) Enable/disable loading stylesheets via CDN
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      resolveSiteUrl: () => `https://www.bacci.com/`,
      output: "/",
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: "https://www.bacci.com",
        sitemap: "https://www.bacci.com/sitemap-index.xml",
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-plugin-netlify`,

    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    /*     {
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
            icon: `src/images/favicon.png`, // This path is relative to the root of the site.
          },
        }, */
    {
      resolve: "@directus/gatsby-source-directus",
      options: {
        url: `https://bacci-directus.monema.dev`, // Fill with your Directus instance address
      },
    },

  ],
}
