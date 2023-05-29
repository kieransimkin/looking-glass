import Head from 'next/head'
import WalletContext from '../components/WalletContext'
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
import PictureCard from '../components/PictureCard';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import VideoCard from '../components/VideoCard'
import ContentCard from '../components/ContentCard'
import Link from 'next/link';
const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.primary.main, 0.8);
  const second = alpha(theme.palette.secondary.main, 0.4);
  const darkfirst = alpha(theme.palette.primary.main, 0.2);
  const darksecond = alpha(theme.palette.secondary.main, 0.2);
  let bg=`linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.9) 100%),url('/paisley.jpg') !important`;
  if (theme.palette.type=='dark') { 
    bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url('/paisley.jpg') !important`;
   
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
      flexBasis: '25%'
    },
    bigCol: {
      flexBasis: '75%'
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

export default function Help() {
  const classes=useStyles();
  return (
    <div>
      <Head>
        <title>CIP54 Help</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={classes.bg} />
      <Typography color="textPrimary" variant='h1' align="center" className={classes.heading}>
          About CIP54
        </Typography><br />
      <main className={classes.main}>
      
        &nbsp;<br />&nbsp;
        <Container maxWidth="xl" className={classes.container}>
          <div className={classes.row+' row'}>
            <div className={classes.smallCol+' column'}> 
              <PictureCard href="https://cips.cardano.org/cips/cip54/" target="_blank" height={862} width={1498} alt="CIP54 screenshot" src="/cip54-screenshot.png" />
            </div>
            <div className={classes.bigCol+' column'}>
              <ContentCard>
              <Typography variant="h2" color="textSecondary">
                What is CIP54?
              </Typography><br />
              <Typography variant="body1">
                The CIP54 standard allows a HTML+Javascript NFT to receive information about the current state of the blockchain, as well as import files and libraries.
              </Typography><br />
             
              
             
              </ContentCard>
            </div> 
          </div>
          <br />&nbsp;<br />
          <div className={classes.row+' row'}>
            
            <div className={classes.bigCol+' column'}>
            <ContentCard>
              <Typography variant="h2" color="textSecondary">
                The Playground
              </Typography><br />
              <Typography variant="body1">
              The Smart NFT Playground allows you to develop and test NFTs inside a runtime environment which is fully compliant with the CIP54 specification. In fact, this is the reference implementation of the specification.
              </Typography><br />
              
              <List className={classes.list}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <BuildIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Add CIP54 Features" secondary="" />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <RemoteIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Write NFT Code" secondary="" />
                </ListItem>
                <Divider variant="middle" component="li" />
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <PublicIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Mint NFT" secondary="" />
                </ListItem>
              </List>
 
              
              </ContentCard>
            </div> 
            <div className={classes.smallCol+' column'}> 
              <PictureCard src="/token-cubes-screenshot.png" alt="Token cubes screenshot" width={2111} height={1907} />
            </div>
          </div>
          <br />&nbsp;<br />
          <div className={classes.row+' row'}>
            <div className={classes.smallCol+' column'}> 
              <PictureCard href="https://plutus.art/" target="_blank" height={288} width={288} alt="CIP54 screenshot" src="/plutus5x.png" />
            </div>
            <div className={classes.bigCol+' column'}>
              <ContentCard>
              <Typography variant="h2" color="textSecondary">
                Buy / Sell / Trade
              </Typography><br />
              <Typography variant="body1">
                Buy, sell or trade your Smart NFTs at <a href="https://plutus.art/" target="_blank" rel="noreferrer">Plutus.art</a>, with native support for CIP54 assets right in the marketplace.
              </Typography><br />
             
              
             
              </ContentCard>
            </div> 
          </div>
          <br />&nbsp;<br />
          </Container>
    
    
      </main>
    </div>
    
  )
}
