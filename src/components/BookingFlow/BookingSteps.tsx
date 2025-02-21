import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { GuestSelector } from "../GuestSelector";
import { Calendar } from "../ui/calendar";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { supabase } from "@/lib/supabase";

interface BookingStepsProps {
  hotel: any;
  onComplete?: () => void;
}

const BookingSteps = ({ hotel, onComplete }: BookingStepsProps) => {
  const [step, setStep] = React.useState(1);
  const [bookingData, setBookingData] = React.useState({
    dates: undefined as DateRange | undefined,
    guests: { adults: 2, children: [] },
    roomType: "",
    mealPlan: "",
    specialRequests: "",
  });

  const handleSubmitQuote = async () => {
    try {
      const { data, error } = await supabase.from("quote_requests").insert([
        {
          hotel_id: hotel.id,
          user_id: localStorage.getItem("userId"),
          check_in: bookingData.dates?.from,
          check_out: bookingData.dates?.to,
          guests: bookingData.guests,
          room_type: bookingData.roomType,
          meal_plan: bookingData.mealPlan,
          special_requests: bookingData.specialRequests,
          status: "pending",
        },
      ]);

      if (error) throw error;
      onComplete?.();
    } catch (error) {
      console.error("Error submitting quote:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Select Dates</Label>
              <Calendar
                mode="range"
                selected={bookingData.dates}
                onSelect={(range) =>
                  setBookingData({ ...bookingData, dates: range })
                }
                numberOfMonths={2}
                className="rounded-md border"
              />
            </div>

            <div className="space-y-2">
              <Label>Guests</Label>
              <GuestSelector
                value={bookingData.guests}
                onGuestsChange={(guests) =>
                  setBookingData({ ...bookingData, guests })
                }
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Room Type</Label>
              <Select
                value={bookingData.roomType}
                onValueChange={(value) =>
                  setBookingData({ ...bookingData, roomType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard Room</SelectItem>
                  <SelectItem value="deluxe">Deluxe Room</SelectItem>
                  <SelectItem value="suite">Suite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Meal Plan</Label>
              <Select
                value={bookingData.mealPlan}
                onValueChange={(value) =>
                  setBookingData({ ...bookingData, mealPlan: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select meal plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="room_only">Room Only</SelectItem>
                  <SelectItem value="breakfast">Bed & Breakfast</SelectItem>
                  <SelectItem value="half_board">Half Board</SelectItem>
                  <SelectItem value="full_board">Full Board</SelectItem>
                  <SelectItem value="all_inclusive">All Inclusive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Special Requests</Label>
              <Textarea
                value={bookingData.specialRequests}
                onChange={(e) =>
                  setBookingData({
                    ...bookingData,
                    specialRequests: e.target.value,
                  })
                }
                placeholder="Any special requests or preferences..."
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid gap-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Dates</span>
                <span>
                  {bookingData.dates?.from?.toLocaleDateString()} -{" "}
                  {bookingData.dates?.to?.toLocaleDateString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Guests</span>
                <span>
                  {bookingData.guests.adults} Adults,{" "}
                  {bookingData.guests.children.length} Children
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Room Type</span>
                <Badge>{bookingData.roomType}</Badge>
              </div>

              <div className="flex justify-between items-center">
                <span className="font-medium">Meal Plan</span>
                <Badge>{bookingData.mealPlan}</Badge>
              </div>

              {bookingData.specialRequests && (
                <div className="space-y-2">
                  <span className="font-medium">Special Requests</span>
                  <p className="text-sm text-muted-foreground">
                    {bookingData.specialRequests}
                  </p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Book Your Stay</h2>
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <Badge
                key={s}
                variant={s === step ? "default" : "outline"}
                className="w-8 h-8 rounded-full flex items-center justify-center"
              >
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>{renderStep()}</CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            if (step < 3) setStep(step + 1);
            else handleSubmitQuote();
          }}
        >
          {step === 3 ? "Submit Quote Request" : "Next"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingSteps;
