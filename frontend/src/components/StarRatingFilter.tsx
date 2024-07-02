type Props = {
  selectedStars: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const StarRatingFilter = ({ selectedStars, onChange }: Props) => {
  return (
    <div className="border border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Ratings: </h4>
      {["1", "2", "3", "4", "5"].map((star) => (
        <label key={star} className="flex items-center space-x-2 mx-2">
          <input
            type="checkbox"
            className="rounded"
            value={star}
            checked={selectedStars.includes(star)}
            onChange={onChange}
          />
          <span>{star} Stars </span>
        </label>
      ))}
    </div>
  );
};

export default StarRatingFilter;
