import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { HotelManagement } from "@/components/admin/HotelManagement";

const HotelsPage = () => {
  return (
    <AdminLayout currentPath="/admin/hotels">
      <HotelManagement />
    </AdminLayout>
  );
};

export default HotelsPage;
