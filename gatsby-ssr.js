/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

/**
 * @type {import('gatsby').GatsbySSR['onRenderBody']}
 */
exports.onRenderBody = ({ setHtmlAttributes, pathname, pageContext }) => {
  let lang = "it";
  if (pageContext && pageContext.locale) {
    lang = pageContext.locale === "en_US" ? "en" : "it";
  }
  setHtmlAttributes({ lang });
}
