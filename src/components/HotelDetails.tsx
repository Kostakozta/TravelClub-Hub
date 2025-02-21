import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Heart } from "lucide-react";

interface HotelDetailsProps {
  hotel?: {
    id: string;
    name: string;
    description: string;
    location: string;
    price: number;
    rating: number;
    images: string[];
    amenities: string[];
    rooms: Array<{
      id: string;
      name: string;
      description: string;
      price: number;
      capacity: number;
      amenities: string[];
    }>;
  };
  onSave?: (hotelId: string) => void;
  onBookRoom?: (roomId: string) => void;
}

const defaultHotel = {
  id: "1",
  name: "Luxury Beach Resort",
  description: "Experience paradise in our beachfront luxury resort",
  location: "Maldives",
  price: 599,
  rating: 4.8,
  images: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  ],
  amenities: [
    "Private Beach",
    "Spa",
    "Pool",
    "Restaurant",
    "Fitness Center",
    "Room Service",
  ],
  rooms: [
    {
      id: "1",
      name: "Ocean View Suite",
      description: "Luxurious suite with panoramic ocean views",
      price: 799,
      capacity: 2,
      amenities: ["King Bed", "Balcony", "Mini Bar", "Ocean View"],
    },
    {
      id: "2",
      name: "Beach Villa",
      description: "Spacious villa steps from the beach",
      price: 1299,
      capacity: 4,
      amenities: ["Private Pool", "Kitchen", "Multiple Rooms", "Beach Access"],
    },
  ],
};

export const HotelDetails = ({
  hotel = defaultHotel,
  onSave,
  onBookRoom,
}: HotelDetailsProps) => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="relative">
        <div className="relative h-[400px] rounded-t-lg overflow-hidden">
          <img
            src={hotel.images[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            onClick={() => onSave?.(hotel.id)}
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
            <p className="text-muted-foreground">{hotel.location}</p>
          </div>
          <div className="text-right">
            <div className="text-sm">Starting from</div>
            <div className="text-2xl font-bold">${hotel.price}</div>
            <div className="text-sm">per night</div>
          </div>
        </div>

        <Tabs defaultValue="rooms" className="w-full">
          <TabsList>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="amenities">Amenities</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
          </TabsList>

          <TabsContent value="rooms" className="mt-4">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {hotel.rooms.map((room) => (
                  <Card key={room.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{room.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {room.description}
                          </p>
                        </div>
                        <Button onClick={() => onBookRoom?.(room.id)}>
                          Book Now
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {room.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="amenities">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {hotel.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline">
                  {amenity}
                </Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="details">
            <p className="text-muted-foreground">{hotel.description}</p>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
