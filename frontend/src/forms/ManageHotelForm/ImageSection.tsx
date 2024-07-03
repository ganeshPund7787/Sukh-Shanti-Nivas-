import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    try {
      e.preventDefault();
      setValue(
        "imageUrls",
        existingImageUrls.filter((url) => url !== imageUrl)
      );
    } catch (error: any) {
      console.log(`Error while deleteHotel client: `, error);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-3">Images</h1>
      <div className="border rounded p-4 flex flex-col items-center justify-evenly gap-4">
        {existingImageUrls && (
          <div className="flex gap-5 flex-col md:flex-row flex-wrap">
            {existingImageUrls.map((url) => (
              <div key={url} className="relative group w-[250px]">
                <img src={url} alt="" className="object-cover min-h-full" />
                <button
                  type="button"
                  onClick={(e) => handleDelete(e, url)}
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full text-gray-700 font-normal"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength =
                imageFiles.length + (existingImageUrls?.length || 0);

              if (totalLength === 0) {
                return "At least on img is required";
              }
              if (totalLength > 6) {
                return "You can take eonly less than 6";
              }

              return true;
            },
          })}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-sm text-red-500">
          {errors.imageFiles?.message}
        </span>
      )}
    </div>
  );
};

export default ImageSection;
