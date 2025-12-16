 import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function CustomSelect({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>

      <Select
        value={value}
        onChange={onChange}
        label={label}
        fullWidth

        // 🔽 SELECT HEIGHT CONTROL
        sx={{
          height:50,
          fontSize: "0.9rem",
        }}

        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 170,  
            },
          },
        }}
      >
        {options.map((opt) => (
          <MenuItem
            key={opt.value}
            value={opt.value}
            sx={{
              fontSize: "0.9rem",
              py: 0.8,  
              whiteSpace: "normal",
            }}
          >
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
