import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Card, CardContent } from "../ui/card";
import { supabase } from "@/lib/supabase";

interface SignUpFormProps {
  onSuccess?: () => void;
  selectedPlan?: "browser" | "club";
}

const SignUpForm = () => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="p-6">
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#0F172A",
                  brandAccent: "#2563EB",
                },
              },
            },
            extend: true,
          }}
          providers={["google"]}
          redirectTo={window.location.origin}
          magicLink={true}
          showLinks={true}
          view="sign_up"
        />
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
