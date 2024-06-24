import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { SignInUser } from "../API_Calls/signIn";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const queryClient = useQueryClient();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();
  const navigate = useNavigate();
  const mutation = useMutation(SignInUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (err: Error) => {
      console.log(`Error while mutaion login : ${err}`);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Sign In</h2>
      <label htmlFor="" className="text-sm text-gray-700 flex-1">
        Email
        <input
          type="email"
          className="border rounded font-normal w-full py-1 px-2"
          {...register("email", { required: "Required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label htmlFor="" className="text-sm text-gray-700 flex-1">
        Password
        <input
          type="password"
          className="border rounded font-normal w-full py-1 px-2"
          {...register("password", {
            required: "Required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 character",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <span className="text-sm">
        Not Register{" "}
        <Link to={"/register"} className="text-blue-600">
          create a account here
        </Link>
      </span>
      <span>
        <button
          type="submit"
          disabled={false}
          className="bg-purple-600 hover:bg-purple-500 text-white p-2 rounded-md font-bold text-xl disabled:cursor-not-allowed"
        >
          Login
        </button>
      </span>
    </form>
  );
};

export default SignIn;
