import React, { Dispatch, SetStateAction } from "react";
import { createContext, useContext } from "react";

interface LoadingContextType {
  loading: {
    loading: boolean;
    message: string;
  };
  setLoading: Dispatch<
    SetStateAction<{
      loading: boolean;
      message: string;
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
  };
  setLoading: Dispatch<
    SetStateAction<{
      loading: boolean;
      message: string;
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
