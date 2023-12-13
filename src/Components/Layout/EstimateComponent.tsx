import React, { useEffect } from "react";

interface Props {
  estimateDate: string;
  setEstimateDate: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  setDateError: React.Dispatch<React.SetStateAction<string>>;
}

const EstimateComponent = ({
  estimateDate,
  setEstimateDate,
  className,
  setDateError,
}: Props) => {
  const formatDate = (date: any) => {
    const day = String(date.getDate());
    const month = String(date.getMonth() + 1);
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    setEstimateDate(formatDate(new Date()));
  }, [setEstimateDate]);

  const handleEstimateDateChange = (event: any) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    const formattedSelectedDate = formatDate(selectedDate);

    if (
      formattedSelectedDate >= formatDate(currentDate) ||
      formattedSelectedDate === estimateDate
    ) {
      setEstimateDate(formattedSelectedDate);
      setDateError("");
    } else {
      setDateError("Invalid Date(>=CurrentDate)");
    }
  };

  return (
    <div>
      <input
        type="date"
        value={estimateDate}
        onChange={handleEstimateDateChange}
        className={className}
      />
    </div>
  );
};

export default EstimateComponent;
