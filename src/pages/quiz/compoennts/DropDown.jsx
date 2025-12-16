 import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function CustomSelect({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth sx={{ minWidth:"auto" }}>
      <InputLabel>{label}</InputLabel>

      <Select
        value={value}
        onChange={onChange}
        label={label}
        fullWidth
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 180,
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
