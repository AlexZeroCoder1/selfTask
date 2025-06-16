import { MenuItem } from '@mui/material';
import { styled } from '@mui/system';
// Кастомный MenuItem
const CustomMenuItem = styled(MenuItem)({
  backgroundColor: '#000000',
  color: '#ffffff',
  '&:hover': {
    backgroundColor: '#222222',
  },
  '&.Mui-selected': {
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
  },
  '&.Mui-selected:hover': {
    backgroundColor: '#222222',
  },
});

export default function MenuItemStyled({...props}) {
    return (
        <CustomMenuItem {...props} />
    )
}