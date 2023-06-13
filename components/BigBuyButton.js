import { useState , useEffect, useRef, useContext } from "react";
import PropTypes from 'prop-types';
import {useTheme, Button} from '@material-ui/core';
import Link from 'next/link'

import { makeStyles, StylesContext } from "@material-ui/core/styles";

import { alpha } from '@material-ui/core/styles/colorManipulator';

import CheckoutIcon from '@material-ui/icons/ShoppingCart';

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
const PlaygroundButton = (props) => {
  const [icon, setIcon] = useState(<CheckoutIcon />);
  const [on, setOn] = useState(false);
  
  
  const theme = useTheme();
  const classes = useStyles(props);
  
  return (
    <a href="https://www.plutus.art/collection/smartlife" target="_blank" rel="noreferrer">
    
    <Button variant="contained" className={classes.root} size="large" color="secondary" aria-controls="simple-menu" aria-haspopup="true">
      <div style={{marginRight: '0.3em'}}>{icon}</div> Buy One
    </Button>

    </a>
  );
}
PlaygroundButton.propTypes = {
  
};
export default PlaygroundButton;