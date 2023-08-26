import Head from 'next/head'
import WalletContext from '../components/WalletContext'
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { Typography, Container } from '@material-ui/core';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import exampleList from '../data/exampleList.json';
import ExampleCard from '../components/ExampleCard';
const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.primary.main, 0.8);
  const second = alpha(theme.palette.secondary.main, 0.4);
  const darkfirst = alpha(theme.palette.primary.main, 0.2);
  const darksecond = alpha(theme.palette.secondary.main, 0.2);
  let bg=`linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.8) 100%),url('/fibres-texture3.jpg') !important`;
  if (theme.palette.type=='dark') { 
    bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%), url('/fibres-texture3.jpg') !important`;
   
  }
  return {
    root: {
      display: 'flex', 
      width:'100%',
      gap: '2em',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      alignItems: 'stretch'
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
      overflowY: 'auto',
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

export default function Examples() {
  const classes=useStyles();
  const examples = [];
  for (const category of exampleList) { 
    for (const example of category.examples) { 
      examples.push( 
        <ExampleCard categorySlug={category.slug} example={example} />
      )
    }
  }
  return (
    <div>
      <Head>
        <title>Smart NFT Examples</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={classes.bg} />
      <Typography color="textPrimary" variant='h1' align="center" className={classes.heading}>
          Examples
        </Typography><br />
      <main className={classes.main}>
      
        &nbsp;<br />&nbsp;
        <Container maxWidth="xl" className={classes.container}>
        
        <div className={classes.root}>
        {examples}
        </div>
        </Container>    
      </main>
    </div>
    
  )
}
