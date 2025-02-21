import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Users, Hotel, CreditCard, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "1,234",
    change: "+12%",
    icon: <Users className="w-4 h-4" />,
  },
  {
    label: "Active Hotels",
    value: "156",
    change: "+5%",
    icon: <Hotel className="w-4 h-4" />,
  },
  {
    label: "Revenue",
    value: "$45,678",
    change: "+8%",
    icon: <CreditCard className="w-4 h-4" />,
  },
  {
    label: "Bookings",
    value: "892",
    change: "+15%",
    icon: <TrendingUp className="w-4 h-4" />,
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-green-500 font-medium">
                  {stat.change}
                </span>
                <span className="text-muted-foreground ml-2">
                  vs last month
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "New user registration: John Doe",
                "Booking confirmed: Luxury Beach Resort",
                "New review: 5 stars for Mountain Lodge",
                "Payment received: $1,299",
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span>{activity}</span>
                  <span className="text-sm text-muted-foreground">2m ago</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Popular Destinations</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Maldives", bookings: 156 },
                { name: "Swiss Alps", bookings: 129 },
                { name: "Bali", bookings: 98 },
                { name: "Santorini", bookings: 87 },
              ].map((destination, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-2 border-b last:border-0"
                >
                  <span>{destination.name}</span>
                  <span className="text-sm font-medium">
                    {destination.bookings} bookings
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
