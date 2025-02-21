import React from "react";
import { Button } from "./ui/button";
import NotificationCenter from "./NotificationCenter";
import { useNavigate } from "react-router-dom";
import { useMembership } from "@/contexts/MembershipContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const { isAuthenticated: isLoggedIn, membershipType } = useMembership();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="w-full h-20 bg-white/95 backdrop-blur-md border-b border-gray-200/20 fixed top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Travel Club
          </a>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Destinations</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {[
                      { title: "Popular", href: "/destinations/popular" },
                      { title: "Trending", href: "/destinations/trending" },
                      { title: "New Arrivals", href: "/destinations/new" },
                      { title: "Luxury Stays", href: "/destinations/luxury" },
                    ].map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className={cn(
                              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            )}
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(item.href);
                            }}
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Membership</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px]">
                    {[
                      { title: "Benefits", href: "/membership/benefits" },
                      { title: "Pricing", href: "/membership/pricing" },
                      { title: "FAQ", href: "/membership/faq" },
                    ].map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            onClick={(e) => {
                              e.preventDefault();
                              navigate(item.href);
                            }}
                          >
                            <div className="text-sm font-medium leading-none">
                              {item.title}
                            </div>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/deals"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate("/deals");
                  }}
                >
                  Deals
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {membershipType === "admin" && (
                <>
                  <span className="text-sm font-medium px-3 py-1 bg-red-100 text-red-800 rounded-full">
                    Admin
                  </span>
                  <Button variant="ghost" onClick={handleSignOut}>
                    Sign Out
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/admin")}>
                    Admin Panel
                  </Button>
                </>
              )}
              {membershipType === "club" && (
                <span className="text-sm font-medium px-3 py-1 bg-primary/10 text-primary rounded-full">
                  Club Member
                </span>
              )}
              {membershipType === "browser" && (
                <span className="text-sm font-medium px-3 py-1 bg-secondary/10 text-secondary-foreground rounded-full">
                  Browser
                </span>
              )}
              <NotificationCenter />
              <Button
                variant="ghost"
                onClick={() =>
                  navigate(
                    membershipType === "admin" ? "/admin/profile" : "/account",
                  )
                }
              >
                My Account
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/membership/pricing")}
              >
                Join Club
              </Button>
              <Button onClick={() => navigate("/signin")}>Sign In</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
