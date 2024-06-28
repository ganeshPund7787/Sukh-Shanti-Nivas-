import GoogleLogo from "../assets/googlelogo.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";

const OAuth = () => {
  const handleGoogleClick = async () => {
    const Provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, Provider);
    const user = result.user;
    console.log(user);
  };

  return (
    <button
      type="button"
      onClick={handleGoogleClick}
      className="bg-gray-300 flex items-center justify-center gap-2 text-black font-semibold border p-2 rounded-lg uppercase hover:bg-slate-400"
    >
      <img src={GoogleLogo} className="h-8" alt="" />
      Contiinue with google
    </button>
  );
};

export default OAuth;
