"use client";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from 'next/image';

const precautionsData = [
  {
    image: '/images/facemask.jpg',
    title: 'Wear a Mask',
    description: 'Always wear a mask in crowded places to reduce the spread of COVID-19.',
  },
  {
    image: '/images/socialdistance.jpg',
    title: 'Maintain Social Distance',
    description: 'Keep at least 6 feet of distance from others in public spaces.',
  },
  {
    image: '/images/handwash.avif',
    title: 'Wash Your Hands',
    description: 'Wash your hands with soap and water for at least 20 seconds.',
  },
  {
    image: '/images/vaccination.webp',
    title: 'Get Vaccinated',
    description: 'Ensure you are vaccinated and receive booster doses as needed.',
  },
  {
    image:'/images/crowded-place.jpg',
    title: 'Avoid Crowded Places',
    description: 'Avoid large gatherings, especially in poorly-ventilated spaces',
  }
];

export default function PrecautionsCarousel() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}></h2>
      <Carousel showThumbs={false} 
                autoPlay 
                infiniteLoop 
                showStatus={false}>
        {precautionsData.map((precaution, index) => (
          <div key={index} style={{ padding: '10px' }}>
            <Image src={precaution.image} alt={precaution.title} width={600} height={400} style={{ borderRadius: '10px' }} />
            <h3 style={{ fontSize: '24px', marginTop: '15px' }}>{precaution.title}</h3>
            <p style={{ fontSize: '16px', color: '#555' }}>{precaution.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
