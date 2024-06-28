import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import toast from "react-hot-toast";
import { AddMyHotel } from "../API_Calls/AddMyHotel";

const AddHotel = () => {
  const { mutate, isLoading } = useMutation(AddMyHotel, {
    onSuccess: () => {
      toast.success("Add hotel successfully");
      console.log(`Add hotel successfully`);
      return;
    },
    onError: (err): any => {
      toast.error(`Error while add-hotel : ${err}`);
      console.log(`Error while add-hotel : `, err);
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
