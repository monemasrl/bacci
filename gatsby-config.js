module.exports = {
  siteMetadata: {
    title: `Bacci 1918`,
    description: `lorem ipsum`,
    author: 'Tesecom.it',
    siteUrl: 'https://bacci.com'
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    `gatsby-plugin-preact`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        url: `https://bacci.monema.dev/graphql`,
      }
    },
    `gatsby-plugin-react-helmet`,
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
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-wordpress-preview`,
      options: {
        graphqlEndpoint: "http://testwpmlgatsby.local/graphql", // defaults to `${generalSettings.url}/graphql` from wordpress
        excludedTemplates: [], // exclude templates by their graphqlSingleName. defaults to none
        debug: false, // shows extra console logs. defaults to false
        templatesPath: `./src/templates/**/*.js`, // default
        contentTypeTemplateDirectory: `./src/templates`, // default
      },
    },
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-XXXX",

        // Include GTM in development.
        //
        // Defaults to false meaning GTM will only be loaded in production.
        includeInDevelopment: false,

        // datalayer to be set before GTM is loaded
        // should be an object or a function that is executed in the browser
        //
        // Defaults to null
        defaultDataLayer: { platform: "gatsby" },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        routeChangeEventName: "route-change",
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "G-XXXX",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        //exclude: ["/preview/**"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // Defers execution of google analytics script after page load
        defer: true,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "jampot.it",
        // defaults to false
        enableWebVitalsTracking: true,
      },
    },
  ],
  
}
