import React from "react";
import Navigation from "@/components/Navigation";
import MembershipPlans from "@/components/MembershipPlans";

const Pricing = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <MembershipPlans />
      </div>
    </div>
  );
};

export default Pricing;
