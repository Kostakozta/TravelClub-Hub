import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./AuthContext";

type MembershipType = "none" | "browser" | "club" | "admin";

interface MembershipContextType {
  membershipType: MembershipType;
  isAuthenticated: boolean;
  login: (type: MembershipType) => void;
  logout: () => void;
}

const MembershipContext = createContext<MembershipContextType>(
  {} as MembershipContextType,
);

export const MembershipProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [membershipType, setMembershipType] = useState<MembershipType>("none");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
      fetchMembershipType(user.id);
    } else {
      setIsAuthenticated(false);
      setMembershipType("none");
    }
  }, [user]);

  const fetchMembershipType = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("membership_type")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setMembershipType(data?.membership_type || "none");
    } catch (error) {
      console.error("Error fetching membership type:", error);
      setMembershipType("none");
    }
  };

  const login = (type: MembershipType) => {
    setMembershipType(type);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setMembershipType("none");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <MembershipContext.Provider
      value={{ membershipType, isAuthenticated, login, logout }}
    >
      {children}
    </MembershipContext.Provider>
  );
};

export const useMembership = () => useContext(MembershipContext);

export default MembershipProvider;
