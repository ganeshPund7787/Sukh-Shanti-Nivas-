import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotelOptionsConfig";
import { HotelFormData } from "./ManageHotelForm";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className=" flex-wrap flex gap-2">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`${
              typeWatch === type
                ? "cursor-pointer bg-blue-400 text-sm rounded-full px-4 py-2 font-bold"
                : "cursor-pointer bg-gray-300 text-sm rounded-full px-4 py-2 font-bold"
            } w-40`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>

      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeSection;
