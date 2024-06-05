import React from "react"
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Comp to serve as a loading spinner for waiting until 
// the whole app is rendered
export default function LoadingSpinner() {
  return (
    <div>
      <Backdrop 
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
};
