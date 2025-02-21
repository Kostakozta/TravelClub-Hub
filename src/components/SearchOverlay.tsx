import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Calendar as CalendarIcon,
  Building2,
  Search,
  Moon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GuestSelector } from "./GuestSelector";

interface SearchOverlayProps {
  onSearch?: (searchParams: {
    destination: string;
    dates: DateRange | undefined;
    guests: {
      adults: number;
      children: { age: number }[];
    };
    rooms: number;
    mealPlan: string;
  }) => void;
}

const SearchOverlay = ({ onSearch }: SearchOverlayProps) => {
  const [nights, setNights] = React.useState("7");
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  const [destination, setDestination] = React.useState("");
  const [guests, setGuests] = React.useState({ adults: 2, children: [] });
  const [rooms, setRooms] = React.useState("1");
  const [mealPlan, setMealPlan] = React.useState("");

  const handleSearch = () => {
    onSearch?.({
      destination,
      dates: date,
      guests,
      rooms: parseInt(rooms),
      mealPlan,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/95 backdrop-blur-md rounded-lg shadow-xl p-6 border border-gray-200/20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1">
          <Input
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="col-span-2 grid grid-cols-2 gap-4">
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
                      {format(date.from, "LLL dd")} -{" "}
                      {format(date.to, "LLL dd")}
                    </>
                  ) : (
                    format(date.from, "LLL dd")
                  )
                ) : (
                  <span>Pick dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={(newDate) => {
                  setDate(newDate);
                  if (newDate?.from && newDate?.to) {
                    const diffTime = Math.abs(
                      newDate.to.getTime() - newDate.from.getTime(),
                    );
                    const diffDays = Math.ceil(
                      diffTime / (1000 * 60 * 60 * 24),
                    );
                    setNights(diffDays.toString());
                  }
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select
            value={nights}
            onValueChange={(value) => {
              setNights(value);
              if (date?.from) {
                const newTo = new Date(date.from);
                newTo.setDate(date.from.getDate() + parseInt(value));
                setDate({ from: date.from, to: newTo });
              }
            }}
          >
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center">
                  <Moon className="mr-2 h-4 w-4" />
                  {nights} Night{parseInt(nights) !== 1 ? "s" : ""}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 14, 21, 28].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Night{num !== 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1">
          <GuestSelector value={guests} onGuestsChange={setGuests} />
        </div>

        <div className="col-span-1">
          <Select value={rooms} onValueChange={setRooms}>
            <SelectTrigger>
              <SelectValue>
                <div className="flex items-center">
                  <Building2 className="mr-2 h-4 w-4" />
                  {rooms} Room{parseInt(rooms) !== 1 ? "s" : ""}
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} Room{num !== 1 ? "s" : ""}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-1">
          <Select value={mealPlan} onValueChange={setMealPlan}>
            <SelectTrigger>
              <SelectValue placeholder="Meal Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bb">Bed & Breakfast</SelectItem>
              <SelectItem value="hb">Half Board</SelectItem>
              <SelectItem value="fb">Full Board</SelectItem>
              <SelectItem value="ai">All Inclusive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-4 flex justify-center">
        <Button
          onClick={handleSearch}
          className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white transition-all duration-300 transform hover:scale-105"
        >
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchOverlay;
