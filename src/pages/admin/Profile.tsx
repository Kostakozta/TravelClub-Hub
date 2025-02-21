import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AdminProfile = () => {
  const [profile, setProfile] = React.useState({
    name: localStorage.getItem("adminName") || "Admin",
    email: localStorage.getItem("adminEmail") || "admin@example.com",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${localStorage.getItem("adminId") || "Admin"}`,
    role: "Super Admin",
    lastLogin: new Date().toLocaleString(),
  });

  return (
    <AdminLayout currentPath="/admin/profile">
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Admin Profile</h2>

        <Card>
          <CardHeader>
            <div className="flex items-start gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatar} />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
                <p className="text-sm text-muted-foreground">
                  Last login: {profile.lastLogin}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) =>
                      setProfile({ ...profile, email: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={profile.avatar}
                  onChange={(e) =>
                    setProfile({ ...profile, avatar: e.target.value })
                  }
                />
              </div>

              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Security Settings</h3>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            <div className="flex justify-end">
              <Button variant="outline">Change Password</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
