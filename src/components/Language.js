import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const options = [
  {
    key: "es",
    title: "Spanish",
  },
  {
    key: "de",
    title: "French",
  },
  {
    key: "ja",
    title: "Japanese",
  },
  {
    key: "fr",
    title: "German",
  },
  {
    key: "en",
    title: "English",
  },
  {
    key: "bn",
    title: "Bangla",
  },
];

export default function Language({ handleLanChange }) {
  const [language, setLanguages] = React.useState("");

  const handleChange = (event) => {
    setLanguages(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Languages</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Languages"
          onChange={handleChange}
        >
          {options?.map((item) => (
            <MenuItem
              key={item?.key}
              value={item?.title}
              onClick={() => handleLanChange(item?.key)}
            >
              {item?.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
