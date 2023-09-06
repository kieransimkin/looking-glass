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
        letterSpacing: '0.02em',
        borderRadius: '1.5em'
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