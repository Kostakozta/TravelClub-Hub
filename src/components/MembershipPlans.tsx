import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

import { Check } from "lucide-react";

interface PlanFeature {
  included: boolean;
  text: string;
}

interface MembershipPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: PlanFeature[];
  highlighted?: boolean;
}

const plans: MembershipPlan[] = [
  {
    name: "Browsing Subscription",
    price: 3,
    period: "month",
    description: "Perfect for exploring our exclusive deals before committing",
    features: [
      { included: true, text: "View member-only prices" },
      { included: true, text: "Unlimited price checks" },
      { included: true, text: "Basic travel guides" },
      { included: false, text: "Member discounts" },
      { included: false, text: "Priority booking" },
      { included: false, text: "Exclusive events access" },
    ],
  },
  {
    name: "Club Membership",
    price: 20,
    period: "month",
    description: "Billed annually. Full access to all premium benefits",
    features: [
      { included: true, text: "All Browsing features" },
      { included: true, text: "Member-only discounts" },
      { included: true, text: "Priority booking access" },
      { included: true, text: "Exclusive events & experiences" },
      { included: true, text: "Premium travel guides" },
      { included: true, text: "24/7 concierge service" },
    ],
    highlighted: true,
  },
];

interface MembershipPlansProps {
  onSelectPlan?: (planName: string) => void;
}

const MembershipPlans = ({ onSelectPlan }: MembershipPlansProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Choose Your Membership</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the plan that best suits your travel needs
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative ${plan.highlighted ? "border-primary shadow-lg" : ""}`}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader>
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="mt-2">
                <span className="text-4xl font-bold">£{plan.price}</span>
                <span className="text-muted-foreground">/{plan.period}</span>
              </div>
              <p className="text-muted-foreground mt-2">{plan.description}</p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check
                      className={`h-5 w-5 ${feature.included ? "text-primary" : "text-muted-foreground/50"}`}
                    />
                    <span
                      className={
                        feature.included ? "" : "text-muted-foreground"
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className="w-full"
                variant={plan.highlighted ? "default" : "outline"}
                onClick={() => {
                  if (onSelectPlan) {
                    onSelectPlan(plan.name);
                  } else {
                    navigate(
                      `/signup?plan=${plan.highlighted ? "club" : "browser"}`,
                    );
                  }
                }}
              >
                {plan.highlighted ? "Join Now" : "Start Browsing"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MembershipPlans;
