import React, { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface ButtonProps {
  value: string | undefined;
  sx?: object;
  //
  onChange?: (value: string) => void;
}

const InputDate: React.FunctionComponent<ButtonProps> = (props) => {
  const initialDate = props.value ? dayjs(props.value, "DD/MM/YYYY") : null;
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(
    initialDate && initialDate.isValid() ? initialDate : null
  );

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [props.value]);

  const onChange = (date: Dayjs | null) => {
    setSelectedDate(date);
    if (props.onChange) {
      props.onChange(date ? date.format("DD/MM/YYYY") : "");
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        format="DD/MM/YYYY"
        value={selectedDate}
        onChange={onChange}
        slotProps={{
          textField: {
            required: true,
          },
        }}
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "20px",
            fontSize: "16px",
            padding: "20px 10px",
            height: "35px",
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
