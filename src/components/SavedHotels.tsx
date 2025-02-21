import React from "react";
import { Card, CardContent } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

interface SavedHotel {
  id: string;
  name: string;
  location: string;
  price: number;
  image: string;
  dates?: {
    checkIn: Date;
    checkOut: Date;
  };
}

interface SavedHotelsProps {
  savedHotels?: SavedHotel[];
  onRemove?: (id: string) => void;
  onView?: (id: string) => void;
}

const defaultSavedHotels: SavedHotel[] = [
  {
    id: "1",
    name: "Luxury Beach Resort",
    location: "Maldives",
    price: 599,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d",
  },
];

export const SavedHotels = ({
  savedHotels = defaultSavedHotels,
  onRemove,
  onView,
}: SavedHotelsProps) => {
  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Saved Hotels</h2>
        <ScrollArea className="h-[400px]">
          <div className="space-y-4">
            {savedHotels.map((hotel) => (
              <Card
                key={hotel.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3
                        className="font-semibold hover:text-primary transition-colors"
                        onClick={() => onView?.(hotel.id)}
                      >
                        {hotel.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {hotel.location}
                      </p>
                      <p className="text-sm font-semibold mt-1">
                        From ${hotel.price} per night
                      </p>
                      {hotel.dates && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {hotel.dates.checkIn.toLocaleDateString()} -{" "}
                          {hotel.dates.checkOut.toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemove?.(hotel.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
