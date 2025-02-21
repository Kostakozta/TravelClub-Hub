import { Suspense, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import UserDashboard from "./components/account/UserDashboard";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Pricing from "./pages/membership/Pricing";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminProfile from "./pages/admin/Profile";
import AdminHotels from "./pages/admin/Hotels";
import DestinationsPage from "./pages/destinations";
import HotelDetailsPage from "./pages/destinations/[id]";
import routes from "tempo-routes";
import { MembershipProvider } from "./contexts/MembershipContext";
import { NotificationsProvider } from "./components/NotificationsProvider";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthProvider>
      <MembershipProvider>
        <NotificationsProvider>
          <Suspense fallback={<p>Loading...</p>}>
            {/* Tempo routes need to be before our routes to avoid catchall conflicts */}
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/membership/pricing" element={<Pricing />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredType="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute requiredType="admin">
                    <AdminUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/profile"
                element={
                  <ProtectedRoute requiredType="admin">
                    <AdminProfile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/hotels"
                element={
                  <ProtectedRoute requiredType="admin">
                    <AdminHotels />
                  </ProtectedRoute>
                }
              />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route
                path="/destinations/:id"
                element={
                  <ProtectedRoute>
                    <HotelDetailsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </NotificationsProvider>
      </MembershipProvider>
    </AuthProvider>
  );
}

export default App;
