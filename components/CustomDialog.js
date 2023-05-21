import { makeStyles } from '@material-ui/core/styles';
import { StylesContext } from '@material-ui/styles';
import { Dialog } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    let bgImg='url(/paper-texture-light.jpg)';

    if (theme.palette.type=='dark') { 
        bgImg=`linear-gradient(rgba(20, 19, 18, 0.995),rgba(20, 19, 18, 0.995)) , url('/paper-texture.jpg')`;
    }
    return {
    root: {
      
    },
    paper: { 
        backgroundImage: bgImg,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor:'inherit !important',
        outline: '1px solid black',
        boxShadow: (theme.palette.type=='dark') ? `1px 1px 10px 5px inset rgba(0,0,0,0.4), 0px 0px 35px 10px rgba(0,0,0,0.3)` : '',
        
    }
  };});
const CustomDialog = (props) => { 
    const {children, url} = props;
    const classes=useStyles();
    return (
        <Dialog 
        
        classes={{ paper: classes.paper }}
        {...props}>{children}</Dialog>
    );
}
export default CustomDialog;