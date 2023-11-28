import React from 'react';
import { useRef } from 'react'
import { useInView, motion } from 'framer-motion'

function Cards({ content }) {
    const card = useRef(null)
    const isInViewRight = useInView(card, { once: true });

    return (
        <motion.section
            ref={card}
            className='container repeater cards'
            animate={isInViewRight ? {
                opacity: 1, y: 0,
                transition: {
                    duration: 1,
                }
            } : { opacity: 0, y: 100 }}
        >
            {content.item.traduzioni[0].blocchi.map((item) => {
                return (
                    <div className='box-repeater'>
                        <h3>{item.Titolo}</h3>
                        <p>{item.Corpo}</p>
                    </div>
                )
            })}
        </motion.section>)
}

export default Cards