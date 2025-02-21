import React, { createContext, useContext, useState } from "react";

type MembershipType = "none" | "browser" | "club";

interface MembershipContextType {
  membershipType: MembershipType;
  isAuthenticated: boolean;
  login: (type: MembershipType) => void;
  logout: () => void;
}

const MembershipContext = createContext<MembershipContextType>(
  {} as MembershipContextType,
);

export function MembershipProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [membershipType, setMembershipType] = useState<MembershipType>("none");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (type: MembershipType) => {
    setMembershipType(type);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setMembershipType("none");
    setIsAuthenticated(false);
  };

  return (
    <MembershipContext.Provider
      value={{ membershipType, isAuthenticated, login, logout }}
    >
      {children}
    </MembershipContext.Provider>
  );
}

export const useMembership = () => useContext(MembershipContext);
