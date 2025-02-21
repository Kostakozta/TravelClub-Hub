import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import UserDashboard from "./components/account/UserDashboard";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Pricing from "./pages/membership/Pricing";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import routes from "tempo-routes";
import { MembershipProvider } from "./contexts/MembershipContext";

function App() {
  return (
    <MembershipProvider>
      <Suspense fallback={<p>Loading...</p>}>
        {/* Tempo routes need to be before our routes to avoid catchall conflicts */}
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/account" element={<UserDashboard />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/membership/pricing" element={<Pricing />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </Suspense>
    </MembershipProvider>
  );
}

export default App;
