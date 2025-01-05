import { useEffect, useState } from 'react';
import { getAllSponsorsLogos } from '../../api/sponsors';

export default function Carousel() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const data = await getAllSponsorsLogos(); 
        setImages(data);
      } catch (error) {
        console.error('Error al cargar imágenes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
      <>
        {loading || images.length == 0 ? (
          // Skeleton Loader
          Array(5).fill(null).map((_, index) => (
            <div
              key={index}
              className="swiper-slide flex justify-center items-center"
            >
              <img src="/images/home/benefits/sponsor_skeleton.png" alt="skeleton" className="w-full h-full max-h-44 max-w-44 object-cover" />
            </div>
          ))
        ) : (
          images.map((image, index) => (
            <div key={index} className="swiper-slide flex justify-center items-center">
              <img
                src={image.url}
                alt=""
                className="w-full h-full max-h-44 max-w-44 object-cover"
              />
            </div>
          ))
        )}
      </>
  );
}
