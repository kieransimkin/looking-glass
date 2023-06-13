import { useState , useEffect, useRef, useContext } from "react";
import PropTypes from 'prop-types';
import {useTheme, Button} from '@material-ui/core';
import Link from 'next/link'
import CheckoutIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import WalletContext from '../components/WalletContext';

const useStyles = makeStyles(theme => { 
  
  return {
  
    root: {
      fontFamily: "'Baloo Thambi 2', cursive",
      fontWeight: 600,
      letterSpacing: '0.02em',
      borderRadius: '1.5em'
    }
  };
});
const BuyButton = (props) => {
  
  const [buyOpen, setBuyOpen] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(false);
  const wallet = useContext(WalletContext);
  if (loadingOpen && buyOpen) { 
    //setLoadingOpen(false);
  }
  const handleClick = (event) => { 
    
  }

  const theme = useTheme();
  const classes = useStyles(props);
  
  return (
    <>
    <a href="https://www.plutus.art/collection/smartlife" target="_blank" rel="noreferrer">
    <Button variant="contained" className={classes.root} size="large" endIcon={<CheckoutIcon />} color="secondary" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
      Check for listings
    </Button></a>
    
    </>
  );
}
BuyButton.propTypes = {
  
};
export default BuyButton;