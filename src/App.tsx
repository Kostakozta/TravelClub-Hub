import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import UserDashboard from "./components/account/UserDashboard";
import routes from "tempo-routes";
import { MembershipProvider } from "./contexts/MembershipContext";

function App() {
  return (
    <MembershipProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/account" element={<UserDashboard />} />
          </Routes>
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
        </>
      </Suspense>
    </MembershipProvider>
  );
}

export default App;
