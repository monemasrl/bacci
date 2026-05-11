import React from "react"
import "./faq.scss"
const getFaqQuestion = (item) => item?.Domanda || ""

const getFaqAnswer = (item) => item?.Risposta || ""

const normalizeFaqItems = (items) => {
  if (!items) {
    return []
  }

  if (Array.isArray(items)) {
    return items
  }

  if (typeof items === "string") {
    try {
      const parsedItems = JSON.parse(items)
      return Array.isArray(parsedItems) ? parsedItems : []
    } catch (error) {
      return []
    }
  }

  return []
}

const Faq = ({ items, title = "FAQ" }) => {
  const faqItems = normalizeFaqItems(items).filter((item) => getFaqQuestion(item) && getFaqAnswer(item))

  if (faqItems.length === 0) {
    return null
  }

  return (
    <section className="widget-faq container">
      <h2>{title}</h2>
      <div className="widget-faq__list">
        {faqItems.map((item, index) => {
          const question = getFaqQuestion(item)
          const answer = getFaqAnswer(item)

          return (
            <details className="widget-faq__item" key={`${question}-${index}`}>
              <summary className="widget-faq__question">{question}</summary>
              <div className="widget-faq__answer" dangerouslySetInnerHTML={{ __html: answer }}>
          
              </div>
            </details>
          )
        })}
      </div>
    </section>
  )
}

export default Faq