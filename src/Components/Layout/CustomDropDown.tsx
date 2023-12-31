import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useField } from "react-final-form";
import { ErrorMessage } from "./ErrorMessage";
import "./CustomDropDown.css";

interface Props {
  title: string;
  fields: string[];
  fieldName: string;
  disabled?: boolean;
}

export const CustomDropDown = ({
  fields,
  fieldName,
  title,
  disabled,
}: Props) => {
  const {
    input: { value, onChange: handleChange, onBlur },
    meta,
  } = useField(fieldName);

  return (
    <Box sx={{ minWidth: 120 }} onClick={() => onBlur()}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value && !disabled ? value.selected : "Not Applicable"}
          label={title}
          onChange={(e) => {
            handleChange({ ...value, selected: e.target.value });
          }}
          sx={{ border: "1px solid grey" }}
          disabled={disabled}
        >
          {fields.map((field: string, key) => (
            <MenuItem value={field} key={key}>
              {field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {meta.touched && meta.error && <ErrorMessage>{meta.error}</ErrorMessage>}
    </Box>
  );
};
