import { useState , useEffect, useRef, useContext } from "react";
import PropTypes from 'prop-types';
import {useTheme, Button} from '@material-ui/core';
import Link from 'next/link'
import WalletContext from './WalletContext';
import { makeStyles, StylesContext } from "@material-ui/core/styles";

import { alpha } from '@material-ui/core/styles/colorManipulator';

import CheckoutIcon from '@material-ui/icons/ShoppingCart';
import MintSmartAvatarDialog from "./dialogs/MintSmartAvatarDialog";

const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.primary.main, 1);
  const second = alpha(theme.palette.secondary.main, 1);
  return {
  
    root: {
      fontFamily: "'Baloo Thambi 2', cursive",
      fontWeight: 600,
      fontSize: '40px',
      letterSpacing: '0.02em',
      borderRadius: '1.5em',
      paddingLeft: '1em',
      paddingRight: '1em',
      paddingTop: '0.2em',
      paddingBottom:'0.2em',
      background:`radial-gradient(circle at top left, ${second} 0%, ${first} 90%)`,
      boxShadow:'2px 2px 10px 5px rgba(0,0,0,0.5)',
      border:'1px solid black'
    }
  };
});
const BigMintButton = (props) => {
  const [icon, setIcon] = useState(<CheckoutIcon />);
  const [on, setOn] = useState(false);
  const [mintDialogOpen, setMintDialogOpen] = useState(false);
  const wallet = useContext(WalletContext);
  
  const mintDialogClose = () => { 
    setMintDialogOpen(false);
  }
  const onClick = () => {     
    if (!wallet.api) { 
      wallet.connectWallet((connected) => { 
        if (connected) { 
          setMintDialogOpen(true);
        }
      }, () => { 
        console.log('Failed to connect?')
      });
    } else { 
      setMintDialogOpen(true);
      console.log('not opening connect wallet because already connecdted');
    }
  }
  
  
  const theme = useTheme();
  const classes = useStyles(props);
  
  return (
    <>
    <MintSmartAvatarDialog open={mintDialogOpen} onClose={mintDialogClose} />
    
    <Button onClick={onClick} variant="contained" className={classes.root} size="large" color="secondary" aria-controls="simple-menu" aria-haspopup="true">
      <div style={{marginRight: '0.3em'}}>{icon}</div> Mint One
    </Button>
    </>
    
  );
}
BigMintButton.propTypes = {
  
};
export default BigMintButton;