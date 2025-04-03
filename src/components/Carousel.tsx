import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="carousel">
      <button className='bun' onClick={prevImage}>{'<'}</button>
      <img src={images[current]} alt={`Slide ${current}`} />
      <button className='bun2'onClick={nextImage}>{'>'}</button>
    </div>
  );
};

export default Carousel;
