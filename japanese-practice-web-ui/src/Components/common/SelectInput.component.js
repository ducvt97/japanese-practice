import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const SelectInput = ({label, data, onChange, size, style}) => {
    const [value, setValue] = useState('');

    const changeValue = (event) => {
        setValue(event.target.value);
        onChange(event.target.value);
    }
    return (
        <FormControl sx={{...{ minWidth: 120 }, ...style}} size={size || 'small'}>
            <InputLabel>{label}</InputLabel>
            <Select
                value={value}
                label="Age"
                onChange={changeValue}
            >
                {data && data.map(item => <MenuItem value={item.value}>{item.text}</MenuItem>)}
            </Select>
        </FormControl>
      );
}
 
export default SelectInput;
