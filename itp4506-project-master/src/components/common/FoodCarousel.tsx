import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption,
} from 'reactstrap';


const items = [
  {
    src: require("../../images/Carousel_1.webp"),
    altText: 'Slide 1',
    caption: 'Caption for Slide 1',
    key: 1,
  },
  {
    src: require("../../images/Carousel_2.webp"),
    altText: 'Slide 2',
    caption: 'Caption for Slide 2',
    key: 2,
  },
  {
    src: require("../../images/Carousel_3.webp"),
    altText: 'Slide 3',
    caption: 'Caption for Slide 3',
    key: 3,
  },
];

export function FoodCarousel(args: Record<string, unknown>) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex: number) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img 
          src={item.src} 
          alt={item.altText} 
          style={{
            width: '100%', 
            height: '400px', 
            objectFit: 'cover', 
            borderRadius: '25px',
            margin: '10px',
          }} 
        />
      </CarouselItem>
    );
  });
  
  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      {...args}
    >
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
      <CarouselControl
        direction="prev"
        directionText="Previous"
        onClickHandler={previous}
      />
      <CarouselControl
        direction="next"
        directionText="Next"
        onClickHandler={next}
      />
    </Carousel>
  );
}