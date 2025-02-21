import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import SearchOverlay from "./SearchOverlay";

interface HeroSectionProps {
  images?: string[];
  onSearch?: (searchParams: any) => void;
}

const HeroSection = ({
  images = [
    "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600",
    "https://images.unsplash.com/photo-1455587734955-081b22074882?w=1600",
  ],
  onSearch,
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-gray-900 overflow-hidden">
      {/* Image Carousel */}
      <Carousel className="w-full h-full" opts={{ loop: true }}>
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full h-[600px]">
              <div className="relative w-full h-full">
                <img
                  src={image}
                  alt={`Hero image ${index + 1}`}
                  className="w-full h-full object-cover transform transition-transform duration-[2s] hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Discover Luxury Travel
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Experience the world&apos;s most exclusive destinations with our
            premium travel club
          </p>
        </div>

        {/* Search Component */}
        <div className="w-full max-w-4xl mx-auto">
          <SearchOverlay onSearch={onSearch} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
