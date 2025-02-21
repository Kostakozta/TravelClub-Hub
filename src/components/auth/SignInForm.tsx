import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "../ui/card";

interface SignInFormProps {
  onSuccess?: () => void;
}

const SignInForm = () => {
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
          view="sign_in"
        />
      </CardContent>
    </Card>
  );
};

export default SignInForm;
