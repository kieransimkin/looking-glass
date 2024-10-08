import React, { useEffect, useRef, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {useTheme, Button, CircularProgress, TextareaAutosize} from '@material-ui/core';
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
import {TextField} from '@material-ui/core';
import CustomDialog from '../CustomDialog';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import Image from 'next/image';
import { getVersion } from 'libcip54';
import portalPkgInfo from  '../../submodules/SmartNFTPortal/package.json'
import clgPkgInfo from '../../package.json'
const version = portalPkgInfo.version;
const clgVersion = clgPkgInfo.version;

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
  infoTable: { 
    '& td': { 
      paddingLeft:5,
      paddingRight:5,
    },
    width: '100%',
    borderSpacing: 50,
    borderCollapse: 'separate'
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

const AboutDialog = (props) => {
  const { onClose, open} = props;  
  const theme = useTheme();
  const classes=useStyles();
    const handleClose =  (_, reason) => {
      onClose(null); 
      if (reason !== "backdropClick") {
        
      }
    };
    return (
      <div>
        <CustomDialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
          <DialogContent sx={{backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary}} >
            <MuiDialogTitle disableTypography className={classes.root}>
              <div style={{display: 'flex', paddingRight:'-4em', justifyContent:'space-between'}}>
                <div style={{flexGrow:1}}> 
                  <div style={{display: 'flex', gap:'4em'}}>
                  <div style={{width:'32px', display:'inline'}}>
                  <Image src="/favicon-32x32.png" width="32" height="32" alt="Cardano Looking Glass Logo" /></div><Typography variant="h6" style={{display:'inline', position:'relative',top:'25px'}}>Cardano</Typography>
                  </div>
                  
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
            
            <a href="https://github.com/kieransimkin/looking-glass" target="_blank"><Image src="/logo.svg" width="500" height="200" alt={"Cardano Looking Glass version "+clgVersion} title={"Cardano Looking Glass version "+clgVersion} style={{filter:'brightness(50%) sepia(100%) saturate(2000%) hue-rotate(9deg)'}} /></a>
            <table className={classes.infoTable}>
            <tbody>
            
            <tr><td><a href="https://github.com/kieransimkin/looking-glass" target="_blank"><Typography variant='h6' style={{width:'100%',textAlign:'right'}}><b>Version:</b></Typography></a></td><td><Typography variant="h6"><small><a href="https://github.com/kieransimkin/looking-glass" target="_blank">{clgVersion}</a></small></Typography></td></tr>
            <tr><td><a href="https://kieransimkin.co.uk/" target="_blank"><Typography variant='h6' style={{width:'100%',textAlign:'right'}}><b>Author:</b></Typography></a></td><td><Typography variant="h6"><small><a href="https://kieransimkin.co.uk/" target="_blank">Kieran Simkin</a></small></Typography></td></tr>

            <tr><td>&nbsp;</td></tr>
            <tr><td><a href="https://github.com/kieransimkin/libcip54" target="_blank"><Typography variant='h6' style={{width:'100%',textAlign:'right'}}><b>libcip54:</b></Typography></a></td><td><Typography variant="h6"><small><a href="https://github.com/kieransimkin/libcip54" target="_blank">{getVersion()}</a></small></Typography></td></tr>
            <tr><td><a href="https://github.com/kieransimkin/smartnftportal" target="_blank"><Typography variant='h6' style={{width:'100%',textAlign:'right'}}><b>SmartNFTPortal:</b></Typography></a></td><td><Typography variant="h6"><small><a href="https://github.com/kieransimkin/smartnftportal" target="_blank">{version}</a></small></Typography></td></tr>
            
            </tbody>
            </table>
          </DialogContent>
          <DialogActions sx={{backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary}}>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </CustomDialog>
      </div>
    );
}
AboutDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
export default AboutDialog;