import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ScrollArea } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface BookingHistoryProps {
  bookings?: Array<{
    id: string;
    hotelName: string;
    location: string;
    checkIn: Date;
    checkOut: Date;
    status: "upcoming" | "completed" | "cancelled";
    totalAmount: number;
  }>;
  requests?: Array<{
    id: string;
    type: "quote" | "support" | "change";
    subject: string;
    status: "open" | "in-progress" | "resolved" | "closed";
    createdAt: Date;
    lastUpdated: Date;
  }>;
}

export const BookingHistory = ({
  bookings = [
    {
      id: "B001",
      hotelName: "Luxury Beach Resort",
      location: "Maldives",
      checkIn: new Date(2024, 5, 15),
      checkOut: new Date(2024, 5, 22),
      status: "upcoming" as const,
      totalAmount: 2499,
    },
    {
      id: "B002",
      hotelName: "Mountain Lodge",
      location: "Swiss Alps",
      checkIn: new Date(2023, 11, 10),
      checkOut: new Date(2023, 11, 17),
      status: "completed" as const,
      totalAmount: 1899,
    },
  ],
  requests = [
    {
      id: "R001",
      type: "quote" as const,
      subject: "Luxury Beach Resort Quote Request",
      status: "in-progress" as const,
      createdAt: new Date(2024, 0, 15),
      lastUpdated: new Date(2024, 0, 16),
    },
  ],
}: BookingHistoryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      case "in-progress":
        return "bg-yellow-500";
      case "open":
        return "bg-blue-500";
      case "resolved":
        return "bg-green-500";
      case "closed":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Bookings & Requests History</h3>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bookings">
          <TabsList>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{booking.hotelName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {booking.location}
                          </p>
                          <p className="text-sm mt-2">
                            {booking.checkIn.toLocaleDateString()} -{" "}
                            {booking.checkOut.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status.charAt(0).toUpperCase() +
                              booking.status.slice(1)}
                          </Badge>
                          <p className="mt-2 font-semibold">
                            ${booking.totalAmount}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="requests">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {requests.map((request) => (
                  <Card key={request.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{request.subject}</h4>
                          <p className="text-sm text-muted-foreground">
                            {request.type.charAt(0).toUpperCase() +
                              request.type.slice(1)}{" "}
                            Request
                          </p>
                          <p className="text-sm mt-2">
                            Created: {request.createdAt.toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(request.status)}>
                            {request.status.charAt(0).toUpperCase() +
                              request.status.slice(1)}
                          </Badge>
                          <p className="text-sm mt-2">
                            Last Updated:{" "}
                            {request.lastUpdated.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
