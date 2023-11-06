import React from "react"
import { createPathFromMenu } from "../../utils"
import LayoutNews from "../../components/layout/layout-news"

const NewsPost = props => {
  console.log(props.serverData.id, "props")
  //createPathFromMenu(dataPage, dataMenu, slugPagina, defaultLanguage)

  return (
    <>
      {/*  <LayoutNews allPagePath={allPagePath} locale={locale}  pageTitle={title} tipo="news">
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

export async function getServerData(props) {
  try {
    const dataId = await props.serverData.id
    const res = await fetch(
      `https://bacci-bedrock.monema.dev/wp-json/wp/v2/posts/${dataId}`
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
