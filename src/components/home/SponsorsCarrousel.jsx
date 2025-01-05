import { useEffect, useState } from 'react';
import Swiper from 'swiper';
import "./carrousel.css"
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import { getAllSponsorsLogos } from '../../api/sponsors';

export default function BenefitsCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getAllSponsorsLogos();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const swiper = new Swiper('.swiper-beneficts', {
  modules: [Navigation, Pagination, Autoplay],
  loop: true,
  centeredSlides: true,
  centeredSlidesBounds: true,
  centerInsufficientSlides: true,
  slidesPerView: 3,
  spaceBetween: 60,
  speed: 500,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  breakpoints: {
    1024: {
      slidesPerView: 5,
      spaceBetween: 170,
    },
  },
  wrapperClass: 'swiper-wrapper',
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'bullets',
    dynamicBullets: true,
  },
  navigation: {
    prevEl: '.swiper-button-prev',
    nextEl: '.swiper-button-next',
  },
});

  return (
    <section className="w-full px-10 py-12 lg:px-0 lg:py-14 max-w-7xl m-auto relative overflow-hidden">
      <h2 className="p-2 mb-16">BENEFICIOS EXCLUSIVOS</h2>
      <div className="swiper-beneficts max-w-6xl m-auto relative overflow-hidden">
        <div className="swiper-wrapper">
          {loading || images.length == 0
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="swiper-slide flex justify-center items-center animate-pulse h-44 w-full"
                  >
                    <img
                      src="/images/home/benefits/sponsor_skeleton.png"
                      alt="Skeleton"
                      className="w-full h-full max-h-44 object-cover"
                    />
                  </div>
                ))
            : images.map((image, index) => (
                <div key={index} className="swiper-slide flex justify-center items-center">
                  <img
                    src={image.url}
                    alt={`Benefit ${index + 1}`}
                    className="w-full h-full max-h-44 object-cover"
                  />
                </div>
              ))}
        </div>
      </div>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-prev transform rotate-180 hover:scale-125 transition-transform duration-300 ease-in-out">
        <img
          className="size-6 lg:size-28"
          src="/icons/swiperBenefits.svg"
          alt="Icono anterior imagen"
        />
      </div>
      <div className="swiper-button-next hover:scale-125 transition-transform duration-300 ease-in-out">
        <img
          className="size-6 lg:size-28"
          src="/icons/swiperBenefits.svg"
          alt="Icono siguiente imagen"
        />
      </div>
      <div className="flex justify-center mt-28">
        <a href="/beneficios" className='py-2 px-4 md:px-6 text-center text-white cursor-pointer font-semibold bg-primary-600 hover:scale-105 transition-transform duration-300 ease-in-out'>Ver más beneficios</a>
      </div>
    </section>
  );
}
