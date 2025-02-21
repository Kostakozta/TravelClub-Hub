import React from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { MapPin, Star, Award } from "lucide-react";

interface Review {
  id: string;
  hotelName: string;
  location: string;
  rating: number;
  content: string;
  date: Date;
}

interface SharedDeal {
  id: string;
  hotelName: string;
  location: string;
  discount: number;
  expiryDate: Date;
  sharedDate: Date;
}

interface MemberProfileProps {
  member?: {
    id: string;
    name: string;
    avatar?: string;
    memberSince: Date;
    membershipType: "club" | "browser";
    location?: string;
    bio?: string;
    travelPreferences?: string[];
    reviews?: Review[];
    sharedDeals?: SharedDeal[];
    badges?: string[];
  };
}

const defaultMember = {
  id: "1",
  name: "Sarah Thompson",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  memberSince: new Date(2023, 0, 1),
  membershipType: "club" as const,
  location: "London, UK",
  bio: "Passionate traveler exploring luxury destinations. Always looking for unique experiences and hidden gems.",
  travelPreferences: ["Luxury Hotels", "Beach Resorts", "Cultural Experiences"],
  badges: ["Elite Traveler", "Deal Hunter", "Top Reviewer"],
  reviews: [
    {
      id: "1",
      hotelName: "Grand Resort & Spa",
      location: "Maldives",
      rating: 5,
      content: "An absolutely stunning experience with impeccable service.",
      date: new Date(2024, 1, 15),
    },
  ],
  sharedDeals: [
    {
      id: "1",
      hotelName: "Luxury Beach Resort",
      location: "Bali",
      discount: 30,
      expiryDate: new Date(2024, 5, 1),
      sharedDate: new Date(2024, 2, 1),
    },
  ],
};

const MemberProfile = ({ member = defaultMember }: MemberProfileProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{member.name}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <MapPin className="h-4 w-4" />
                    {member.location}
                  </div>
                </div>
                <Badge
                  variant={
                    member.membershipType === "club" ? "default" : "secondary"
                  }
                >
                  {member.membershipType === "club" ? "Club Member" : "Browser"}
                </Badge>
              </div>
              <p className="mt-4 text-muted-foreground">{member.bio}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {member.badges?.map((badge) => (
                  <Badge key={badge} variant="outline" className="gap-1">
                    <Award className="h-3 w-3" /> {badge}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Reviews</h3>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {member.reviews?.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{review.hotelName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {review.location}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-primary text-primary" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{review.content}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {review.date.toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Shared Deals</h3>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {member.sharedDeals?.map((deal) => (
                  <Card key={deal.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{deal.hotelName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {deal.location}
                          </p>
                        </div>
                        <Badge>{deal.discount}% OFF</Badge>
                      </div>
                      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                        <span>
                          Shared: {deal.sharedDate.toLocaleDateString()}
                        </span>
                        <span>
                          Expires: {deal.expiryDate.toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberProfile;
