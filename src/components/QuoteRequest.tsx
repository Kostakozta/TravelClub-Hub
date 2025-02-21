import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface QuoteRequestProps {
  hotelDetails?: {
    id: string;
    name: string;
    location: string;
  };
  dates?: {
    checkIn: Date;
    checkOut: Date;
  };
  onSubmit?: (data: any) => void;
}

const QuoteRequest = ({ hotelDetails, dates, onSubmit }: QuoteRequestProps) => {
  const [specialRequests, setSpecialRequests] = React.useState("");
  const [budget, setBudget] = React.useState("");
  const [urgency, setUrgency] = React.useState("normal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.({ specialRequests, budget, urgency });
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Request Quote</h2>
        {hotelDetails && (
          <div className="text-muted-foreground">
            <p>{hotelDetails.name}</p>
            <p>{hotelDetails.location}</p>
          </div>
        )}
        {dates && (
          <p className="text-sm text-muted-foreground">
            {dates.checkIn.toLocaleDateString()} -{" "}
            {dates.checkOut.toLocaleDateString()}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Budget Range (per night)</Label>
            <Input
              id="budget"
              placeholder="e.g. $200-$300"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency">Response Urgency</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger>
                <SelectValue placeholder="Select urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  Not Urgent (within 48 hours)
                </SelectItem>
                <SelectItem value="normal">Normal (within 24 hours)</SelectItem>
                <SelectItem value="high">Urgent (within 12 hours)</SelectItem>
                <SelectItem value="immediate">Immediate (ASAP)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-requests">Special Requests</Label>
            <Textarea
              id="special-requests"
              placeholder="Any special requirements or preferences..."
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full">
          Submit Quote Request
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuoteRequest;
