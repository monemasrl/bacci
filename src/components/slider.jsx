import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import 'swiper/css/thumbs';

import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper'
import { Autoplay } from 'swiper/modules';
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import { FreeMode, Navigation, Thumbs, EffectFade } from 'swiper/modules';
import YoutubeEmbed from './youtubeEmbed';

const TIMER = 10000

function SliderName({ titolo, isChangeSlider, isPaused, currentSlide, currentIndex }) {

    const [slideThumbBar, setSlideThumbBar] = useState(0)

    useEffect(() => {
        if (isChangeSlider) {
            setSlideThumbBar(0)
            return
        }

        if (isPaused) return   // 👈 in hover non avanza la barra

        const interval = setInterval(() => {
            setSlideThumbBar((prev) => Math.min(prev + 0.1, 100))
        }, TIMER / 1200)

        return () => clearInterval(interval)
    }, [isChangeSlider, isPaused])   // 👈 isPaused nelle deps


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
                            video
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
    const [isPaused, setIsPaused] = useState(false)   // 👈 sostituisce isHovering
    const swiperRef = useRef(null)                     // 👈 istanza Swiper

    const translation = data.directus.slider.slides.filter((item) =>
        item.translations.find((item) => item.languages_code.code === locale)
    )

    if (translation.length === 0) {
        return
    }


    const slidesTranslated = translation
        .map((item) => ({
            ...item,
            translations: item.translations.filter((trans) => trans.languages_code.code === locale)
        }))
        .filter((item) => item.translations[0]?.titolo);


    const handlePause = () => {
        swiperRef.current?.autoplay?.stop()
        setIsPaused(true)
    }

    const handleResume = () => {
        swiperRef.current?.autoplay?.start()
        setIsPaused(false)
    }


    return (
        <>
            <div
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
            >
                <Swiper
                    onSwiper={(swiper) => { swiperRef.current = swiper }}   // 👈
                    style={{
                        '--swiper-navigation-color': '#fff',
                        '--swiper-pagination-color': '#fff',
                    }}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{ swiper: thumbsSwiper }}
                    modules={[Autoplay, FreeMode, Navigation, Thumbs, EffectFade]}
                    autoplay={{ delay: TIMER, disableOnInteraction: false }}   // 👈 statico
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
                    {slidesTranslated?.map((item, index) => {
                        if (translation?.length === 0) {
                            return <div key={index}></div>
                        }

                        const translations = item.translations[0]

                        const slideBackground = item.tipo === 'video' && item.video ? (
                            <YoutubeEmbed
                                embedId={item.video}
                                locale={locale}
                                consentRequired={false}
                                className="background-slider"
                                autoplay={true}
                                loop={true}
                                isHomePage={true}
                            />
                        ) : item.immagine?.imageFile?.childImageSharp?.gatsbyImageData ? (
                            <GatsbyImage
                                image={item.immagine.imageFile.childImageSharp.gatsbyImageData}
                                alt={translations.titolo}
                                className="background-slider"
                            />
                        ) : null;

                        return (
                            <SwiperSlide key={index}>
                                {slideBackground}
                                {translations.testo && (
                                    <div className="sliderContent">
                                        <div className='sliderContent__box' dangerouslySetInnerHTML={{ __html: translations.testo && translations.testo }} />
                                        {translations.action_url && (
                                            <a href={translations.action_url} title={translations.action_label && translations.action_label} className="buttonLink">&#62;</a>
                                        )}
                                    </div>
                                )}
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>

            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiperNav"
            >
                {slidesTranslated.map((item, index) => {
                    if (translation.length === 0) return <div key={index}></div>

                    const translations = item.translations[0]
                    return (
                        <SwiperSlide key={index}>
                            {translations.titolo && (
                                <SliderName
                                    titolo={translations.titolo}
                                    isChangeSlider={isChangeSlider}
                                    isPaused={isPaused}                 // 👈 propagato
                                    currentSlide={currentSlide}
                                    setCurrentSlide={setCurrentSlide}
                                    currentIndex={index}
                                />
                            )}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    );
}

export default Slider;