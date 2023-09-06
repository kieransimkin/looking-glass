import React, { useEffect, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {useTheme, Button, CircularProgress, FormControl, FormLabel, FormControlLabel} from '@material-ui/core';
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
import { validBech32Address } from '../../utils/CSLBrowser'
import AvatarPreview from '../AvatarPreview';
import ColourPicker from '../ColourPicker';
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
  actionSelect: { 
    marginTop:'0.5em',
    paddingLeft:'1em',
    paddingTop:'1em',
    paddingBottom:'1em',
    paddingRight:'3em',
    borderRadius:'15px',
    appearance: 'none',
    cursor:'pointer',
    backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23131313%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.9rem top 50%',
    backgroundSize: '0.65rem auto'
  },
  row: { 
    display: 'flex'
  },
  table: { 
    display: 'flex',
    flexDirection:'column'
  },
  column: { 
    display: 'flex',
    flexDirection: 'row'
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


const Step1 = ({nextStep, onFeatureTypeChange, goToStep, currentStep, handleClose}) => { 
  const wallet = useContext(WalletContext);
  
  const [enableNext, setEnableNext] = useState(false);
  const [bodyColour, setBodyColour] = useState({hex:'#7B746D',rgb:{r:123,g:116,b:109,a:1}})
  const [headColour, setHeadColour] = useState({hex:'#7D6658',rgb:{r:125,g:102,b:88,a:1}})
  const [avatarSpec, setAvatarSpec] = useState({body:'pregnant',head:'pig', bodyColour, headColour})
  

  const handleChange = (e, name) => { 
    setEnableNext(false);
    
    
    onFeatureTypeChange(e,name);
    const newSpec={...avatarSpec}
    newSpec.body = name;
    setAvatarSpec(newSpec)
    console.log(newSpec);
    setEnableNext(true);
  }
  const bodyColourChange=(col) => { 
    setBodyColour(col);
    const newSpec={...avatarSpec}
    newSpec.bodyColour = col;
    setAvatarSpec(newSpec)
    console.log(col);
  }

  const headColourChange=(col) => { 
    setHeadColour(col);
    const newSpec={...avatarSpec}
    newSpec.headColour = col;
    setAvatarSpec(newSpec)
    console.log(col);
  }
  const headChange = (e,head) => { 
    const newSpec={...avatarSpec}
    newSpec.head=e.target.value;
    setAvatarSpec(newSpec);
    console.log(e.target.value);
  }
  const heads = ['alien','boarman','frankenstein','goblin','human_female','human_female_elderly','human_male','human_male_elderly','human_male_gaunt','jack','lizard_female','lizard_male','minotaur','minotaur_female','mouse','orc_female','orc_male','pig','rabbit','rat','sheep','skeleton','troll','vampire','wartotaur','wolf_female','wolf_male','zombie'];
  const classes = useStyles();
  const policies = Object.keys(wallet.assets.tokens);
  const theme = useTheme();
  const headOpts = heads.map((h)=><option key={h} value={h}>{h}</option>);

  return <>
    <DialogContent className={classes.dialog}>
      <DialogTitle currentStep={currentStep} id="customized-dialog-title" onClose={handleClose} goToStep={goToStep}>
        Mint New Avatar
      </DialogTitle>
      <div style={{display:'flex', gap:'2em'}}> 
      <AvatarPreview spec={avatarSpec} />
      <div>
      <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Build Type</FormLabel>
      &nbsp;
      <RadioGroup value={avatarSpec.body} aria-label="type" name="type" onChange={handleChange}>
      <div className={classes.row}>
        <FormControlLabel value="male" label="Male" control={<Radio/>} >Male</FormControlLabel>
        </div>
        <div className={classes.row}>
          <FormControlLabel value="female" label="Female" control={<Radio/>} >Female</FormControlLabel>
        </div>
        <div className={classes.row}>
            <FormControlLabel value="teen" label="Teen" control={<Radio/>} >Teen</FormControlLabel>
        </div>
        
        <div className={classes.row}>
        <FormControlLabel value="pregnant" label="Pregnant" control={<Radio/>} >Pregnant</FormControlLabel>
        </div>
        
        <div className={classes.row}>
        <FormControlLabel value="muscular" label="Muscular" control={<Radio/>} >Muscular</FormControlLabel>
        
        </div>
      </RadioGroup>
      </FormControl><br />
      <div style={{display:'flex'}}>
      <FormLabel id="demo-body-tone-label">Body Tone</FormLabel>
      <ColourPicker disableAlpha={true} colour={bodyColour} onChange={bodyColourChange}/>
      <FormLabel id="demo-head-tone-label">Head Tone</FormLabel>
      <ColourPicker disableAlpha={true} colour={headColour} onChange={headColourChange}/>
      </div>
      <FormControl style={{display: 'flex'}}>
        
      <FormLabel id="demo-radio-buttons-group-label">Head</FormLabel>
      <select className={classes.actionSelect} value={avatarSpec.head} onChange={headChange}>
  {headOpts}
      </select>
      </FormControl>
      </div>
      </div>
      <br />
     </DialogContent>
     <DialogButtons previousStep={null} nextStep={nextStep} enableNext={enableNext} />
  </>;
};
const Step2 = ({ featureType, previousStep, goToStep, nextStep, currentStep, handleClose, onImportChange }) => { 
  return <></>
}


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


const MintSmartAvatarDialog = (props) => {
  const { onClose, open, onImportChange } = props;  
  const [featureType, setFeatureType] = useState(null);

  const theme = useTheme();
  const classes=useStyles();
    const handleClose =  (_, reason) => {
      if (reason !== "backdropClick") {
        onClose(null); 
      }
    };
    const onFeatureTypeChange = (e,val) => { 
      setFeatureType(val);
    }

    const importChange = (change) => { 
      onImportChange(change);
    }
    
    return (
      <div>
        <CustomDialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          
            <StepWizard>
              <Step1 onFeatureTypeChange={onFeatureTypeChange} handleClose={handleClose} />
              <Step2 featureType={featureType} onImportChange={importChange} handleClose={handleClose} />
            </StepWizard>
          
        </CustomDialog>
      </div>
    );
}
MintSmartAvatarDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onImportChange: PropTypes.func.isRequired
};
export default MintSmartAvatarDialog;