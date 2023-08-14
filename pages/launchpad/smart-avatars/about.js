import Head from 'next/head'
import { Container, Typography } from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import BuildIcon from '@material-ui/icons/Build';
import PublicIcon from '@material-ui/icons/Public';
import RemoteIcon from '@material-ui/icons/SettingsRemote';
import Divider from '@material-ui/core/Divider';
import PictureCard from '../../../components/PictureCard';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import ContentCard from '../../../components/ContentCard'
import BuyButton from '../../../components/BuyButton';
import BigMintButton from '../../../components/BigMintButton';

const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.primary.main, 0.8);
  const second = alpha(theme.palette.secondary.main, 0.4);
  const darkfirst = alpha(theme.palette.primary.main, 0.2);
  const darksecond = alpha(theme.palette.secondary.main, 0.2);
  let bg=`linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.65) 100%),url('/fractal-necklace-background-repeating.jpg') !important`;
  if (theme.palette.type=='dark') { 
    bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%), url('/fractal-necklace-background-repeating.jpg') !important`;
   
  }
  return {
    root: {
      display: 'flex', 
      width:'100%'
    },
    row: { 
      display: 'flex',
      width: '100%',
      alignItems:'flex-start',
      gap: '3em'
    },
    smallCol: { 
      flexBasis: '35%'
    },
    bigCol: {
      flexBasis: '65%'
    },
    fullWidth: { 
      flexBasis: '100%'
    },
    bg: { 
      minHeight: '100vh',
      background: bg,
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      '&:after': {
        content: "''",
        position: 'fixed',
        height: '25em',
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 1,
        backdropFilter: 'blur(30px)',
        mask: 'linear-gradient(transparent 0%, black 100%)',
        "-webkitMask":'-webkit-linear-gradient(transparent 0%, black 100%)'
      }
    },
    container: { 
      paddingBottom: '10em'
    },
    heading: { 
      position: 'absolute',
      top: '0.5em',
      right: 0,
      left: 0,
      marginLeft: 'auto',
      marginRight: 'auto'
    },
    main: { 
      marginLeft: '2em',
      marginRight: '2em',
      marginTop:'8.5em'
    }
  };
});

export default function Launchpad() {
  const classes=useStyles();
  return (
    <div>
      <Head>
        <title>About Smart Avatars</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={classes.bg} />
      <Typography color="textPrimary" variant='h1' align="center" className={classes.heading}>
          Smart Avatars
        </Typography><br />
      <main className={classes.main}>
      
        &nbsp;<br />&nbsp;
        <Container maxWidth="xl" className={classes.container}>
          <div className={classes.row+' row'}>
            <div className={classes.smallCol+' column'}> 
              <PictureCard height={920} width={1307} alt="Zombie Alien" src="/launchpad/zombie-alien.png" />
            </div>
            <div className={classes.bigCol+' column'}>
              <ContentCard>
              <Typography variant="h2" color="textSecondary">
                What is a Smart NFT?
              </Typography><br />
              <Typography variant="body1">
                The CIP54 standard allows a HTML+Javascript NFT to receive information about the current state of the blockchain, as well as import files and libraries from the blockchain.<br />
                &nbsp;<br />
                This enables NFTs to respond to their environment in new and interesting ways, including reacting to oracle data, or being triggered by certain events. The standard also greatly increases the amount of data that can be made available to NFTs - image libraries, sounds, videos - an NFT can read files or metadata from any other token - this opens up the blockchain and will allow more expressiveness, art, and utility for many projects.
              </Typography><br />
             
              <BigMintButton />
             
              </ContentCard>
            </div> 
          </div>
          <br />&nbsp;<br />
          </Container>
    
    
      </main>
    </div>
    
  )
}
