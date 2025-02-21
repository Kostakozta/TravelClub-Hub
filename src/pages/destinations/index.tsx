import React from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMembership } from "@/contexts/MembershipContext";
import { supabase } from "@/lib/supabase";
import DestinationCard from "@/components/DestinationCard";

const DestinationsPage = () => {
  const { isAuthenticated, membershipType } = useMembership();
  const [filters, setFilters] = React.useState({
    location: "",
    priceRange: [0, 1000],
    starRating: "all",
    amenities: [] as string[],
  });

  const [hotels, setHotels] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const amenitiesList = [
    "Pool",
    "Spa",
    "Beach Access",
    "Gym",
    "Restaurant",
    "Room Service",
    "Free WiFi",
    "Bar",
    "Airport Transfer",
  ];

  React.useEffect(() => {
    fetchHotels();
  }, [filters]);

  const fetchHotels = async () => {
    try {
      let query = supabase
        .from("hotels")
        .select("*")
        .gte("base_price", filters.priceRange[0])
        .lte("base_price", filters.priceRange[1]);

      if (filters.location) {
        query = query.ilike("location", `%${filters.location}%`);
      }

      if (filters.starRating !== "all") {
        query = query.eq("star_rating", parseInt(filters.starRating));
      }

      if (filters.amenities.length > 0) {
        query = query.contains("amenities", filters.amenities);
      }

      const { data, error } = await query;

      if (error) throw error;
      setHotels(data || []);
    } catch (error) {
      console.error("Error fetching hotels:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isLoggedIn={isAuthenticated}
        membershipType={membershipType}
      />

      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <Card className="w-64 h-fit sticky top-24">
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    placeholder="Search location..."
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Price Range</Label>
                  <div className="pt-2">
                    <Slider
                      min={0}
                      max={1000}
                      step={50}
                      value={filters.priceRange}
                      onValueChange={(value) =>
                        setFilters({ ...filters, priceRange: value })
                      }
                    />
                    <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Star Rating</Label>
                  <Select
                    value={filters.starRating}
                    onValueChange={(value) =>
                      setFilters({ ...filters, starRating: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All ratings" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ratings</SelectItem>
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <SelectItem key={rating} value={rating.toString()}>
                          {rating} Stars
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Amenities</Label>
                  <ScrollArea className="h-[200px] pr-4">
                    <div className="space-y-2">
                      {amenitiesList.map((amenity) => (
                        <div
                          key={amenity}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={amenity}
                            checked={filters.amenities.includes(amenity)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters({
                                  ...filters,
                                  amenities: [...filters.amenities, amenity],
                                });
                              } else {
                                setFilters({
                                  ...filters,
                                  amenities: filters.amenities.filter(
                                    (a) => a !== amenity,
                                  ),
                                });
                              }
                            }}
                          />
                          <label
                            htmlFor={amenity}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>

                <Button
                  className="w-full"
                  onClick={() =>
                    setFilters({
                      location: "",
                      priceRange: [0, 1000],
                      starRating: "all",
                      amenities: [],
                    })
                  }
                  variant="outline"
                >
                  Reset Filters
                </Button>
              </CardContent>
            </Card>

            {/* Hotels Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                  <p>Loading hotels...</p>
                ) : hotels.length > 0 ? (
                  hotels.map((hotel) => (
                    <DestinationCard
                      key={hotel.id}
                      imageUrl={hotel.images[0]}
                      title={hotel.name}
                      location={hotel.location}
                      price={hotel.base_price}
                      memberPrice={hotel.club_price}
                      rating={hotel.star_rating}
                      membershipType={membershipType}
                    />
                  ))
                ) : (
                  <p>No hotels found matching your criteria.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DestinationsPage;
