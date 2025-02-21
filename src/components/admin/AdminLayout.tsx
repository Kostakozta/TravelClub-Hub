import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  LayoutDashboard,
  Users,
  Hotel,
  Settings,
  LogOut,
  Bell,
} from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
}

const AdminLayout = ({ children, currentPath = "" }: AdminLayoutProps) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: <LayoutDashboard className="w-4 h-4" />,
      label: "Dashboard",
      path: "/admin",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Users",
      path: "/admin/users",
    },
    {
      icon: <Hotel className="w-4 h-4" />,
      label: "Hotels",
      path: "/admin/hotels",
    },
    {
      icon: <Bell className="w-4 h-4" />,
      label: "Notifications",
      path: "/admin/notifications",
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: "Settings",
      path: "/admin/settings",
    },
    {
      icon: <Users className="w-4 h-4" />,
      label: "Profile",
      path: "/admin/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
        </div>
        <ScrollArea className="h-[calc(100vh-64px)]">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.path}
                variant={currentPath === item.path ? "default" : "ghost"}
                className="w-full justify-start gap-2"
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                {item.label}
              </Button>
            ))}
            <div className="pt-4 mt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => navigate("/signin")}
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
