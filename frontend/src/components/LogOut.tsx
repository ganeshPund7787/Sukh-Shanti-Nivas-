import { useMutation, useQueryClient } from "react-query";
import { logoutUser } from "../API_Calls/logOut";

const LogOutBtn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(logoutUser, {
    onSuccess: async () => {
      queryClient.invalidateQueries("validateToken");
      console.log(`Logout successfully`);
    },
    onError: (err: Error) => {
      console.log(`Error while mutation logout: ${err}`);
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-sm px-3 hover:bg-gray-200
       font-bold text-purple-600 bg-white"
    >
      logOut
    </button>
  );
};

export default LogOutBtn;
