import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules';
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { FreeMode, Navigation, Thumbs, } from 'swiper/modules';

function Slider({ locale }) {
    SwiperCore.use([Autoplay]);
    const data = useStaticQuery(graphql`
        query {
            
                directus {
                    slider{
                        slides{
                            tipo
                            immagine{
                            id
                            imageFile{
                                id
                                childImageSharp{
                                gatsbyImageData
                                }
                            }
                            }
                            translations{
                                languages_code{
                                    code
                                }
                            titolo
                            testo
                            action_label
                            action_url
                            }
                        }
                    }
                 }
            }
   `)

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const translation = data.directus.slider.slides.filter((item) =>
        item.translations.find((item) => item.languages_code.code === locale)
    )
    console.log(translation.length)
    if (data.directus.slider.slides.length === 0) {
        return <h2>Error, no Slides!</h2>
    }

    return (
        <>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                autoplay={{ delay: 100000 }}
                className="mySwiper2"
            >

                {data.directus.slider.slides.map((item, index) => {

                    /* Se non esiste una traduzione ritorna slide vuota */
                    if (translation.length === 0) return <div key={index}></div>

                    const translations = translation[index].translations[0]
                    return (
                        <SwiperSlide key={index}>
                            {item.tipo === "immagine" ?
                                <GatsbyImage className="background-slider" quality={100} image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={translations.titolo ? translations.titolo : 'immagine slider'} /> :
                                <div>test</div>}
                            {translations.testo && <div className="sliderContent">
                                <div className='sliderContent__box' dangerouslySetInnerHTML={{ __html: translations.testo }} />
                                {translations.action_url && <a href={translations.action_url} title={translations.action_label} className="buttonLink">&#62;</a>}
                            </div>}

                        </SwiperSlide>
                    )
                })}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiperNav"
            >
                {data.directus.slider.slides.map((item, index) => {

                    /* Se non esiste una traduzione ritorna slide vuota */
                    if (translation.length === 0) return <div key={index}></div>

                    const translations = translation[index].translations[0]
                    return (
                        < SwiperSlide key={index} >
                            {translations.titolo}
                        </SwiperSlide>)
                })}

            </Swiper >
        </>
    );
}

export default Slider;