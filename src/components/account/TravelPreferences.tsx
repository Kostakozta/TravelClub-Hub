import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface TravelPreferencesProps {
  onUpdate?: (preferences: any) => void;
}

export const TravelPreferences = ({ onUpdate }: TravelPreferencesProps) => {
  const [preferences, setPreferences] = React.useState({
    alwaysBookTransfer: true,
    proposeFlights: true,
    preferredFlightClass: "business",
    mealPreferences: "regular",
    roomPreferences: {
      smoking: false,
      highFloor: true,
      quietRoom: true,
    },
    extras: {
      airportLounge: true,
      fastTrackSecurity: true,
      spaAccess: true,
    },
  });

  const handleUpdate = () => {
    onUpdate?.(preferences);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Travel Preferences</h3>
          <p className="text-sm text-muted-foreground">
            Set your default travel preferences for all bookings
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Always Book Transfer</Label>
                <p className="text-sm text-muted-foreground">
                  Include airport transfers with all bookings
                </p>
              </div>
              <Switch
                checked={preferences.alwaysBookTransfer}
                onCheckedChange={(checked) =>
                  setPreferences({
                    ...preferences,
                    alwaysBookTransfer: checked,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Propose Flights</Label>
                <p className="text-sm text-muted-foreground">
                  Include flight options with hotel quotes
                </p>
              </div>
              <Switch
                checked={preferences.proposeFlights}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, proposeFlights: checked })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Preferred Flight Class</Label>
              <Select
                value={preferences.preferredFlightClass}
                onValueChange={(value) =>
                  setPreferences({
                    ...preferences,
                    preferredFlightClass: value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="economy">Economy</SelectItem>
                  <SelectItem value="premium">Premium Economy</SelectItem>
                  <SelectItem value="business">Business Class</SelectItem>
                  <SelectItem value="first">First Class</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Room Preferences</h4>
            <div className="space-y-2">
              {Object.entries(preferences.roomPreferences).map(
                ([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label className="capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </Label>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setPreferences({
                          ...preferences,
                          roomPreferences: {
                            ...preferences.roomPreferences,
                            [key]: checked,
                          },
                        })
                      }
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Extra Services</h4>
            <div className="space-y-2">
              {Object.entries(preferences.extras).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label className="capitalize">
                    {key.replace(/([A-Z])/g, " $1")}
                  </Label>
                  <Switch
                    checked={value}
                    onCheckedChange={(checked) =>
                      setPreferences({
                        ...preferences,
                        extras: { ...preferences.extras, [key]: checked },
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleUpdate}>Save Preferences</Button>
      </div>
    </div>
  );
};
