import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Share2, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface DealShareProps {
  deal?: {
    id: string;
    hotelName: string;
    location: string;
    description: string;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    expiryDate: Date;
    terms?: string;
    images?: string[];
  };
  onShare?: (dealId: string, platform: string) => void;
}

const defaultDeal = {
  id: "1",
  hotelName: "Luxury Beach Resort",
  location: "Bali, Indonesia",
  description:
    "Experience paradise with our exclusive 5-night package including spa treatments and fine dining.",
  originalPrice: 2999,
  discountedPrice: 2099,
  discountPercentage: 30,
  expiryDate: new Date(2024, 5, 1),
  terms: "Blackout dates apply. Subject to availability.",
  images: [
    "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
  ],
};

const DealShare = ({ deal = defaultDeal, onShare }: DealShareProps) => {
  const [referralCode, setReferralCode] = React.useState("");

  const handleShare = (platform: string) => {
    onShare?.(deal.id, platform);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold">{deal.hotelName}</h2>
            <p className="text-muted-foreground">{deal.location}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              ${deal.discountedPrice}
            </p>
            <p className="text-sm text-muted-foreground line-through">
              ${deal.originalPrice}
            </p>
            <p className="text-sm font-medium text-primary">
              Save {deal.discountPercentage}%
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {deal.images && deal.images.length > 0 && (
          <img
            src={deal.images[0]}
            alt={deal.hotelName}
            className="w-full h-64 object-cover rounded-lg"
          />
        )}
        <p>{deal.description}</p>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>Expires {deal.expiryDate.toLocaleDateString()}</span>
        </div>
        {deal.terms && (
          <p className="text-sm text-muted-foreground">{deal.terms}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" /> Share Deal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share this Deal</DialogTitle>
              <DialogDescription>
                Share this exclusive deal with your friends and family.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Your Referral Code</Label>
                <div className="flex gap-2">
                  <Input
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Enter your referral code"
                  />
                  <Button variant="outline" onClick={() => handleShare("copy")}>
                    Copy Link
                  </Button>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => handleShare("whatsapp")}
                >
                  WhatsApp
                </Button>
                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => handleShare("email")}
                >
                  Email
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Button>Book Now</Button>
      </CardFooter>
    </Card>
  );
};

export default DealShare;
