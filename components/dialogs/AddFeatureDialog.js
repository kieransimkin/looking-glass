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


const Step1 = ({nextStep, onFeatureTypeChange, goToStep, currentStep, handleClose}) => { 
  const wallet = useContext(WalletContext);
  const [featureType, setFeatureType] = useState(null);
  const [enableNext, setEnableNext] = useState(false);

  const handleChange = (e, name) => { 
    setEnableNext(false);
    setFeatureType(name);
    onFeatureTypeChange(e,name);
    setEnableNext(true);
  }

  const classes = useStyles();
  const policies = Object.keys(wallet.assets.tokens);
  
  const theme = useTheme();
  
  return <>
    <DialogContent className={classes.dialog}>
      <DialogTitle currentStep={currentStep} id="customized-dialog-title" onClose={handleClose} goToStep={goToStep}>
        Select Feature
      </DialogTitle>
    
      <Typography variant="body1">Select which Smart NFT feature you would like to add:</Typography>
      <br />&nbsp;<br />
      <RadioGroup aria-label="type" name="type" onChange={handleChange}>
        <div className={classes.row}>
          <Radio value="libraries" checked={featureType=='libraries'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'libraries')}>
            <Typography>Libraries</Typography>
            <Typography variant='caption'>Import standard Javascript libraries for use in your NFT</Typography>
          </div>
        </div>
        <br />
        <div className={classes.row}>
          <Radio value="tokens" checked={featureType=='tokens'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'tokens')}>
            <Typography>Tokens</Typography>
            <Typography variant='caption'>Import a list of tokens held by a particular address</Typography>
          </div>
        </div>
        <br />
        <div className={classes.row}>
          <Radio value="transactions" checked={featureType=='transactions'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'transactions')}>
            <Typography>Transactions</Typography>
            <Typography variant='caption'>Import a list of the most recent transactions at an address</Typography>
          </div>
        </div>
        <br />
        <div className={classes.row}>
          <Radio value="renderer" checked={featureType=='renderer'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'renderer')}>
            <Typography>Renderer</Typography>
            <Typography variant='caption'>Specify that another token provides the rendering code for this NFT</Typography>
          </div>
        </div>
        <br />
      </RadioGroup>
    
  
  
     </DialogContent>
     <DialogButtons previousStep={null} nextStep={nextStep} enableNext={enableNext} />
  </>;
};
const Step2 = ({ featureType, previousStep, goToStep, nextStep, currentStep, handleClose, onImportChange }) => { 
  if (featureType=='libraries') { 
    return <Step2Libraries featureType={featureType} previousStep={previousStep} goToStep={goToStep} nextStep={nextStep} currentStep={currentStep} handleClose={handleClose} onImportChange={onImportChange}/>
  } else if (featureType=='tokens') { 
    return <Step2Tokens featureType={featureType} previousStep={previousStep} goToStep={goToStep} nextStep={nextStep} currentStep={currentStep} handleClose={handleClose} onImportChange={onImportChange}/>    
  } else if (featureType=='transactions') { 
    return <Step2Transactions featureType={featureType} previousStep={previousStep} goToStep={goToStep} nextStep={nextStep} currentStep={currentStep} handleClose={handleClose} onImportChange={onImportChange}/>    
  } else if (featureType=='renderer') { 
    return <Step2Renderer featureType={featureType} previousStep={previousStep} goToStep={goToStep} nextStep={nextStep} currentStep={currentStep} handleClose={handleClose} onImportChange={onImportChange}/>    
  }
}

