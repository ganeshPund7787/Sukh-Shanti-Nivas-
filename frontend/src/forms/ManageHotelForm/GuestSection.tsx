import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Guests</h1>
      <div className="flex flex-col md:flex-row bg-gray-200 px-5 gap-4 py-3 items-center justify-evenly">
        <label className="text-gray-700 text-sm font-semibold">
          Adults
          <input
            type="number"
            min={1}
            defaultValue={1}
            className="border rounded w-full py-1 px-3 font-normal"
            {...register("adultCount", {
              required: "required",
            })}
          />
          {errors.adultCount?.message && (
            <span className="text-sm text-red-500 font-bold">
              {errors.adultCount?.message}
            </span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-semibold">
          childrens
          <input
            type="number"
            min={0}
            defaultValue={0}
            className="border rounded w-full py-1 px-3 font-normal"
            {...register("childCount", {
              required: "required",
            })}
          />
          {errors.childCount?.message && (
            <span className="text-sm text-red-500 font-bold">
              {errors.childCount?.message}
            </span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestSection;
