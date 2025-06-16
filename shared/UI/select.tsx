import { Select } from '@mui/material';
import { styled } from '@mui/system';

// Кастомный Select
const CustomSelect = styled(Select)({
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    borderRadius: '8px',
    height: '40px',
    width: '100%',
    '& .MuiSelect-icon': {
        color: '#ffffff',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#888',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#666', // фокус - заменить синий на серый
    },
});

export default function SelectStyled({ ...props }) {
    return (
        <CustomSelect {...props} />
    );
}