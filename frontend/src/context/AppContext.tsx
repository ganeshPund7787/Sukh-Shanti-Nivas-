import { createContext, useContext } from "react";
import toast from "react-hot-toast";

type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContext = {
  showToast: (toastMessage: ToastMessage) => void;
};

const AppContext = createContext<AppContext | undefined>(undefined);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          if (toastMessage.type === "SUCCESS") {
            toast.success(toastMessage.message);
          } else {
            toast.error(toastMessage.message);
          }
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext) as AppContext;
};
