import { useState , useEffect, useRef, useContext } from "react";
import PropTypes from 'prop-types';
import {useTheme, Button} from '@material-ui/core';
import Link from 'next/link'
import { CastForEducation } from "@material-ui/icons";
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
const AvatarExampleButton = (props) => {
  const theme = useTheme();
  const classes = useStyles(props);
  
  return (
    <Link href="/play/easeljs/smart-avatars">
    
    <Button variant="contained" className={classes.root} size="large" color="secondary" aria-controls="simple-menu" aria-haspopup="true">
      <div style={{marginRight: '0.3em'}}><big><CastForEducation /></big></div> In Action
    </Button>

    </Link>
  );
}
AvatarExampleButton.propTypes = {
  
};
export default AvatarExampleButton;