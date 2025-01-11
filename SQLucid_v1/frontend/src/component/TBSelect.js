import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function () {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 20 }} style={{width: '100%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Table</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Table"
          onChange={handleChange}
        >
          <MenuItem value={10}>Dessert</MenuItem>
          <MenuItem value={20}>Price</MenuItem>
          <MenuItem value={30}>Brand</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}