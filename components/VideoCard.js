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
import YouTube from "react-youtube";


const VideoCard = (props) => {
  const {src, offset, autoplay, onLoad} = props;
  const useStyles = makeStyles(theme => { 
    const first = alpha(theme.palette.background.paper, 1);
    const second = alpha(theme.palette.background.paper, 0);
    let offsetVideo = '0px';
    if (offset) { 
      offsetVideo = '-15px';
    }
    return {
      root: {
        borderRadius: '2em !important',
        outline: '1px solid black',
        transition: 'flex-basis 0.8s ease',
        filter: 'drop-shadow(9px 5px 8px rgba(0,0,0,0.25))',
        backgroundColor: theme.palette.background.paper
      },
      cardContent: { 
        '& iframe': {
          width:'100%',
          
          marginBottom: '-10px'
        },
        '& video': {
          top: offsetVideo,
          marginBottom: offsetVideo,
          position: 'relative',
          display: 'block'
        },
        padding: '0 !important'
      }
    };
  });
  
  const theme = useTheme();
  const classes = useStyles(props);
  const vid = useRef();
  const vidReady = (event) => { 
    //event.target.pauseVideo();
  }
  const videoOpts = {
    playerVars: { 
      autoplay: 1,
      modestbranding: 1,
      fs: 0,
      showinfo: 0,
      rel: 0,
      controls: 1
    }
  };
  useEffect(() => {
    if (autoplay) { 
      vid.current.play();
    }
    if (vid && vid.current && onLoad) { 
      vid.current.addEventListener("play", () => { 
        onLoad();
      });
    }
  }, []);
  
  //<YouTube videoId={videoId} opts={videoOpts} />
  // For some reason react dev sometimes barfs with 
  // TypeError: Cannot read properties of undefined (reading 'type')
  return (
    <Card className={classes.root} raised={true} variant="elevation">
    

      <CardContent className={classes.cardContent}>
      <video ref={vid} width="100%" height="100%" controls={!autoplay} autoPlay={autoplay} muted={autoplay} loop={autoplay}>
        <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
      </CardContent>
  </Card>
  );
}
VideoCard.propTypes = {
  src: PropTypes.string.isRequired,
  offset: PropTypes.bool,
  autoplay: PropTypes.bool,
  onLoad: PropTypes.func
};
VideoCard.defaultProps = {
  autoplay: true
};
export default VideoCard;