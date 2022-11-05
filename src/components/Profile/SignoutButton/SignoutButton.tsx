import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogoutUser } from "hooks/users/useLogoutUser";

export const SignoutButton: React.FC = () => {
  const [logout, setLogout] = React.useState(false);
  const { logoutSuccessful } = useLogoutUser(logout);
  const navigate = useNavigate();

  const logoutUser = () => {
    setLogout(true);
  };

  useEffect(() => {
    if (logoutSuccessful) navigate("/search");
  }, [logoutSuccessful]);

  return (
    <button
      data-testid="signoutButton"
      onClick={() => logoutUser()}
      className="ml-auto button-primary  mr-2 md:mr-0"
    >
      Sign out
    </button>
  );
};
