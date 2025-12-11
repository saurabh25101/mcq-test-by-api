import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function CustomSelect({ label, value, onChange, options }) {
  const FIXED_WIDTH = 120;

  return (
    <FormControl sx={{ width: FIXED_WIDTH }}>
      <InputLabel>{label}</InputLabel>

      <Select
        value={value}
        onChange={onChange}
        label={label}
        sx={{ width: FIXED_WIDTH }}
        MenuProps={{
          PaperProps: {
            sx: {
              width: FIXED_WIDTH,
              maxHeight: 150,
              overflowY: "auto",
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{ whiteSpace: "normal" }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
