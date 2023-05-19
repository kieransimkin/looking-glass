import Head from 'next/head'

import WalletContext from './WalletContext'
import { LinearProgress, Typography } from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import ContentCard from './ContentCard'
import {Container} from '@material-ui/core';
import {lazy, Suspense, useEffect, useState, useRef} from 'react'
import { Divider, DockLayout } from 'rc-dock';
import { useTheme } from '@material-ui/core';
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import PropTypes from 'prop-types';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import 'rc-dock/dist/rc-dock-dark.css';
import FeatureSelector from './FeatureSelector';
import SimulationSelector from './SimulationSelector';
import { postData, getData } from '../utils/Api'
import SmartNFTPortal from './SmartNFTPortal';
import MetadataEditor from './MetadataEditor';

import * as cheerio from 'cheerio';

let programCodeTimer = null;


import * as React from "react";
import { minify } from 'html-minifier-terser';



 class DividerBox extends React.PureComponent {

  _ref;
  getRef = (r) => {
    this._ref = r;
  };

  getDividerData = (idx) => {
    if (!this._ref) {
      return null;
    }
    let {children, mode} = this.props;
    let nodes = this._ref.childNodes;
    let length = 1;
    if (Array.isArray(children)) {
      length = children.length;
    }
    if (nodes.length !== length * 2 - 1) {
      return;
    }
    let dividerChildren= [];
    for (let i = 0; i < length; ++i) {
      if (mode === 'vertical') {
        dividerChildren.push({size: (nodes[i * 2]).offsetHeight});
      } else {
        dividerChildren.push({size: (nodes[i * 2]).offsetWidth});
      }
    }
    return {
      element: this._ref,
      beforeDivider: dividerChildren.slice(0, idx),
      afterDivider: dividerChildren.slice(idx)
    };
  };
  changeSizes = (sizes) => {
    let {mode} = this.props;
    let nodes = this._ref.childNodes;
    if (nodes.length === sizes.length * 2 - 1) {
      for (let i = 0; i < sizes.length; ++i) {
        if (mode === 'vertical') {
          (nodes[i * 2]).style.height = `${sizes[i]}px`;
        } else {
          (nodes[i * 2]).style.width = `${sizes[i]}px`;
        }
      }
      this.forceUpdate();
    }
  };

  onDragEnd = () => { 
    if (this.props.onDragEnd) { 
      this.props.onDragEnd();
    }
  };
  render() {
    let {children, mode, className, ...others} = this.props;
    let isVertical = mode === 'vertical';
    let childrenRender = [];
    let classes = "rc-divider";
    if (isVertical) { 
      classes+=" rc-divider-vertical";
    } else { 
      classes+=" rc-divider-horizontal";
    }
    if (Array.isArray((children))) {
      for (let i = 0; i < children.length; ++i) {
        if (i > 0) {
          (childrenRender).push(
            <Divider idx={i} key={i} isVertical={isVertical} className={classes}
                     getDividerData={this.getDividerData} onDragEnd={this.onDragEnd} changeSizes={this.changeSizes}/>
          );
        }
        (childrenRender).push(children[i]);
      }
    } else {
      childrenRender = children;
    }

    let cls;
    if (mode === 'vertical') {
      cls = 'divider-box dock-vbox';
    } else {
      cls = 'divider-box dock-hbox';
    }
    if (className) {
      cls = `${cls} ${className}`;
    }
    return (
      <div ref={this.getRef} className={cls} {...others}>
        {childrenRender}
      </div>
    );
  }
}

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
    dividerClass: { 
        minWidth:'5px',
        minHeight:'5px'
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

const Playground = function (props) {
  
  
  const classes=useStyles();
  const theme = useTheme();
  const defaultAddr = 'stake1uxyldhxclla0fpltcgjkak567hy93nm44vq6vxqryy9trtsv3mhl9'
  const [featureTree, setFeatureTree] = useState({});
  const [metadata, setMetadata] = useState({});
  const [programCode, setProgramCode] = useState('');
  const [smartImports, setSmartImports] = useState({});
  const [simulation, setSimulation] = useState(defaultAddr);
  const [metadataJSON, setMetadataJSON] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);
  const [random, setRandom] = useState(Math.random());


  const updateMetadataJSON = (m, ft, s, programCode) => { 
    const json = { };
    const $ = cheerio.load(programCode);
    

    //console.log(min);
    console.log('XXXXXX');
    $('script').each(function(i, elm) {
      
    });
    minify(programCode, {removeAttributeQuotes: true}).then((pc) => { 
      const files = [];
      for (const [key,value] of Object.entries(m)) { 
        if (key=='uses') { 
          continue;
        }
        
        if (key=='files') { 
          // Always add the actual program code as the first file
          
          files.push({
            'mediaType': "text/html",
            'src': 'data:text/html,'+encodeURIComponent(pc)
          });
          if (typeof value == "string") { 
            continue;
          }
          for (const file of value) { 
            
            
            files.push(file);
          }
          continue;
        }
        json[key]=value;
      }
      json.uses = ft;
      if (files.length<1) { 
  
        // If we didn't add any files, we still need to add our program code:
        
        files.push({
          'mediaType': "text/html",
          'src': 'data:text/html,'+encodeURIComponent(pc)
        });
      }
      json.files = files;
      
      
      
      setMetadataJSON(json);
    })
    
  }
  const defaultProgramCode = props.programCode;
  if (defaultProgramCode && (!programCode || programCode=='')) { 
    setProgramCode(defaultProgramCode);
    updateMetadataJSON(metadata,featureTree,simulation, defaultProgramCode);
  }

  const updateSmartImports = (ft, simulation) => { 
    setPortalLoading(true);
    postData('/getSmartImports',{featureTree: ft, walletAddr: simulation}).then((data)=> { 
      data.json().then((json) => { 
        setSmartImports(json);
        setPortalLoading(false);
      });
    });
  }

  const featureChange = (ft) => { 
    if (ft.transactions && ft.transactions.length===1) {
      ft.transactions = ft.transactions[0];
    }
    if (ft.tokens && ft.tokens.length===1) { 
      ft.tokens = ft.tokens[0];
    }
    setFeatureTree(ft);
    updateMetadataJSON(metadata,ft,simulation, programCode);
    updateSmartImports(ft, simulation);
    console.log('got feature change');
    console.log(ft);
  }
  const simulationChange = (s) => { 
    if (!s) return;

    console.log('Got simulation change');
    console.log(s);
    setSimulation(s);
    updateMetadataJSON(metadata,featureTree,s, programCode);
    updateSmartImports(featureTree, s);
  }
  
  const programCodeChange = (e) => { 
    if (programCodeTimer) clearTimeout(programCodeTimer);
    programCodeTimer = setTimeout(()=> { 
      setProgramCode(e)
      updateMetadataJSON(metadata,featureTree,simulation, e);
    }, 1000);
    
  }
  const metadataChange = (e) => { 
    setMetadata(e);
    updateMetadataJSON(e, featureTree, simulation, programCode);
  }
  const refreshProgram = (e) => { 
    setRandom(Math.random())
  }
  const progressValue = ((JSON.stringify(metadataJSON, null, "\t").length)/16000)*100;
  
  return (
    <div>
      <Head>
        <title>Smart NFT Playground</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      
      <div className={classes.bg} />
      
      <DividerBox onDragEnd={refreshProgram} style={{position: 'absolute', left: 10, top: 10, right: 10, bottom: 10}}>
        <DividerBox mode='vertical' style={{width: '20%', minWidth: 350}}>
        
          <div style={{outline:'1px solid rgba(0,0,0,0.5)', minHeight: '250px', border: '1px solid #ccc', padding: 5, display: 'flex', borderRadius: '5px', backgroundColor: theme.palette.background.default, overflowY: 'auto'}} >
            <FeatureSelector defaultUses={props.uses} onChange={featureChange}/>
          </div>
          <div style={{outline:'1px solid rgba(0,0,0,0.5)', minHeight: '250px', border: '1px solid #ccc', padding: 5, display: 'flex', flexDirection:'column', justifyContent:'flex-start', borderRadius: '5px', backgroundColor: theme.palette.background.default, overflowY: 'auto'}}> 
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Typography style={{}} variant='subtitle2'>NFT Metadata</Typography>
            <Typography style={{}} variant='caption'>{JSON.stringify(metadataJSON,null,"\t").length} bytes</Typography>
            </div>
            <div><LinearProgress variant='determinate' value={progressValue} /></div>
            <MetadataEditor defaultMetadata={props.metadata} onChange={metadataChange} />
            <CodeMirror
              editable={false}
              value={JSON.stringify(metadataJSON, null, "\t")}
              height="inherit"
              theme={theme.palette.type}
              extensions={[EditorView.lineWrapping, javascript({ json: true})]}
          
            />
          </div>
        </DividerBox>
        <DividerBox onDragEnd={refreshProgram} mode='vertical' style={{width: '80%', minWidth: 100}}>

          <div style={{outline:'1px solid rgba(0,0,0,0.5)', minHeight: '350px', border: '1px solid #ccc', padding: 5, display: 'flex', alignItems:'stretch', borderRadius: '5px', backgroundColor: theme.palette.background.default, overflowY: 'auto'}}> 
            <CodeMirror
            
            style={{flexGrow: 1, display: 'flex', flexDirection: 'column'}}
              value={programCode}
              onChange={programCodeChange}
              height="inherit"
              theme={theme.palette.type}
              extensions={[javascript({ jsx: true }),html(), css()]}
          
            />
          </div>
          <div style={{outline:'1px solid rgba(0,0,0,0.5)', minHeight: '350px', border: '1px solid #ccc', display: 'flex', flexDirection: 'column', alignItems: 'stretch', padding: 5, borderRadius: '5px', backgroundColor: theme.palette.background.default}}>
            <SimulationSelector defaultAddr={defaultAddr} onChange={simulationChange} />
            
            <SmartNFTPortal random={random} loading={portalLoading} style={{flexGrow: 1, overflowY: 'hidden', overflowX: 'hidden', border:'1px solid black'}} smartImports={smartImports} metadata={metadataJSON} />
            
          </div>
        </DividerBox>
      </DividerBox>
      
      <br />


  
      
    </div>
    
  )
}

Playground.propTypes = {
  programCode: PropTypes.string,
  metadata: PropTypes.array,
  uses: PropTypes.object
    
};
export default Playground;