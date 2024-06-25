import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { registerUser } from "../API_Calls/register";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(registerUser, {
    onSuccess: async () => {
      showToast({ message: "User Register successfully", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      console.log(`Error: ${error}`);
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex mx-10 flex-col gap-5 md:mx-32 font-semibold"
    >
      <h1 className="text-3xl tracking-wide">Create new account: </h1>
      <div className="flex flex-col md:flex-row gap-5">
        <label className="text-sm text-gray-700 flex-1">
          First Name
          <input
            type="text"
            className="border rounded font-normal w-full py-1 px-2"
            id="fjkjgh"
            {...register("firstName", { required: "Required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className="text-sm text-gray-700 flex-1">
          Last Name
          <input
            type="text"
            className="border rounded font-normal w-full py-1 px-2"
            {...register("lastName", { required: "Required" })}
            id="fgj"
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
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
      <label htmlFor="" className="text-sm text-gray-700 flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded font-normal w-full py-1 px-2"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "required";
              } else if (watch("password") !== val) {
                return "Your Passwords does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span className="text-sm">
        Already Register ? {" "}
        <Link to={"/sign-in"} className="text-blue-600 underline">
          sign-in here
        </Link>
      </span>
      <span>
        <button
          type="submit"
          disabled={false}
          className="bg-purple-600 hover:bg-purple-500 text-white p-2 font-bold text-xl disabled:cursor-not-allowed"
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
