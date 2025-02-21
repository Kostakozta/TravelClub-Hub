import React from "react";
import { Card, CardContent, CardHeader, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

interface PersonalDetailsProps {
  user?: any;
  onUpdate?: (data: any) => void;
}

export const PersonalDetails = ({ user, onUpdate }: PersonalDetailsProps) => {
  const [formData, setFormData] = React.useState({
    personalInfo: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      dateOfBirth: user?.dateOfBirth || "",
      nationality: user?.nationality || "",
      passportNumber: user?.passportNumber || "",
      passportExpiry: user?.passportExpiry || "",
    },
    familyMembers: user?.familyMembers || [
      { name: "", relationship: "", dateOfBirth: "" },
    ],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate?.(formData);
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      familyMembers: [
        ...formData.familyMembers,
        { name: "", relationship: "", dateOfBirth: "" },
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <p className="text-sm text-muted-foreground">
              Update your personal details and travel documents
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        firstName: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        lastName: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.personalInfo.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        email: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.personalInfo.phone}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        phone: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>

            <Separator className="my-4" />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passportNumber">Passport Number</Label>
                <Input
                  id="passportNumber"
                  value={formData.personalInfo.passportNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        passportNumber: e.target.value,
                      },
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="passportExpiry">Passport Expiry</Label>
                <Input
                  id="passportExpiry"
                  type="date"
                  value={formData.personalInfo.passportExpiry}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      personalInfo: {
                        ...formData.personalInfo,
                        passportExpiry: e.target.value,
                      },
                    })
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold">Family Members</h3>
                <p className="text-sm text-muted-foreground">
                  Add family members for easier booking
                </p>
              </div>
              <Button type="button" variant="outline" onClick={addFamilyMember}>
                Add Member
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.familyMembers.map((member: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={member.name}
                    onChange={(e) => {
                      const newMembers = [...formData.familyMembers];
                      newMembers[index].name = e.target.value;
                      setFormData({ ...formData, familyMembers: newMembers });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Relationship</Label>
                  <Input
                    value={member.relationship}
                    onChange={(e) => {
                      const newMembers = [...formData.familyMembers];
                      newMembers[index].relationship = e.target.value;
                      setFormData({ ...formData, familyMembers: newMembers });
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={member.dateOfBirth}
                    onChange={(e) => {
                      const newMembers = [...formData.familyMembers];
                      newMembers[index].dateOfBirth = e.target.value;
                      setFormData({ ...formData, familyMembers: newMembers });
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </div>
    </form>
  );
};
