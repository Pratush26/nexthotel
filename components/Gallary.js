"use client"
import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export default function EmblaCarousel() {
    const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])
    const img = [
        "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/20771843/pexels-photo-20771843/free-photo-of-bed-in-luxury-bedroom.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
        "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
        "https://images.pexels.com/photos/8082564/pexels-photo-8082564.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load"
    ]
    return (
        <section className="embla w-full mx-auto" ref={emblaRef}>
            <div className="embla__container">
                {img.map((item, i) => (
                    <div key={i} className="embla__slide flex items-center justify-center relative w-full sm:h-130 md:h-140 h-80">
                        <Image src={item} fill={true} className='object-contain' alt={`gallery-photo-${i}`} />
                    </div>
                ))}
            </div>
        </section>
    )
}
