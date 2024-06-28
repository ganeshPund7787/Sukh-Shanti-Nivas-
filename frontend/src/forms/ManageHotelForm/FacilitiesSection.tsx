import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotelOptionsConfig";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Facilities</h1>
      <div className="flex flex-wrap gap-7">
        {hotelFacilities.map((facality) => (
          <label key={facality} className="text-sm flex gap-2 text-gray-700">
            <input
              type="checkbox"
              value={facality}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facilities is required!";
                  }
                },
              })}
            />
            {facality}
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-sm text-red-500">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
};

export default FacilitiesSection;
