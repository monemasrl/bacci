import React from 'react';

function Cards({ content }) {
    console.log(content, 'content from cards')
    return (
        <section className='container repeater cards'>
            {content.item.traduzioni[0].blocchi.map((item) => {
                return (
                    <div className='box-repeater'>
                        <h3>{item.Titolo}</h3>
                        <p>{item.Corpo}</p>
                    </div>
                )
            })}
        </section>)
}

export default Cards