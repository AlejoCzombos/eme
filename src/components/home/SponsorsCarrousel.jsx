import { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
import "./carrousel.css"
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import { getAllSponsorsLogos } from '../../api/sponsors';

export default function BenefitsCarousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);
  const swiperInstanceRef = useRef(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getAllSponsorsLogos();
        setImages(data);
      } catch (error) {
        console.error('Error fetching images:', error);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (!loading && images.length > 0 && swiperRef.current) {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }

      swiperInstanceRef.current = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        loop: images.length >= 6, // Simplificado: loop si hay 6 o más imágenes
        //centeredSlides: true, // Considera si realmente necesitas centrar slides
        //centeredSlidesBounds: true,
        slidesPerView: 3,
        spaceBetween: 30,
        speed: 500,
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        breakpoints: {
          1024: {
            slidesPerView: 5,
            spaceBetween: 150, // Revisa si este spaceBetween tan grande es intencional
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
    } else if (swiperInstanceRef.current) {
      // Si no se cumplen las condiciones (ej. no hay imágenes), destruir instancia existente
       swiperInstanceRef.current.destroy(true, true);
       swiperInstanceRef.current = null;
    }

    // --- Función de limpieza ---
    // Se ejecuta cuando el componente se desmonta o antes de que el efecto se re-ejecute
    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null; // Limpiar la referencia
      }
    };
  }, [loading, images]);

  return (
    <section className="w-full px-10 py-12 lg:px-0 lg:py-14 max-w-7xl m-auto relative overflow-hidden">
      <h2 className="p-2 mb-16">BENEFICIOS EXCLUSIVOS</h2>
      <div
        ref={swiperRef}
        className="swiper-beneficts max-w-6xl m-auto relative overflow-hidden min-h-[200px]"
      >
        <div className="swiper-wrapper">
          {loading || images.length === 0
            ? Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="swiper-slide flex justify-center items-center animate-pulse max-w-64"
                  >
                    <div className="size-44 lg:size-32 bg-gray-300 rounded-full"></div>
                  </div>
                ))
            : images.map((image, index) => (
                <div key={image.id || index} className="swiper-slide flex justify-center items-center">
                  <img
                    src={image.url}
                    alt={`Sponsor ${index + 1}`}
                    className="max-w-full h-auto min-h-44 lg:max-h-44 object-contain"
                  />
                </div>
              ))}
        </div>
      </div>
      {!loading && images.length > (window.innerWidth >= 1024 ? 5 : 3) && (
         <>
           <div className="swiper-pagination"></div>
           <div className="swiper-button-prev transform rotate-180 hover:scale-125 transition-transform duration-300 ease-in-out custom-prev">
             <img
               className="size-6 lg:size-14"
               src="/icons/swiperBenefits.svg"
               alt="Icono anterior imagen"
             />
           </div>
           <div className="swiper-button-next hover:scale-125 transition-transform duration-300 ease-in-out custom-next">
             <img
               className="size-6 lg:size-14"
               src="/icons/swiperBenefits.svg"
               alt="Icono siguiente imagen"
             />
           </div>
         </>
       )}
      <div className="flex justify-center mt-28">
        <a href="/beneficios?benefit=eme_club" className='py-2 px-4 md:px-6 text-center text-white cursor-pointer font-semibold bg-primary-600 hover:scale-105 transition-transform duration-300 ease-in-out'>Ver más beneficios</a>
      </div>
    </section>
  );
}
