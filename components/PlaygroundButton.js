import { useState , useEffect, useRef, useContext } from "react";
import PropTypes from 'prop-types';
import {useTheme, Button} from '@material-ui/core';
import Link from 'next/link'

import { makeStyles, StylesContext } from "@material-ui/core/styles";

import { alpha } from '@material-ui/core/styles/colorManipulator';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

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
  const [icon, setIcon] = useState(<AccessibilityIcon />);
  const [on, setOn] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (on) { 
        setIcon(<big><AccessibilityNewIcon /></big>);
        setOn(false);
      } else { 
        setIcon(<big><AccessibilityIcon /></big>);
        setOn(true);
      }
      
    }, 500);
    return () => clearInterval(interval);
  }, [on]);
  const theme = useTheme();
  const classes = useStyles(props);
  
  return (
    <Link href="/play">
    
    <Button variant="contained" className={classes.root} size="large" color="secondary" aria-controls="simple-menu" aria-haspopup="true">
      <div style={{marginRight: '0.3em'}}>{icon}</div> Playground
    </Button>

    </Link>
  );
}
PlaygroundButton.propTypes = {
  
};
export default PlaygroundButton;