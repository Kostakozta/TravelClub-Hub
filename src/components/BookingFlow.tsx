import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import { GuestSelector } from "./GuestSelector";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { supabase } from "@/lib/supabase";

interface BookingFlowProps {
  hotel: any;
  onComplete?: () => void;
}

const BookingFlow = ({ hotel, onComplete }: BookingFlowProps) => {
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

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold">Book Your Stay</h2>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Select Dates</h3>
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
              <h3 className="font-medium">Guests</h3>
              <GuestSelector
                value={bookingData.guests}
                onGuestsChange={(guests) =>
                  setBookingData({ ...bookingData, guests })
                }
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Room Type</h3>
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
              <h3 className="font-medium">Meal Plan</h3>
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
              <h3 className="font-medium">Special Requests</h3>
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
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
        <Button
          onClick={() => {
            if (step === 1) setStep(2);
            else handleSubmitQuote();
          }}
        >
          {step === 1 ? "Next" : "Request Quote"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookingFlow;
