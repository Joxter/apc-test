import React from "react";

type Props = {
  isLoading: boolean;
  children: React.ReactNode;
};

export const LoadingWrapper = React.memo<Props>(({ isLoading, children }) => {
  return <div style={isLoading ? { opacity: "0.3", pointerEvents: "none" } : {}}>{children}</div>;
});
