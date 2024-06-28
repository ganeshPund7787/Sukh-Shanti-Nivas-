import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label htmlFor="" className="text-sm text-gray-700 flex-1">
        Name
        <input
          type="name"
          className="border rounded font-normal w-full py-1 px-2 bg-gray-200"
          {...register("name", { required: "Required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <div className="flex gap-5">
        <label htmlFor="" className="text-sm text-gray-700  flex-1">
          City
          <input
            type="text"
            className="border rounded font-normal w-full py-1 px-2 bg-gray-200"
            {...register("city", { required: "Required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
        <label htmlFor="" className="text-sm text-gray-700 flex-1">
          Country
          <input
            type="text"
            className="border rounded font-normal w-full py-1 px-2 bg-gray-200"
            {...register("country", { required: "Required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>
      </div>

      <label htmlFor="" className="text-sm text-gray-700 flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded font-normal w-full py-1 px-2 bg-gray-200"
          {...register("description", { required: "Required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      <label htmlFor="" className="text-sm text-gray-700 w-72">
        Price Per Night
        <input
          type="number"
          className="border rounded font-normal w-full py-1 px-2 bg-gray-200"
          {...register("pricePerNight", { required: "Required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      <label htmlFor="" className="text-sm font-bold text-gray-700 w-72">
        Start Rating
        <select
          {...register("starRating", { required: "Required" })}
          className="border rounded w-full py-2 text-gray-700 font-normal"
        >
          <option value="" className="text-sm  font-bold">
            Select as Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
};

export default DetailsSection;
