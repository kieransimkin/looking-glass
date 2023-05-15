import Head from 'next/head'
import WalletContext from '../components/WalletContext'
import { Typography } from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import ContentCard from '../components/ContentCard'
import {Container} from '@material-ui/core';
import {lazy, Suspense, useEffect} from 'react'
import { DividerBox, DockLayout } from 'rc-dock';
import { useTheme } from '@material-ui/core';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import 'rc-dock/dist/rc-dock-dark.css';
import FeatureSelector from '../components/FeatureSelector';


const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.primary.main, 0.8);
  const second = alpha(theme.palette.secondary.main, 0.4);
  const darkfirst = alpha(theme.palette.primary.main, 0.2);
  const darksecond = alpha(theme.palette.secondary.main, 0.2);
  let bg=`linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.9) 100%),url('/fibres-texture3.jpg') !important`;
  if (theme.palette.type=='dark') { 
    bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url('/fibres-texture3.jpg') !important`;
   
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
    halfCol: { 
      flexBasis: '50%'
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

export default function Play() {
  const classes=useStyles();
  const theme = useTheme();
  let layoutLeft = {};
  let layoutTop = {};
  const featureChange = () => { 

  }
  useEffect( () => { 
    layoutTop = {
      dockbox: {
        mode: 'vertical',
        children: [
          {
            tabs: [{id: 't1', title: 'Tool', content:     <CodeMirror
            value="console.log('hello world!');"
            height="inherit"
            theme={theme.palette.type}
            extensions={[javascript({ jsx: true }),html(), css()]}
            
          />}],
          }
        ]
      },
    };  
  },[theme.palette.type]);
  layoutLeft = {
    dockbox: {
      mode: 'vertical',
      children: [
        {
          tabs: [{id: 't1', title: 'Tool', content: <div>Left Side Dock Layout</div>}],
        },
        {
          tabs: [{id: 't2', title: 'Tool', content: <div>Left Side Dock Layout</div>}],
        }
      ]
    },
  };
  layoutTop = {
    dockbox: {
      mode: 'vertical',
      children: [
        {
          tabs: [{id: 't1', title: 'Tool', content:'<div>hello</div>'}],
        }
      ]
    },
  };
  return (
    <div>
      <Head>
        <title>CIP54 Playground</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
      <div className={classes.bg} />
      
      <DividerBox style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}>
        <DividerBox mode='vertical'  style={{width: '20%', minWidth: 350}}>
        
          <div style={{border: '1px solid #ccc', padding: 5, display: 'flex', backgroundColor: theme.palette.background.default, overflowY: 'auto'}} >
            <FeatureSelector onChange={featureChange}/>
          </div>
          
        </DividerBox>
        <DividerBox mode='vertical' style={{width: '80%', minWidth: 100}}>

          <div style={{border: '1px solid #ccc', padding: 5, display: 'flex', backgroundColor: theme.palette.background.default, overflowY: 'auto'}} > <CodeMirror
          value="console.log('hello world!');"
          height="inherit"
          theme={theme.palette.type}
          extensions={[javascript({ jsx: true }),html(), css()]}
          
        /></div>
                  <div style={{border: '1px solid #ccc', padding: 5, backgroundColor: theme.palette.background.default}}>
Hello
          </div>
          
        </DividerBox>
        
      </DividerBox>
      <br />


  
      
    </div>
    
  )
}
