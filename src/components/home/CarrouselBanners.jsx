import React, { useEffect, useRef, useState } from 'react';
import Swiper from 'swiper';
// Importa los módulos directamente si no necesitas todo el bundle
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
// Importa los CSS necesarios
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// Tu CSS personalizado (asegúrate que cargue después de los de Swiper)
import "./carrousel.css";
import { getAllBanners } from '../../api/banners';
import Loader from '../UI/Loader';

// Renombrar componente para mayor claridad (opcional pero recomendado)
export default function BannerCarousel() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null); // Ref para el contenedor del DOM
  const swiperInstanceRef = useRef(null); // Ref para la instancia de Swiper

  // --- Efecto para buscar los banners ---
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const data = await getAllBanners();
        setSlides(data || []); // Asegurar que slides sea siempre un array
      } catch (error) {
        console.error('Error fetching slides:', error);
        setSlides([]); // Establecer array vacío en caso de error
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []); // Ejecutar solo al montar

  // --- Efecto para inicializar/actualizar Swiper ---
  useEffect(() => {
    // Solo inicializar si no estamos cargando, tenemos slides y el contenedor existe
    if (!loading && slides.length > 0 && swiperRef.current) {
      // Destruir instancia previa si existe
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }

      // Crear nueva instancia usando la referencia del DOM
      swiperInstanceRef.current = new Swiper(swiperRef.current, { // <--- Usar ref aquí
        modules: [Navigation, Pagination, Autoplay],
        loop: slides.length > 1, // Loop solo si hay más de 1 slide
        centeredSlides: true,
        // centeredSlidesBounds: true, // A menudo no necesario con slidesPerView: 1
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 800,
        allowTouchMove: true, // Considera si realmente quieres deshabilitarlo (false)
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination-carousel', // Asegúrate que este selector sea único
          clickable: true,
          type: 'bullets',
          dynamicBullets: true,
        },
        navigation: {
          prevEl: '.swiper-button-prev', // Asegúrate que estos selectores sean únicos
          nextEl: '.swiper-button-next',
        },
      });
    } else if (swiperInstanceRef.current) {
       // Si no hay slides o estamos cargando, destruir instancia activa
       swiperInstanceRef.current.destroy(true, true);
       swiperInstanceRef.current = null;
    }

    // --- Función de limpieza ---
    return () => {
      if (swiperInstanceRef.current) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }
    };
    // Depender de 'loading' también, para que se re-evalúe al terminar la carga
  }, [slides, loading]);

  return (
    // Añadir min-height para evitar saltos de layout durante la carga
    <section className="swiper w-full xl:h-auto relative lg:min-h-[300px]" ref={swiperRef}>
      <div className="swiper-wrapper relative" id="my-slider">
        {/* --- Lógica de Renderizado Mejorada --- */}
        {loading ? (
          // 1. Estado de Carga
          <div className="swiper-slide flex justify-center items-center h-full aspect-[16/7] lg:aspect-[16/5]">
            <div className="col-span-full flex items-center justify-center h-full">
              <Loader />
            </div>
          </div>
        ) : slides.length > 0 ? (
          // 2. Hay Slides
          slides.map(({ url, title, description, button_text, button_url, id }) => (
            <div key={id} id={`swiper-slide-banner-${id}`} className="swiper-slide h-auto rounded overflow-hidden relative aspect-[16/7] lg:aspect-[16/5]">
              <img
                src={url}
                alt={title || 'Banner'} // Añadir fallback para alt
                className="w-full h-full object-cover"
                // Considera añadir tamaños específicos si la imagen base es muy grande
                // loading="lazy" // Carga diferida para imágenes no visibles inicialmente (si aplica)
              />

              {/* Text and buttons - Usar ternario para evitar el '0' */}
              {title || description || button_text || button_url ? ( // Renderizar si *alguno* existe
                <div className="carousel-text absolute inset-0 flex flex-col justify-center items-center gap-1 lg:gap-10 p-4 z-10"> {/* Usar inset-0, añadir padding y z-index */}
                  {title && <h2 className="text-white text-center text-xl lg:text-6xl font-bold">{title}</h2>} {/* font-bold añadido */}
                  {description && <p className="text-white text-xs lg:text-2xl text-center max-w-[80%] lg:max-w-5xl">{description}</p>}
                  {button_text && button_url && <a href={button_url} className='mt-2 py-1 lg:py-2 px-3 lg:px-6 text-center text-sm lg:text-2xl text-white cursor-pointer font-semibold bg-secondary-600 hover:scale-105 transition-all duration-300 ease-in-out rounded-md'>{button_text}</a>} {/* rounded-md añadido */}

                  {/* Gradiente - Asegurarse que esté detrás del texto (con z-index o orden DOM) */}
                  <div
                    // id="gradient-carousel" // ID debe ser único, quitar si se repite
                    className="absolute inset-0 w-full h-full bg-gradient-to-t from-primary-600/70 to-transparent to-70% pointer-events-none -z-10" // Ajustar opacidad y posición Z si es necesario
                  ></div>
                </div>
              ) : null}
            </div>
          ))
        ) : (
          // 3. No hay Slides (después de cargar) - Mostrar Default Slide
          <div id="swiper-slide-banner-default" className="swiper-slide h-auto rounded overflow-hidden relative aspect-[16/7] lg:aspect-[16/5]">
            <img
              src="/images/home/carousel/slider_afiliate.webp"
              alt="Afiliate a EME club"
              className="w-full h-full object-cover"
            />
            <div className="carousel-text absolute inset-0 flex flex-col justify-center items-center gap-1 lg:gap-10 p-4 z-10">
              <h2 className="text-white text-center text-xl lg:text-6xl font-bold">AFILIATE</h2>
              <p className="text-white text-xs lg:text-2xl text-center max-w-[80%] lg:max-w-5xl">
                Tu tranquilidad es nuestra prioridad. Con EME, contás con un servicio de emergencias de última generación, adaptado a tus necesidades.
              </p>
              <a href='/servicios/familiares' className='mt-2 py-1 lg:py-2 px-3 lg:px-6 text-center text-sm lg:text-2xl text-white cursor-pointer font-semibold bg-secondary-600 hover:scale-105 transition-all duration-300 ease-in-out rounded-md'>CUIDÁ LO QUE MÁS NECESITAS</a>
              <div
                 className="absolute inset-0 w-full h-full bg-gradient-to-t from-primary-600/70 to-transparent to-70% pointer-events-none -z-10"
              ></div>
            </div>
          </div>
        )}
      </div> {/* Fin swiper-wrapper */}

      {/* --- Controles: Mostrar solo si no está cargando y hay más de 1 slide --- */}
      {/* Usar ternario para evitar el '0' */}
      {!loading && slides.length > 1 ? (
         <>
           {/* Usar clases más específicas si tienes múltiples carruseles */}
           <div className="swiper-pagination-carousel banner-pagination"></div>
           <div className="swiper-button-prev banner-button-prev transform rotate-180 hover:scale-125 transition-transform duration-300 ease-in-out">
             <img
               className="size-6 lg:size-14" // Ajustado tamaño
               src="/icons/swiperCarousel.svg"
               alt="Anterior" // Alt más conciso
             />
           </div>
           <div className="swiper-button-next banner-button-next hover:scale-125 transition-transform duration-300 ease-in-out">
             <img
               className="size-6 lg:size-14" // Ajustado tamaño
               src="/icons/swiperCarousel.svg"
               alt="Siguiente" // Alt más conciso
             />
           </div>
         </>
       ) : null}

    </section>
  );
}