import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "@/components/admin/Dashboard";

const DashboardPage = () => {
  return (
    <AdminLayout currentPath="/admin">
      <AdminDashboard />
    </AdminLayout>
  );
};

export default DashboardPage;
