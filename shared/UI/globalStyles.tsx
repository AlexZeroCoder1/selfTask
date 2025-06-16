import { GlobalStyles } from '@mui/material';

export default function GlobalMuiOverrides() {
  return (
    <GlobalStyles styles={{
      '.MuiPaper-root.MuiMenu-paper': {
        backgroundColor: '#000000 !important',
        color: '#ffffff !important',
      },
      '.MuiMenuItem-root': {
        backgroundColor: '#000000 !important',
        color: '#ffffff !important',
      },
      '.MuiMenuItem-root:hover': {
        backgroundColor: '#222222 !important',
      },
      '.MuiMenuItem-root.Mui-selected': {
        backgroundColor: '#111111 !important',
        color: '#ffffff !important',
      },
      '.MuiMenuItem-root.Mui-selected:hover': {
        backgroundColor: '#222222 !important',
      },
    }} />
  );
}
