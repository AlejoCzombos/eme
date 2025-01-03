import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import 'swiper/bundle';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./carrousel.css"
import { getAllBanners } from '../../api/banners';

export default function BenefitsCarousel() {
  const [slides, setSlides] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const data = await getAllBanners();
        setSlides(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching slides:', error);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (slides.length > 0 && swiperRef.current) {
      new Swiper('.swiper', {
        modules: [Navigation, Pagination, Autoplay],
        loop: true,
        centeredSlides: true,
        centeredSlidesBounds: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        allowTouchMove: false,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination-carousel',
          clickable: true,
          type: 'bullets',
          dynamicBullets: true,
        },
        navigation: {
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        },
      });
    }
  }, [slides]);

  return (
    <section className="swiper w-full xl:h-auto relative" ref={swiperRef}>
      <div className="swiper-wrapper relative" id="my-slider">
        {/* Slide 1 */}
        <div id="swiper-slide-banner" className="swiper-slide h-auto rounded overflow-hidden relative">
          <a href="https://tify.cc/xt8oQ" target="_blank" rel="noopener noreferrer">
            <img
              src="/images/home/carousel/slider_sorteo.webp"
              alt="Sorteo"
              className="w-full h-full object-cover"
            />
          </a>
        </div>
        {/* Slide 2 */}
        <div id="swiper-slide-banner" className="swiper-slide h-auto rounded overflow-hidden relative">
          <img
            src="/images/home/carousel/slider_afiliate.webp"
            alt="Afiliate a EME club"
            className="w-full h-full object-cover"
          />

          {/* Text and buttons */}
          <div className="carousel-text absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center gap-1 lg:gap-10">
            <h2 className="text-white text-center text-xl lg:text-4xl">AFILIATE</h2>
            <p className="text-white text-xs lg:text-2xl text-center max-w-[80%] lg:max-w-5xl">
              Tu tranquilidad es nuestra prioridad. Con EME, contás con un servicio de emergencias de última generación,
              adaptado a tus necesidades.
            </p>
            <a className='py-2 px-4 md:px-6 text-center text-white cursor-pointer font-semibold bg-secondary-600 hover:scale-105 transition-all duration-300 ease-in-out'>CUIDÁ LO QUE MÁS NECESITAS</a>
            <div
              id="gradient-carousel"
              className="absolute top-0 left-0 w-full h-full min-w-full min-h-full bg-gradient-to-t from-primary-600 to-transparent to-80% pointer-events-none"
              ></div>
            </div>
          </div>
          {
          slides.map((slide, index) => (
            <div
              key={index}
              id="swiper-slide-banner"
              className="swiper-slide h-auto rounded overflow-hidden relative"
            >
              <img
                src={slide.url}
                alt={slide.alt || `Slide ${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
      </div>

      <div className="swiper-pagination-carousel"></div>

      <div className="swiper-button-prev transform rotate-180 hover:scale-125 transition-transform duration-300 ease-in-out">
        <img
          className="size-6 lg:size-28"
          src="/icons/swiperCarousel.svg"
          alt="Icono siguiente imagen"
        />
      </div>

      <div className="swiper-button-next hover:scale-125 transition-transform duration-300 ease-in-out">
        <img
          className="size-6 lg:size-28"
          src="/icons/swiperCarousel.svg"
          alt="Icono anterior imagen"
        />
      </div>
    </section>
  );
}
