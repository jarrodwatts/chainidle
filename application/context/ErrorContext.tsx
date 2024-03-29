import React, { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";
import Character from "../types/Character";

interface ErrorContextType {
  error: {
    error: boolean;
    message: string;
    character?: Character;
  };
  setError: Dispatch<
    SetStateAction<{
      error: boolean;
      message: string;
      character?: Character;
    }>
  >;
}

const ErrorContextProvider = createContext({} as ErrorContextType);

export default function ErrorContext({
  children,
  error,
  setError,
}: {
  children: any;
  error: {
    error: boolean;
    message: string;
    character?: Character;
  };
  setError: Dispatch<
    SetStateAction<{
      error: boolean;
      message: string;
      character?: Character;
    }>
  >;
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
