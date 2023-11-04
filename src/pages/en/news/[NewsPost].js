import React from "react"

import LayoutNews from "../../components/layout/layout-news"

const NewsPost = props => {
  console.log(props, "props")
  return (
    <>
      {/*  <LayoutNews allPagePath={allPagePath} locale={locale} translations={translations} pageTitle={title} tipo="news">
                <div className="wrapper-news">
                    <span className="datanews">{date}</span>
                    <h2>{sottotitolo}</h2>
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </LayoutNews> */}
    </>
  )
}

export default NewsPost

export async function getServerData() {
  try {
    const res = await fetch(
      `https://bacci-bedrock.monema.dev/wp-json/wp/v2/posts/1017`
    )

    if (!res.ok) {
      throw new Error(`Response failed`)
    }

    return {
      props: await res.json(),
    }
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    }
  }
}
