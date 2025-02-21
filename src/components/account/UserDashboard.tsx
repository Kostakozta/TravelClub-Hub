import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { PersonalDetails } from "./PersonalDetails";
import { BookingHistory } from "./BookingHistory";
import { TravelPreferences } from "./TravelPreferences";
import { MembershipManagement } from "./MembershipManagement";

interface UserDashboardProps {
  user?: {
    name: string;
    email: string;
    membershipType: "none" | "browser" | "club";
    memberSince: Date;
    referralCode?: string;
  };
  onUpdate?: (data: any) => void;
}

const UserDashboard = ({ user, onUpdate }: UserDashboardProps) => {
  const defaultUser = {
    name: "John Doe",
    email: "john@example.com",
    membershipType: "club" as const,
    memberSince: new Date(2023, 0, 1),
    referralCode: "JOHND2024",
  };

  const currentUser = user || defaultUser;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {currentUser.name}</h1>
        <p className="text-muted-foreground">
          Member since {currentUser.memberSince.toLocaleDateString()}
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="bookings">Bookings & Requests</TabsTrigger>
          <TabsTrigger value="preferences">Travel Preferences</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="personal">
            <PersonalDetails user={currentUser} onUpdate={onUpdate} />
          </TabsContent>

          <TabsContent value="bookings">
            <BookingHistory />
          </TabsContent>

          <TabsContent value="preferences">
            <TravelPreferences onUpdate={onUpdate} />
          </TabsContent>

          <TabsContent value="membership">
            <MembershipManagement user={currentUser} onUpdate={onUpdate} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default UserDashboard;
