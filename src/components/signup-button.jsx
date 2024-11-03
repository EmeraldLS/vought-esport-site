import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/tournament",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <button
      className=" w-full bg-gray-600 p-2 text-white rounded-md whitespace-nowrap"
      onClick={handleSignUp}
    >
      Sign Up
    </button>
  );
};
