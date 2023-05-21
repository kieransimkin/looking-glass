import { useState , useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {IconButton, useTheme, Button} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import { Typography } from "@material-ui/core";
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Image from "next/image";
const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.background.paper, 0.9);
  const second = alpha(theme.palette.background.default, 0.9);
  let bgi = '';
  if (theme.palette.type=='dark') { 
    bgi='';
  }
  return {
    root: {
      borderRadius: '2em !important',
      transition: 'all 0.8s ease',
      filter: 'drop-shadow(9px 5px 8px rgba(0,0,0,0.25))',
      background: `linear-gradient(120deg, ${first} 0%, ${second} 100%)`,
      backgroundImage: bgi,
      width: '100%'
    },
    cardContent: { 
      '& a': { 
        '&:hover': { 
          color: theme.palette.secondary.main,
          transition: `color 0s ease`
        },
        transition: `color 0.8s ease`,
        textDecoration: 'none',
        color: theme.palette.primary.main
      }
    },
  };
});
const ContentCard = (props) => {
  const {children} = props;
  const theme = useTheme();
  const classes = useStyles(props);

  return (
    <Card className={classes.root} raised={true} variant="elevation">
      <CardContent className={classes.cardContent}>
        {children}
      </CardContent>
  </Card>
  );
}
ContentCard.propTypes = {
  
};
export default ContentCard;