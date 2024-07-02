import { hotelTypes } from "../config/hotelOptionsConfig";

type Props = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedHotelTypes, onChange }: Props) => {
  return (
    <div className="border border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Types: </h4>
      {hotelTypes.map((hoteltype) => (
        <label key={hoteltype} className="flex items-center space-x-2 mx-2">
          <input
            type="checkbox"
            className="rounded"
            value={hoteltype}
            checked={selectedHotelTypes.includes(hoteltype)}
            onChange={onChange}
          />
          <span>{hoteltype}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
