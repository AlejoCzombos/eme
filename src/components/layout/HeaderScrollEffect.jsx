// src/components/HeaderScrollEffect.js
import { useEffect } from 'react';

const HeaderScrollEffect = () => {
  useEffect(() => {
    const header = document.getElementById('header');

    const handleScroll = () => {
      if (window.scrollY > 100) {
        header.classList.add('bg-slate-700', 'bg-opacity-20', 'backdrop-blur-lg');
        header.classList.remove('bg-white');
      } else {
        header.classList.remove('bg-slate-700', 'bg-opacity-20', 'backdrop-blur-lg');
        header.classList.add('bg-white');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

export default HeaderScrollEffect;