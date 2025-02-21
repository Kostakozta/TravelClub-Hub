import React from "react";
import { useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import HotelDetails from "@/components/HotelDetails";
import { useMembership } from "@/contexts/MembershipContext";
import { supabase } from "@/lib/supabase";

const HotelDetailsPage = () => {
  const { id } = useParams();
  const { isAuthenticated, membershipType } = useMembership();
  const [hotel, setHotel] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchHotel();
  }, [id]);

  const fetchHotel = async () => {
    try {
      const { data, error } = await supabase
        .from("hotels")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setHotel(data);
    } catch (error) {
      console.error("Error fetching hotel:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const { data, error } = await supabase.from("saved_hotels").insert([
        {
          user_id: localStorage.getItem("userId"),
          hotel_id: id,
        },
      ]);
      if (error) throw error;
      // Show success message
    } catch (error) {
      console.error("Error saving hotel:", error);
    }
  };

  const handleRequestQuote = async (quoteData) => {
    try {
      const { data, error } = await supabase.from("quote_requests").insert([
        {
          user_id: localStorage.getItem("userId"),
          hotel_id: id,
          dates: quoteData.dates,
          guests: quoteData.guests,
          status: "pending",
        },
      ]);
      if (error) throw error;
      // Show success message and redirect to quotes page
    } catch (error) {
      console.error("Error requesting quote:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        isLoggedIn={isAuthenticated}
        membershipType={membershipType}
      />
      <main className="pt-24 pb-12 px-4">
        {loading ? (
          <p>Loading hotel details...</p>
        ) : hotel ? (
          <HotelDetails
            hotel={{
              ...hotel,
              price: {
                standard: hotel.base_price,
                club: hotel.club_price,
              },
            }}
            onSave={handleSave}
            onRequestQuote={handleRequestQuote}
          />
        ) : (
          <p>Hotel not found</p>
        )}
      </main>
    </div>
  );
};

export default HotelDetailsPage;
