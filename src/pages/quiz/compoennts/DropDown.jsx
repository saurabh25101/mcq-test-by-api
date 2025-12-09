import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function CustomSelect({ label, value, onChange, options, minWidth = 140 }) {
  return (
    <FormControl sx={{ minWidth }}>
      <InputLabel >{label}</InputLabel>
      <Select value={value} onChange={onChange}>
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
