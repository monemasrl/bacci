import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules';
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { FreeMode, Navigation, Thumbs, EffectFade } from 'swiper/modules';

const TIMER = 10000

function SliderName({ titolo, isChangeSlider, currentSlide, setCurrentSlide, currentIndex }) {
    console.log(currentSlide)
    const [slideThumbBar, setSlideThumbBar] = useState(0)
    useEffect(() => {
        const interval = setInterval(() => {
            /* al cambio di slide setta la dimensione a zero */
            if (isChangeSlider) setSlideThumbBar(0)
            /* Quando è finita la transizione in entrata, slideThumbar è 0, parte la barra */
            else {
                if (slideThumbBar < 100) {
                    let size = slideThumbBar + .1
                    setSlideThumbBar(size)
                }
            }
        }, TIMER / 1200);
        return () => clearInterval(interval);

    })


    return (
        <>
            <div style={{ width: `${currentIndex === currentSlide ? slideThumbBar : 0}%`, height: 3, background: "#4a6c96" }} > </div>
            {titolo}
        </>
    )
}


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
    const [isChangeSlider, setIsChangeSlider] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)

    const translation = data.directus.slider.slides.filter((item) =>
        item.translations.find((item) => item.languages_code.code === locale)
    )

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
                modules={[FreeMode, Navigation, Thumbs, EffectFade]}
                autoplay={{ delay: TIMER }}
                className="mySwiper2"
                effect='fade'
                onSlideChangeTransitionEnd={() => {

                    setIsChangeSlider(false)


                }}
                onActiveIndexChange={(swiper) => {
                    setCurrentSlide(swiper.realIndex)
                    setIsChangeSlider(true)

                }}
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
            </Swiper >
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

                        <SwiperSlide key={index} >
                            <SliderName titolo={translations.titolo} isChangeSlider={isChangeSlider} currentSlide={currentSlide} setCurrentSlide={setCurrentSlide} currentIndex={index} />
                        </SwiperSlide>)
                })}

            </Swiper >
        </>
    );
}

export default Slider;