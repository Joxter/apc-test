import React from "react";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

export const AuthProvider: React.FC = ({ children }) => {
  return (
    <Auth0Provider
      domain="dev-xsdzwft1.us.auth0.com"
      clientId="YRGjLoSufKW6rOuLePeD9eQfkZDqzrIL"
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};

export const LoginProcess: React.FC = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } = useAuth0();

  console.log({ isLoading, isAuthenticated, error, user, loginWithRedirect, logout });

  if (isLoading) {
    return <div>Loading... <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button></div>;
  }
  if (error) {
    return (
      <div>
        Oops... {error.message}. <a href="/">Try again later </a>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div>
        Hello {user.name} <button onClick={() => logout({ returnTo: window.location.origin })}>Log out</button>
      </div>
    );
  } else {
    return <button onClick={loginWithRedirect}>Log in</button>;
  }
};
