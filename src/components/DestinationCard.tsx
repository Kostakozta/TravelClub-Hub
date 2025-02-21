import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Heart } from "lucide-react";

interface DestinationCardProps {
  imageUrl?: string;
  title?: string;
  description?: string;
  price?: number;
  memberPrice?: number;
  rating?: number;
  location?: string;
  membershipType?: "none" | "browser" | "club";
}

const DestinationCard = ({
  imageUrl = "https://images.unsplash.com/photo-1562790351-d273a961e0e9?w=800&auto=format&fit=crop",
  title = "Luxury Resort & Spa",
  description = "Experience ultimate relaxation in this 5-star beachfront resort",
  price = 499,
  memberPrice = 399,
  rating = 4.8,
  location = "Maldives",
  membershipType = "none",
}: DestinationCardProps) => {
  return (
    <Card className="w-[380px] h-[280px] overflow-hidden group bg-white rounded-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <CardContent className="p-0 relative h-full">
        <div className="relative h-full">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <p className="text-sm text-gray-200">{location}</p>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-white hover:text-rose-500 transition-colors"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save to favorites</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm">⭐ {rating}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm">from</span>
                  {membershipType === "club" ? (
                    <div>
                      <p className="text-xl font-bold">${memberPrice}/night</p>
                      <p className="text-sm line-through text-muted-foreground">
                        ${price}/night
                      </p>
                    </div>
                  ) : membershipType === "browser" ? (
                    <div>
                      <p className="text-xl font-bold">${price}/night</p>
                      <p className="text-sm text-primary">
                        Club price: ${memberPrice}/night
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xl font-bold">${price}/night</p>
                      <Button
                        variant="link"
                        className="text-sm p-0 h-auto text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.location.href = "/membership";
                        }}
                      >
                        View member prices
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;
