import React, { useEffect, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {useTheme, Button, CircularProgress} from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import StepWizard from "react-step-wizard";
import WalletContext from '../WalletContext';
import { Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import axios from 'axios';
import {TextField} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomDialog from '../CustomDialog';
import { validBech32Address } from '../../utils/CSL'
const useStyles = makeStyles(theme => {
  let bgImg='';

  if (theme.palette.type=='dark') { 
    bgImg=`linear-gradient(rgba(15, 14, 13, 0.972),rgba(15, 14, 13, 0.972)) , url('/texture.png')`;
  }
  
  return {
  root: {
    
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: '0em'
  },
  row: { 
    display: 'flex',
    alignItems: 'center'
  },
  closeButton: {
    position: 'relative',
    right: '-0.4em',
    top: '0em',
    color: theme.palette.grey[500],
  },
  dialog: {
    backgroundColor: theme.palette.background.paper, 
    color: theme.palette.text.primary,
    
    width: 'calc(100% - 3em)',
    maxWidth: 'none !important',
    minWidth: '600px',
  },
  button: {
    fontFamily: "'Baloo Thambi 2', cursive",
    fontWeight: 600,
    letterSpacing: '0.02em',
    borderRadius: '1.5em'
  },
  
  input: { 
      backgroundImage: bgImg,
      backgroundRepeat: 'repeat',
      backgroundSize: 'auto',
      borderRadius: '15px',
      boxShadow: (theme.palette.type=='dark') ? `1px 1px 10px 5px inset rgba(0,0,0,0.4), 0px 0px 10px 1px rgba(0,0,0,0.5)` : ''
  },
  paper: {
      borderRadius: '5px !important',
      outline: '1px solid black',
      boxShadow: '2px 2px 15px 3px rgba(0,0,0,0.4)'
  }
}});


const Step1 = ({nextStep, onFieldTypeChange, goToStep, currentStep, handleClose}) => { 
  const wallet = useContext(WalletContext);
  const [fieldType, setFieldType] = useState(null);
  const [enableNext, setEnableNext] = useState(false);

  const handleChange = (e, name) => { 
    setEnableNext(false);
    setFieldType(name);
    onFieldTypeChange(e,name);
    setEnableNext(true);
  }

  const classes = useStyles();
  const policies = Object.keys(wallet.assets.tokens);
  
  const theme = useTheme();
  
  return <>
    <DialogContent className={classes.dialog}>
      <DialogTitle currentStep={currentStep} id="customized-dialog-title" onClose={handleClose} goToStep={goToStep}>
        Select field type
      </DialogTitle>
    
      <Typography variant="body1">Select either simple text or JSON field:</Typography>
      <br />&nbsp;<br />
      <RadioGroup aria-label="type" name="type" onChange={handleChange}>
        <div className={classes.row}>
          <Radio value="libraries" checked={fieldType=='string'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'string')}>
            <Typography>String</Typography>
            <Typography variant='caption'>Simple text field</Typography>
          </div>
        </div>
        <br />
        <div className={classes.row}>
          <Radio value="tokens" checked={fieldType=='json'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'json')}>
            <Typography>JSON</Typography>
            <Typography variant='caption'>Advanced field using JSON - use this if you want to specify arrays</Typography>
          </div>
        </div>
        
        <br />
      </RadioGroup>
    
  
  
     </DialogContent>
     <DialogButtons previousStep={null} nextStep={nextStep} enableNext={enableNext} />
  </>;
};
const DialogButtons = ({previousStep, nextStep, enableNext, nextStepLabel}) => { 
  const theme = useTheme();
  const classes=useStyles();
  return (
    <DialogActions sx={{backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary}}>
      {previousStep &&
        <Button size="large" className={classes.button}  onClick={previousStep}>Previous</Button>  
      }
      {nextStep && 
        <Button size="large" endIcon=<ArrowForwardIcon /> disabled={!enableNext} className={classes.button} variant="contained" onClick={nextStep} autoFocus color="secondary">{nextStepLabel ? nextStepLabel : 'Next'}</Button>
      }
    </DialogActions>
  );
}

const DialogTitle = (props) => {
  const classes = useStyles();
  const { children, currentStep, goToStep, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography {...other} className={classes.root}>
      <div style={{display: 'flex', paddingRight:'-4em', justifyContent:'space-between'}}>
        <div style={{flexGrow:1}}> 
          <Typography variant="h6">{children}</Typography>
        </div>
        <div style={{position: 'relative',top:'-0.4em'}}>
          <Radio onChange={(e) => { if (e.target.checked) { goToStep(1); } }} checked={currentStep==1} disabled={!(currentStep>=1)} />
          <Radio onChange={(e) => { if (e.target.checked) { goToStep(2); } }} checked={currentStep==2} disabled={!(currentStep>=2)} />
        </div>
        <div style={{position: 'relative', 'top':'-0.5em', 'right':'-0.5em'}}>
          {onClose ? (
            <IconButton aria-label="close" onClick={onClose} className={classes.closeButton} >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div> 
      </div>
      
      
    </MuiDialogTitle>
  );
};


const AddFieldDialog = (props) => {
  const { onClose, open, onImportChange } = props;  
  const [fieldType, setFieldType] = useState(null);

  const theme = useTheme();
  const classes=useStyles();
    const handleClose =  (_, reason) => {
      if (reason !== "backdropClick") {
        onClose(null); 
      }
    };
    const onFieldTypeChange = (e,val) => { 
      setFieldType(val);
    }

    const importChange = (change) => { 
      onImportChange(change);
    }
    
    return (
      <div>
      
        <CustomDialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          
            <StepWizard>
            <Step1 onFieldTypeChange={onFieldTypeChange} handleClose={handleClose} />
            </StepWizard>
          
        </CustomDialog>
      </div>
    );
}
AddFieldDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onImportChange: PropTypes.func.isRequired
};
export default AddFieldDialog;