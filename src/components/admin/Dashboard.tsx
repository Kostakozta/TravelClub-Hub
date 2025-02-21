import React from "react";
import { Card, CardContent } from "../ui/card";
import { Users, Hotel, CreditCard, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "1,234",
    change: "+12%",
    changeLabel: "vs last month",
    icon: <Users className="w-4 h-4 text-primary" />,
  },
  {
    label: "Active Hotels",
    value: "156",
    change: "+5%",
    changeLabel: "vs last month",
    icon: <Hotel className="w-4 h-4 text-primary" />,
  },
  {
    label: "Revenue",
    value: "$45,678",
    change: "+8%",
    changeLabel: "vs last month",
    icon: <CreditCard className="w-4 h-4 text-primary" />,
  },
  {
    label: "Bookings",
    value: "892",
    change: "+15%",
    changeLabel: "vs last month",
    icon: <TrendingUp className="w-4 h-4 text-primary" />,
  },
];

const recentActivity = [
  "New user registration: John Doe",
  "Booking confirmed: Luxury Beach Resort",
  "New review: 5 stars for Mountain Lodge",
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
                  {stat.changeLabel}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
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
    </div>
  );
};

export default AdminDashboard;
