import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotelOptionsConfig";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  console.log(hotelFacilities);
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Facilities</h1>
      <div className="flex flex-wrap gap-7">
        {hotelFacilities.map((facility) => (
          <label key={facility} className="text-sm flex gap-2 text-gray-700">
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required";
                  }
                },
              })}
            />
            {facility}
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
