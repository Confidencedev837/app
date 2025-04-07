import React, { useState } from 'react';


interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
  const goToImage = (index: number) => setCurrent(index);

  return (
    <div className="carousel-container">
      <div className="carousel">
        <button className='bun' onClick={prevImage}>{'<'}</button>
        <img className="crimage" src={images[current]} alt={`Slide ${current}`} />
        <button className='bun2' onClick={nextImage}>{'>'}</button>
      </div>

      {/* Dots */}
      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${current === index ? 'active' : ''}`}
            onClick={() => goToImage(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
