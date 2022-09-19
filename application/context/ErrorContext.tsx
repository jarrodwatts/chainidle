import React, { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface ErrorContextType {
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}

const ErrorContextProvider = createContext({} as ErrorContextType);

export default function ErrorContext({
  children,
  error,
  setError,
}: {
  children: any;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <ErrorContextProvider.Provider
      value={{
        error,
        setError,
      }}
    >
      {children}
    </ErrorContextProvider.Provider>
  );
}

// export the hook so we can use it in other components.
export const useErrorState = () => useContext(ErrorContextProvider);
