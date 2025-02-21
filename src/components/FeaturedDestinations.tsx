import React from "react";
import DestinationCard from "./DestinationCard";

interface FeaturedDestinationsProps {
  destinations?: Array<{
    imageUrl: string;
    title: string;
    description: string;
    price: number;
    rating: number;
    location: string;
  }>;
}

const FeaturedDestinations = ({ destinations }: FeaturedDestinationsProps) => {
  const defaultDestinations = [
    {
      imageUrl:
        "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800&auto=format&fit=crop",
      title: "Luxury Resort & Spa",
      description:
        "Experience ultimate relaxation in this 5-star beachfront resort",
      price: 499,
      rating: 4.8,
      location: "Maldives",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop",
      title: "Mountain Lodge Retreat",
      description: "Escape to the mountains in this cozy luxury lodge",
      price: 299,
      rating: 4.7,
      location: "Swiss Alps",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop",
      title: "Beachfront Villa",
      description: "Private paradise with direct beach access",
      price: 799,
      rating: 4.9,
      location: "Bali",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop",
      title: "Urban Luxury Hotel",
      description: "Five-star luxury in the heart of the city",
      price: 399,
      rating: 4.6,
      location: "Tokyo",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop",
      title: "Santorini Villa",
      description: "Stunning views from this cliffside retreat",
      price: 599,
      rating: 4.8,
      location: "Greece",
    },
    {
      imageUrl:
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop",
      title: "Desert Oasis Resort",
      description: "Luxury meets adventure in the desert",
      price: 449,
      rating: 4.7,
      location: "Dubai",
    },
  ];

  const displayDestinations = destinations || defaultDestinations;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Featured Destinations
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our handpicked selection of luxury destinations around the
          world
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {displayDestinations.map((destination, index) => (
          <DestinationCard
            key={index}
            imageUrl={destination.imageUrl}
            title={destination.title}
            description={destination.description}
            price={destination.price}
            rating={destination.rating}
            location={destination.location}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedDestinations;
