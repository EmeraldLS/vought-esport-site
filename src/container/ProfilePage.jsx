import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const ProfilePage = () => {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }
  return <div>ProfilePage</div>;
};

export default ProfilePage;
