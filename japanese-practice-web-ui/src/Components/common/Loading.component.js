import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = ({open, onClick}) => {
    return ( <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={onClick}
    >
        <CircularProgress color="inherit" />
    </Backdrop> );
}
 
export default Loading;