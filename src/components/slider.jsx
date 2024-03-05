import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import React, { useRef, useState } from 'react';
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
                            }
                        }
                    }
                 }
            }
   `)

    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const translation = data.directus.slider.slides.map((item) =>
        item.translations.find((item) => item.languages_code.code === locale)
    )
    console.log(translation)
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
                autoplay={{ delay: 10000 }}
                className="mySwiper2"
            >

                {data.directus.slider.slides.map((item, index) => {
                    const translations = translation[index]
                    return (
                        <SwiperSlide key={index}>
                            {item.tipo === "immagine" ?
                                <GatsbyImage className="background-slider" quality={100} image={item.immagine.imageFile.childImageSharp.gatsbyImageData} alt={translations.titolo} /> :
                                <div>test</div>}
                            <div className="sliderContent">
                                <div className='sliderContent__box' dangerouslySetInnerHTML={{ __html: translations.testo }} />
                            </div>

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
                    const translations = translation[index]
                    return (
                        < SwiperSlide >
                            {translations.titolo}
                        </SwiperSlide>)
                })}

            </Swiper >
        </>
    );
}

export default Slider;