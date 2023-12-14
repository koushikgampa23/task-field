import React from "react";
import { useField } from "react-final-form";

interface Props {
  field: string;
  className?: string;
}

const EstimateComponent = ({ field, className }: Props) => {
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const dateValidator = (val: any) => {
    if (!val) {
      return "Required Field";
    } else {
      const currentDate = new Date();
      if (val < formatDate(currentDate)) {
        return "Invalid Date (>= Current Date)";
      }
    }
  };

  const {
    input: { value, onChange },
  } = useField(field, {
    initialValue: formatDate(new Date()),
    validate: dateValidator,
  });

  const handleEstimateDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedDate = new Date(event.target.value);
    onChange(formatDate(selectedDate));
  };

  return (
    <div>
      <input
        type="date"
        value={value}
        onChange={handleEstimateDateChange}
        className={className}
      />
    </div>
  );
};

export default EstimateComponent;
