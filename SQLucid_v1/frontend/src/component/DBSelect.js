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
        <InputLabel id="demo-simple-select-label">DataBase</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="DataBase"
          onChange={handleChange}
        >
          <MenuItem value={10}>Dessert</MenuItem>
          <MenuItem value={20}>Student</MenuItem>
          <MenuItem value={30}>Singer</MenuItem>
          <MenuItem value={40}>Country</MenuItem>
          <MenuItem value={40}>Pet</MenuItem>
          <MenuItem value={40}>Flight</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}