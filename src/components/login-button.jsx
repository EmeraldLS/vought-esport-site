import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

export const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/tournament",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <button
      className="w-full bg-gray-600 p-2 text-white rounded-md"
      onClick={handleLogin}
    >
      Log In
    </button>
  );
};
