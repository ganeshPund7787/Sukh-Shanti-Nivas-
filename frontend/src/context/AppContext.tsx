import { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { validateToken } from "../API_Calls/isLoggedIn";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isError } = useQuery("validateToken", validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          if (toastMessage.type === "SUCCESS") {
            toast.success(toastMessage.message);
          }
        },
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContext;
};
