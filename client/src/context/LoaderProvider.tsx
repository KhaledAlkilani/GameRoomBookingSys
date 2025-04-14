import React, { PropsWithChildren, useMemo } from "react";
import { createContext } from "react";

interface LoaderContextState {
  readonly loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const LoaderContext = createContext<LoaderContextState>({
  loading: false,
  setLoading: () => console.error("No LoaderContext"),
});

export const LoaderProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = React.useState(false);

  const context = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <LoaderContext.Provider value={context}>{children}</LoaderContext.Provider>
  );
};
