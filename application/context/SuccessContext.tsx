import React, { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";
import Character from "../types/Character";

interface SuccessContextType {
  success: {
    success: boolean;
    message: string;
    character?: Character;
  };
  setSuccess: Dispatch<
    SetStateAction<{
      success: boolean;
      message: string;
      character?: Character;
    }>
  >;
}

const SuccessContextProvider = createContext({} as SuccessContextType);

export default function SuccessContext({
  children,
  success,
  setSuccess,
}: {
  children: any;
  success: {
    success: boolean;
    message: string;
    character?: Character;
  };
  setSuccess: Dispatch<
    SetStateAction<{
      success: boolean;
      message: string;
      character?: Character;
    }>
  >;
}) {
  return (
    <SuccessContextProvider.Provider
      value={{
        success,
        setSuccess,
      }}
    >
      {children}
    </SuccessContextProvider.Provider>
  );
}

// export the hook so we can use it in other components.
export const useSuccessState = () => useContext(SuccessContextProvider);
