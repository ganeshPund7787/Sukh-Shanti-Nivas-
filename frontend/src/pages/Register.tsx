import { useForm } from "react-hook-form";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { register, watch, handleSubmit } = useForm<RegisterFormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });
  return (
    <form
      onSubmit={onSubmit}
      className="flex mx-10 flex-col gap-5 md:mx-32 font-semibold"
    >
      <h1 className="text-3xl tracking-wide">Create new account: </h1>
      <div className="flex flex-col md:flex-row gap-5">
        <label htmlFor="" className="text-sm text-gray-700 flex-1">
          First Name
          <input
            type="text"
            className="border rounded font-normal w-full py-1 px-2"
            id=""
            {...register("firstName", { required: "Required" })}
          />
        </label>
        <label htmlFor="" className="text-sm text-gray-700 flex-1">
          Last Name
          <input
            type="text"
            className="border rounded font-normal w-full py-1 px-2"
            {...register("lastName", { required: "Required" })}
            id=""
          />
        </label>
      </div>
      <label htmlFor="" className="text-sm text-gray-700 flex-1">
        Email
        <input
          type="email"
          className="border rounded font-normal w-full py-1 px-2"
          {...register("email", { required: "Required" })}
        />
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
      </label>
      <label htmlFor="" className="text-sm text-gray-700 flex-1">
        Confirm Password
        <input
          type="password"
          className="border rounded font-normal w-full py-1 px-2"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your Passwords does not match";
              }
            },
          })}
        />
      </label>
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
