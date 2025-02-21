import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Share2 } from "lucide-react";

interface MembershipManagementProps {
  user?: {
    membershipType: "none" | "browser" | "club";
    memberSince: Date;
    referralCode?: string;
    nextBillingDate?: Date;
    referralCount?: number;
    cashbackEarned?: number;
  };
  onUpdate?: (data: any) => void;
}

export const MembershipManagement = ({
  user,
  onUpdate,
}: MembershipManagementProps) => {
  const defaultUser = {
    membershipType: "club" as const,
    memberSince: new Date(2023, 0, 1),
    referralCode: "JOHND2024",
    nextBillingDate: new Date(2024, 11, 31),
    referralCount: 3,
    cashbackEarned: 60,
  };

  const currentUser = user || defaultUser;

  const copyReferralCode = () => {
    navigator.clipboard.writeText(currentUser.referralCode || "");
    // You might want to show a toast notification here
  };

  const getMembershipColor = (type: string) => {
    switch (type) {
      case "club":
        return "bg-primary text-primary-foreground";
      case "browser":
        return "bg-secondary text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Current Membership</h3>
              <p className="text-sm text-muted-foreground">
                Manage your membership and referrals
              </p>
            </div>
            <Badge className={getMembershipColor(currentUser.membershipType)}>
              {currentUser.membershipType === "club"
                ? "Club Member"
                : "Browser"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <div className="flex justify-between items-center">
              <div>
                <Label>Member Since</Label>
                <p className="text-sm text-muted-foreground">
                  {currentUser.memberSince.toLocaleDateString()}
                </p>
              </div>
              {currentUser.nextBillingDate && (
                <div className="text-right">
                  <Label>Next Billing Date</Label>
                  <p className="text-sm text-muted-foreground">
                    {currentUser.nextBillingDate.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <Label>Your Referral Code</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    value={currentUser.referralCode}
                    readOnly
                    className="font-mono"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyReferralCode}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold">
                        {currentUser.referralCount}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Friends Referred
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h4 className="text-2xl font-bold">
                        £{currentUser.cashbackEarned}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Cashback Earned
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {currentUser.membershipType === "browser" && (
        <div className="flex justify-end">
          <Button onClick={() => onUpdate?.({ action: "upgrade" })}>
            Upgrade to Club Membership
          </Button>
        </div>
      )}

      {currentUser.membershipType === "club" && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Referral Program</h3>
            <p className="text-sm text-muted-foreground">
              Invite friends and earn 1 month cashback for each successful
              referral
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>
                Share your referral code with friends and when they join as club
                members, you&apos;ll receive a month&apos;s membership fee as
                cashback!
              </p>
              <Button
                className="w-full"
                onClick={() => onUpdate?.({ action: "share" })}
              >
                Share Referral Link
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
