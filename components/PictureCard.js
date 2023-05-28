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
import Link from "next/link";
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Image from "next/image";
const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.background.paper, 1);
  const second = alpha(theme.palette.background.paper, 0);
  return {
    root: {
      borderRadius: '2em !important',
      transition: 'flex-basis 0.8s ease',
      filter: 'drop-shadow(9px 5px 8px rgba(0,0,0,0.25))',
      backgroundColor: theme.palette.background.paper
    },
    cardContent: { 
      padding: '0 !important'
    },
    actionArea: { 
      height: '100%'
    }
  };
});
const PictureCard = (props) => {
  const {src, alt, width, height, href, target} = props;
  const theme = useTheme();
  const classes = useStyles(props);

  const cardContent = (
    <CardContent className={classes.cardContent}>
      <Image src={src} width={width} height={height} layout="responsive" alt={alt}/>
    </CardContent>
  )
  if (href && target) { 
    return (
      <Card className={classes.root} raised={true} variant="elevation">
          <a target={target} rel="noreferrer" href={href}>
            <CardActionArea className={classes.actionArea}>
              {cardContent}
            </CardActionArea>
          </a>
      </Card>
    );
  } else if (href) { 
    return (
      <Card className={classes.root} raised={true} variant="elevation">
          <Link href={href}>
            <CardActionArea className={classes.actionArea}>
              {cardContent}
            </CardActionArea>
          </Link>
      </Card>
    );
  } else { 
    return (
      <Card className={classes.root} raised={true} variant="elevation">
        {cardContent}
      </Card>
    );
  }
}
PictureCard.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string
};
export default PictureCard;