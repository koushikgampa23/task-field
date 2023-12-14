import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

interface Props {
  title: string;
  fields: string[];
  fieldState: string | null | undefined;
  setFieldState: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  disabled?: boolean;
}

export const CustomDropDown1 = ({
  fields,
  fieldState,
  setFieldState,
  title,
  disabled,
}: Props) => {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={fieldState ? fieldState : ""}
          label="Age"
          onChange={(e) => {
            setFieldState(e.target.value as string);
          }}
          className="selectStyle"
          sx={{ border: "1px solid grey" }}
          disabled={disabled}
        >
          {fields.map((field: string, key) => {
            return (
              <MenuItem value={field} key={key}>
                {field}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};
