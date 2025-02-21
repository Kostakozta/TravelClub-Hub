import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { GuestSelector } from "./GuestSelector";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMembership } from "../contexts/MembershipContext";
import RequireMembership from "./RequireMembership";
import { DateRange } from "react-day-picker";

interface HotelDetailsProps {
  hotel?: {
    id: string;
    name: string;
    location: string;
    description: string;
    amenities: string[];
    images: string[];
    price: {
      standard: number;
      club: number;
    };
    rating: number;
  };
  onSave?: () => void;
  onRequestQuote?: (data: any) => void;
}

const defaultHotel = {
  id: "1",
  name: "Luxury Beach Resort & Spa",
  location: "Maldives",
  description:
    "Experience paradise in our overwater villas with direct access to crystal clear waters.",
  amenities: ["Private Pool", "Ocean View", "Spa Access", "Butler Service"],
  images: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  ],
  price: {
    standard: 1200,
    club: 950,
  },
  rating: 4.8,
};

const HotelDetails = ({
  hotel = defaultHotel,
  onSave,
  onRequestQuote,
}: HotelDetailsProps) => {
  const { membershipType, isAuthenticated } = useMembership();
  const [date, setDate] = React.useState<DateRange | undefined>();

  const [guests, setGuests] = React.useState({
    adults: 2,
    children: [],
  });

  const handleRequestQuote = (data: any) => {
    if (!isAuthenticated) {
      return;
    }
    onRequestQuote?.({
      ...data,
      membershipType,
      price:
        membershipType === "club" ? hotel.price.club : hotel.price.standard,
    });
  };

  return (
    <RequireMembership requiredType="browser">
      <div className="w-full max-w-6xl mx-auto p-6 space-y-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {hotel.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="aspect-[4/3] overflow-hidden rounded-lg"
                >
                  <img
                    src={image}
                    alt={`${hotel.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{hotel.name}</h1>
              <p className="text-muted-foreground">{hotel.location}</p>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary">⭐ {hotel.rating}</Badge>
              {hotel.amenities.map((amenity) => (
                <Badge key={amenity} variant="outline">
                  {amenity}
                </Badge>
              ))}
            </div>

            <p className="text-lg">{hotel.description}</p>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-2xl font-bold">
                      ${hotel.price.standard}
                    </p>
                    <p className="text-sm text-muted-foreground">per night</p>
                  </div>
                  {membershipType === "club" ? (
                    <div className="text-right">
                      <p className="text-lg font-semibold text-primary">
                        Club Price: ${hotel.price.club}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Save ${hotel.price.standard - hotel.price.club} per
                        night
                      </p>
                    </div>
                  ) : (
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        Join Club to save $
                        {hotel.price.standard - hotel.price.club} per night
                      </p>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={setDate}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>

                    <GuestSelector value={guests} onGuestsChange={setGuests} />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  className="flex-1"
                  onClick={() => handleRequestQuote({ dates: date, guests })}
                >
                  Request Quote
                </Button>
                <Button variant="outline" className="flex-1" onClick={onSave}>
                  <Heart className="mr-2 h-4 w-4" />
                  Save for Later
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </RequireMembership>
  );
};

export default HotelDetails;
