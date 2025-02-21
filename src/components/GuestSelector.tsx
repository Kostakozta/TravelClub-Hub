import React from "react";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Users } from "lucide-react";
import { Input } from "./ui/input";

interface GuestSelectorProps {
  onGuestsChange: (guests: {
    adults: number;
    children: { age: number }[];
  }) => void;
  value: {
    adults: number;
    children: { age: number }[];
  };
}

export const GuestSelector = ({
  onGuestsChange,
  value,
}: GuestSelectorProps) => {
  const handleAdultsChange = (increment: number) => {
    const newAdults = Math.max(1, value.adults + increment);
    onGuestsChange({ ...value, adults: newAdults });
  };

  const handleAddChild = () => {
    onGuestsChange({
      ...value,
      children: [...value.children, { age: 0 }],
    });
  };

  const handleChildAgeChange = (index: number, age: number) => {
    const newChildren = [...value.children];
    newChildren[index] = { age: Math.min(17, Math.max(0, age)) };
    onGuestsChange({ ...value, children: newChildren });
  };

  const handleRemoveChild = (index: number) => {
    const newChildren = value.children.filter((_, i) => i !== index);
    onGuestsChange({ ...value, children: newChildren });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Users className="mr-2 h-4 w-4" />
          {value.adults} Adult{value.adults !== 1 ? "s" : ""},{" "}
          {value.children.length} Child
          {value.children.length !== 1 ? "ren" : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Adults</span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAdultsChange(-1)}
                disabled={value.adults <= 1}
              >
                -
              </Button>
              <span>{value.adults}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleAdultsChange(1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Children</span>
              <Button variant="outline" size="sm" onClick={handleAddChild}>
                Add Child
              </Button>
            </div>
            {value.children.map((child, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  max={17}
                  value={child.age}
                  onChange={(e) =>
                    handleChildAgeChange(index, parseInt(e.target.value))
                  }
                  className="w-20"
                  placeholder="Age"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveChild(index)}
                >
                  ×
                </Button>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
