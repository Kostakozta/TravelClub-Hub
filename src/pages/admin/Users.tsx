import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import UsersManagement from "@/components/admin/UsersManagement";

const UsersPage = () => {
  return (
    <AdminLayout currentPath="/admin/users">
      <UsersManagement />
    </AdminLayout>
  );
};

export default UsersPage;
