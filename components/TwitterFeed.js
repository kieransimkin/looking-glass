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
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Image from "next/image";
import {useHeadingsData} from '../utils/Hooks';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.background.paper, 0.9);
  const second = alpha(theme.palette.background.default, 0.9);
  let bgi = 'url(/paper-texture-light.jpg)';
  if (theme.palette.type=='dark') { 
    bgi='';
  }
  return {
    root: {
      borderRadius: '2em !important',
      filter: 'drop-shadow(9px 5px 8px rgba(0,0,0,0.25))',
      background: `linear-gradient(120deg, ${first} 0%, ${second} 100%)`,
      backgroundImage: bgi,
      width: '100%',
      transition: 'all 0.8s ease'
    },
    cardContent: { 
      
    },
    markdown: { 

    },
    li: { 

    },
    menuLink: {
      '&:hover': { 
        color: theme.palette.secondary.main,
        transition: `color 0s ease`
        
      },
      transition: `color 0.8s ease`,
      color: theme.palette.primary.main
    },
    
  };
});
const TwitterFeed = (props) => {
  const {} = props;
  const theme = useTheme();

  const classes = useStyles(props);
  const darkTwitter = <TwitterTimelineEmbed
  sourceType="profile"
  screenName="SlinQ"
  id="darkTwitter"
  theme="dark"
  options={{height: 700}}
/>;
const lightTwitter = <TwitterTimelineEmbed
sourceType="profile"
screenName="SlinQ"
id="lightTwitter"
theme="light"
options={{height: 700}}
/>;
let twitter;
twitter=theme.palette.type=='dark' ? darkTwitter : lightTwitter;
//twitter=darkTwitter;


  return (
    <Card className={classes.root} raised={true} variant="elevation">
      <CardContent className={classes.cardContent}>
      {twitter}
      </CardContent>
  </Card>
  );
}
TwitterFeed.propTypes = {
  
};
export default TwitterFeed;