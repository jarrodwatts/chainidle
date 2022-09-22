import React, { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";
import Character from "../types/Character";

interface LoadingContextType {
  loading: {
    loading: boolean;
    message: string;
    character?: Character;
  };
  setLoading: Dispatch<
    SetStateAction<{
      loading: boolean;
      message: string;
      character?: Character;
    }>
  >;
}

const LoadingContextProvider = createContext({} as LoadingContextType);

export default function LoadingContext({
  children,
  loading,
  setLoading,
}: {
  children: any;
  loading: {
    loading: boolean;
    message: string;
    character?: Character;
  };
  setLoading: Dispatch<
    SetStateAction<{
      loading: boolean;
      message: string;
      character?: Character;
    }>
  >;
}) {
  return (
    <LoadingContextProvider.Provider
      value={{
        loading,
        setLoading,
      }}
    >
      {children}
    </LoadingContextProvider.Provider>
  );
}

// export the hook so we can use it in other components.
export const useLoadingState = () => useContext(LoadingContextProvider);
