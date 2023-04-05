"use client";

import { useEffect } from "react";

const Admin = () => {
  useEffect(() => {
    window.location.href = "/admin/add-person";
  }, []);

  return (
    <div>
      <h1 className="text-3xl">Welcome to the admin interface!</h1>
    </div>
  );
};

export default Admin;
