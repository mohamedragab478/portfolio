import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../api';

const ProtectedRoute = ({ children }) => {
  const [authed, setAuthed] = useState(null); // null = checking

  useEffect(() => {
    setAuthed(isAuthenticated());
  }, []);

  if (authed === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-4 border-[#7c3aed]/30 border-t-[#d8b4fe] rounded-full animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return <Navigate to="/admin/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
