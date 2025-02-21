import React from "react";
import { Card, CardContent } from "./ui/card";
import { Shield, Gift, Clock, CreditCard } from "lucide-react";

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const BenefitCard = ({ icon, title, description }: BenefitCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-200/50">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

const benefitIcons = {
  shield: <Shield className="w-6 h-6 text-primary" />,
  gift: <Gift className="w-6 h-6 text-primary" />,
  clock: <Clock className="w-6 h-6 text-primary" />,
  creditCard: <CreditCard className="w-6 h-6 text-primary" />,
} as const;

type BenefitIconType = keyof typeof benefitIcons;

interface MembershipBenefitsProps {
  benefits?: Array<{
    icon: BenefitIconType;
    title: string;
    description: string;
  }>;
}

const defaultBenefits = [
  {
    icon: "shield" as BenefitIconType,
    title: "Premium Protection",
    description:
      "Comprehensive travel insurance and 24/7 support for peace of mind",
  },
  {
    icon: "gift" as BenefitIconType,
    title: "Exclusive Perks",
    description: "Access to VIP lounges, room upgrades, and special amenities",
  },
  {
    icon: "clock" as BenefitIconType,
    title: "Priority Access",
    description:
      "Early booking windows and last-minute availability guarantees",
  },
  {
    icon: "creditCard" as BenefitIconType,
    title: "Member Pricing",
    description: "Special rates and discounts available only to club members",
  },
];

const MembershipBenefits = ({
  benefits = defaultBenefits,
}: MembershipBenefitsProps) => {
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Membership Benefits</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our exclusive travel club and unlock a world of premium
            benefits and unique experiences
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              icon={benefitIcons[benefit.icon]}
              title={benefit.title}
              description={benefit.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembershipBenefits;