const Step2Libraries = ({ previousStep, goToStep, nextStep, currentStep, handleClose, onImportChange }) => { 
  const theme = useTheme();
  
  const [enableNext, setEnableNext] = useState(false);
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');
  const [version, setVersion] = useState('');
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0 && search.length!=0;
  const wallet = useContext(WalletContext);
  const classes = useStyles();

  const onChange = (e,v) => { 
    if (!v?.name || !v?.version) return;
    setName(v.name);
    setVersion(v.version);
    if (v.name.length>0 && v.version.length>0) { 
      setEnableNext(true);
    } else { 
      setEnableNext(false);
    }
  }
  const handleNameChange = (e) => { 
    const val = e.target.value;
    setName(val);
    if (val.length>0 && version.length>0) { 
      setEnableNext(true);
    } else { 
      setEnableNext(false);
    }
  }
  const handleVersionChange = (e) => { 
    const val = e.target.value;
    setVersion(val);
    if (name.length>0 && val.length>0) { 
      setEnableNext(true);
    } else { 
      setEnableNext(false);
    }
  }
  const complete = () => { 
    onImportChange({libraries: {name, version}});
    handleClose();
  }
  const formatOptionLabel = ({name, version, homepage}) => { 
    return (
    <div style={{ display: "flex", "flexDirection":"column" }}>
    <Typography variant="button">{name}</Typography>
    
    <Typography variant="caption">{version}</Typography>
    </div>
    );
  }
  const searchChange = (e, val) => { 
    setSearch(e.target.value);
    setOptions([]);
    axios.get('https://api.cdnjs.com/libraries?fields=version,homepage&limit=5&search='+e.target.value).then((results) => { 
        if (results.data.results.length<1) { 
          setOptions([{name:'Nothing Found'}])
        } else { 
          setOptions([...results.data.results]);
        }

    })
  }
  return <>
    <DialogContent className={classes.dialog}>
      <DialogTitle currentStep={currentStep} id="customized-dialog-title" goToStep={goToStep} onClose={handleClose}>
        Choose Library
      </DialogTitle>      
      <Typography variant="body1">Select which libraries you would like to include from the list below:</Typography>
      <br />&nbsp;<br />
      <Autocomplete
        style={{ width: 500 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        options={options}
        renderOption={formatOptionLabel}
        getOptionLabel={(option)=>option.name}
        onChange={onChange}
        filterOptions={(x) => x} 
        loading={loading}
        renderInput={(params) => (
          <TextField
            onChange={searchChange}
            
            {...params}
            label="Search cdnjs..."
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <div style={{minHeight: '300px'}}>
      <br />
      &nbsp;
      <br />
        <Typography variant='subtitle1'>Manually enter library names or versions here.<br />Be aware that libraries will be loaded from cdnjs</Typography><br />
        <br />
        <TextField style={{width:'440px'}} autoFocus onChange={handleNameChange} label="Library Name" variant='outlined' value={name}/>
        <br />
        &nbsp;
        <br />
        <TextField style={{width:'440px'}} autoFocus onChange={handleVersionChange} label="Version" variant='outlined' value={version} />
      </div>
      <br />
    </DialogContent>
    <DialogButtons previousStep={previousStep} nextStep={complete} nextStepLabel='Add' enableNext={enableNext} />
    
  </>;
};

const Step2Tokens = ({ previousStep, goToStep, nextStep, currentStep, handleClose, onImportChange }) => { 
  const theme = useTheme();
  
  const [enableNext, setEnableNext] = useState(false);
  const [addr, setAddr] = useState(null);
  const [type, setType] = useState(null);
  const wallet = useContext(WalletContext);
  const addrFieldRef = useRef();
  const classes = useStyles();

  const handleChange = (e, val) => { 
    setType(val);
    if (val=='address') { 

      if (addr && addr.length>0 && validBech32Address(addr)) { 
        setEnableNext(true);  
      } else { 
        setEnableNext(false);
      }
    } else if (val=='own') { 
      setEnableNext(true);
    }
    if (e) e.preventDefault();
    return false;
  }
  const handleAddrChange = (e) => { 
    setAddr(e.target.value);
    if (e.target.value.length>0 && validBech32Address(e.target.value)) { 
      setEnableNext(true);
    } else { 
      setEnableNext(false);
    }
  }
  const complete = () => { 
    onImportChange({tokens: type=='own' ? 'own' :addr});
    handleClose();
  }
  return <>
    <DialogContent className={classes.dialog}>
      <DialogTitle currentStep={currentStep} id="customized-dialog-title" goToStep={goToStep} onClose={handleClose}>
        Choose address
      </DialogTitle>
      
      
      <Typography variant="body1">Select which address you&apos;d like to import the tokens from</Typography>
      <br />&nbsp;<br />
      <RadioGroup aria-label="type" name="type" onChange={handleChange}>
        <div className={classes.row}>
          <Radio value="own" checked={type=='own'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'own')}>
            <Typography>Own</Typography>
            <Typography variant='caption'>Import the tokens that are held by the owner of this NFT</Typography>
          </div>
        </div>
        <br />
        <div className={classes.row}>
          <Radio value="address" checked={type=='address'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'address')}>
            <Typography>Another address or stake key</Typography>
            <Typography variant='caption'>Import the tokens that are held by the owner of this NFT</Typography>
            <br />
            <TextField style={{width:'500px'}} autoFocus onChange={handleAddrChange} ref={addrFieldRef} disabled={type!='address'} label="Address" variant='outlined'/>
          </div>
        </div>
      </RadioGroup>
      <br />
     </DialogContent>
     <DialogButtons previousStep={previousStep} nextStep={complete} nextStepLabel='Add' enableNext={enableNext} />
    
  </>;
};

const Step2Transactions = ({ previousStep, goToStep, nextStep, currentStep, handleClose, onImportChange }) => { 
  const theme = useTheme();
  
  const [enableNext, setEnableNext] = useState(false);
  const [addr, setAddr] = useState(null);
  const [type, setType] = useState(null);
  const wallet = useContext(WalletContext);
  const addrFieldRef = useRef();
  const classes = useStyles();
  const handleChange = (e, val) => { 
    setType(val);
    if (val=='address') {
      if (addr && addr.length>0 && validBech32Address(addr)) { 
        setEnableNext(true);  
      } else { 
        setEnableNext(false);
      }
    } else if (val=='own') { 
      setEnableNext(true);
    }
    if (e) e.preventDefault();
    return false;
  }
  const handleAddrChange = (e) => { 
    setAddr(e.target.value);
    if (e.target.value.length>0 && validBech32Address(e.target.value)) { 
      setEnableNext(true);
    } else { 
      setEnableNext(false);
    }
  }
  const complete = () => { 
    onImportChange({transactions: type=='own' ? 'own' :addr});
    handleClose();
  }
  return <>
    <DialogContent className={classes.dialog}>
      <DialogTitle currentStep={currentStep} id="customized-dialog-title" goToStep={goToStep} onClose={handleClose}>
        Choose address
      </DialogTitle>
      
      
      <Typography variant="body1">Select which address you&apos;d like to import the transactions from</Typography>
      <br />&nbsp;<br />
      
      <RadioGroup aria-label="type" name="type" onChange={handleChange}>
        <div className={classes.row}>
          <Radio value="own" checked={type=='own'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'own')}>
            <Typography>Own</Typography>
            <Typography variant='caption'>Import the transactions of the owner of this NFT</Typography>
          </div>
        </div>
        <br />
        <div className={classes.row}>
          <Radio value="address" checked={type=='address'} onChange={handleChange} name="type-radio" />
          <div style={{cursor: 'pointer'}} onClick={()=> handleChange(null,'address')}>
            <Typography>Another address or stake key</Typography>
            <Typography variant='caption'>Import the transactions from another address or stake key</Typography>
            <br />
            <TextField style={{width:'500px'}} autoFocus onChange={handleAddrChange} ref={addrFieldRef} disabled={type!='address'} label="Address" variant='outlined'/>
          </div>
        </div>
      </RadioGroup>
      <br />
     </DialogContent>
     <DialogButtons previousStep={previousStep} nextStep={complete} nextStepLabel='Add' enableNext={enableNext} />

  </>;
};

const Step2Renderer = ({ previousStep, goToStep, nextStep, currentStep, handleClose, onImportChange }) => { 
  const theme = useTheme();
  
  const [enableNext, setEnableNext] = useState(false);
  const [asset, setAsset] = useState('');
  
  const wallet = useContext(WalletContext);
  
  const classes = useStyles();
  
  const handleAssetChange = (e) => { 
    setAsset(e.target.value);
    if (e.target.value.length>0) { 
      setEnableNext(true);
    } else { 
      setEnableNext(false);
    }
  }
  const complete = () => { 
    onImportChange({renderer: asset});
    handleClose();
  }
  return <>
    <DialogContent className={classes.dialog}>
      <DialogTitle currentStep={currentStep} id="customized-dialog-title" goToStep={goToStep} onClose={handleClose}>
        Choose asset
      </DialogTitle>
      
      
      <Typography variant="body1">Select which asset you&apos;d like to function as the renderer for this NFT</Typography>
      <br />&nbsp;<br />
      <TextField value={asset} style={{width:'500px'}} autoFocus onChange={handleAssetChange} label="Asset" variant='outlined'/>
      <br />
     </DialogContent>
     <DialogButtons previousStep={previousStep} nextStep={complete} nextStepLabel='Add' enableNext={enableNext} />    
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


const AddFeatureDialog = (props) => {
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
AddFeatureDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onImportChange: PropTypes.func.isRequired
};
export default AddFeatureDialog;