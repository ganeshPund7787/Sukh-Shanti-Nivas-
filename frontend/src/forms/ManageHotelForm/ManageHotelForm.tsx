import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestSection from "./GuestSection";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  pricePerNight: number;
  type: string;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
  const formMethods = useForm<HotelFormData>();
  return (
    <FormProvider {...formMethods}>
      <form className="flex flex-col gap-10 mx-10">
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestSection />
      </form>
    </FormProvider>
  );
};

export default ManageHotelForm;
