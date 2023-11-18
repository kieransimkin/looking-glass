import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import { useRouter } from 'next/router'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import MenuIcon from '@material-ui/icons/Menu';
import PowerIcon from '@material-ui/icons/Power';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Link from 'next/link'
import WalletSelector from './WalletSelector'
import React, { useEffect, useState,useCallback, useContext } from 'react'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import PersonIcon from '@material-ui/icons/Person';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { useWindowDimensions } from '../utils/Hooks'
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import PropTypes from 'prop-types';
import WalletContext from '../components/WalletContext';
import { Drawer, MenuList, Paper } from '@material-ui/core';
import { HelpOutline, HelpTwoTone, Home, KingBed, SportsKabaddi } from '@material-ui/icons';
import NestedMenuItem from './NestedMenuItem';
import eventBus from '../utils/EventBus';
import { CLIENT_STATIC_FILES_RUNTIME_MAIN_APP } from 'next/dist/shared/lib/constants';
import SearchBox from './SearchBox';
import {Popper} from '@material-ui/core';
import { NextCookies } from 'next/dist/server/web/spec-extension/cookies';
import AboutDialog from './dialogs/AboutDialog';
const useStyles = makeStyles(theme => { 
    const first = alpha(theme.palette.background.default, 0.85);
    const second = alpha(theme.palette.background.paper, 0.85);
    let bgi = 'url(/paper-texture-light.jpg)';
    if (theme.palette.type=='dark') { 
      bgi='';
    }
    return {
    
    root: {
        display: 'inline',
        //backdropFilter: `blur(2px)`,
        boxShadow: `2px 2px 20px 7px rgba(0,0,0,0.20)`,
      //background:``,
      background: `linear-gradient(120deg, ${first} 0%, ${second} 50%) `,
     
      borderBottom: `2px solid rgba(0,0,0,0.4)`,
      transition: 'opacity 0.8s cubic-bezier(0.64, 0.63, 0.39, 1.19)'
    },
    menu: { 
        backgroundImage: bgi
    },
    title: { 
        fontSize: '1.5em',
        fontWeight: 600,
        fontFamily: "'MuseoModerno', cursive"
    },
    hidden: { 
        display: 'inline',
        //backdropFilter: `blur(2px)`,
        boxShadow: `2px 2px 20px 7px rgba(0,0,0,0.20)`,
        borderBottom: `2px solid rgba(0,0,0,0.4)`,
        background:`linear-gradient(120deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 50%)`,
        transition: 'opacity 0.8s cubic-bezier(0.64, 0.63, 0.39, 1.19)'
    },
    tools: { 
        position: 'relative',
        top: '-0px'
    },
    nominbtn: { 
        minWidth: `10px !important`
    },
    drawerPaper: { 
        height: 'auto',
        borderBottomLeftRadius: '1em',
        boxShadow: '2px 2px 25px 1px rgba(0,0,0,0.5)'
    },
    
    drawerPaperOpen: { 
        height: 'auto',
        borderBottomRightRadius: '1em',
        borderTopRightRadius: '1em',
        borderTopLeftRadius: '1em',
        boxShadow: '2px 2px 25px 1px rgba(0,0,0,0.5)'
    },
    menuPaper: {
        translate: '-2.0em',
        borderTopRightRadius: '0px !important'
    }
  }});

let timer = null;

const Header = (props) => {
    // Props: 
    const {onWalletChange, onThemeChange} = props;

    // State: 
    const [walletOpen, setWalletOpen] = React.useState(false);
    const [saveAsOpen, setSaveAsOpen] = React.useState(false);
    const [launchpadDialogIsOpen, setLaunchpadDialogIsOpen] = React.useState(false);
    const [newOpen, setNewOpen] = React.useState(false);
    const [importBlockchainOpen, setImportBlockchainOpen] = React.useState(false);
    const [importZipOpen, setImportZipOpen] = React.useState(false);
    const [wallet, setWallet] = React.useState(null);
    const [darkMode, setDarkMode] = React.useState('dark');
    const [disableLockout, setDisableLockout] = React.useState(false);
    const [stakeAddr, setStakeAddr] = React.useState(null);
    const [walletApi, setWalletAPI] = React.useState(null);
    const [searchFocused, setSearchFocused] = React.useState(false);
    const [tanchorEl, setAnchorEl] = React.useState(null);
    const [prevAnchor, setPrevAnchor]=React.useState();
    const [aboutOpen, setAboutOpen] =React.useState(false);
    const anchorRef = React.useRef();
    let anchorEl = tanchorEl;
    if (searchFocused && anchorRef?.current) {
        //anchorEl=anchorRef.current;
    }
    
    const onAboutClose = () => { 
        setAboutOpen(false);
    }
    
    const [callbackFn, setCallbackFn] = React.useState({'fn': () => { return; }, 'fail': () => {return; }});
    const [hide, setHide] = useState(false);
    const [hover, setHover] = useState(false);
    
    // Context: 
    const classes = useStyles(props);
    const router = useRouter();
    const walletCtx = useContext(WalletContext);
    
    let connectContent = <PowerIcon fontSize='small' sx={{padding: 0, margin: 0}} />;
    // 🔌
    const buttonsize='medium';
    const buttonclass='nomwbtn';
    const doOnWalletChange=(props)=>{
        localStorage.setItem('cip54-wallet',JSON.stringify(props))
        return onWalletChange(props);
    }
    const connectWallet = useCallback((callback, failCallback) => { 
        if (!walletCtx || !walletCtx.api) { 
            setCallbackFn({fn: callback, fail: failCallback});
            setWalletOpen(true);
        } else { 
            
            callback(walletCtx);
        }
    });
    
    useEffect( () => { 
        if (!walletCtx) {  
            let wallet = null
            try { 
                wallet=JSON.parse(localStorage.getItem('cip54-wallet'));
            } catch (e) {} 
            if (wallet && wallet?.wallet) { 
                try { 
                    window.cardano[wallet.wallet].isEnabled().then((enabled)=> { 
                        if (enabled){
                            window.cardano[wallet.wallet].enable().catch((error) => { 
                                let terror = error;
                                if (typeof terror === 'object' && terror.info) { 
                                    terror=terror.info;
                                }
                                console.error(error);
                                alert('Wallet restore error: '+terror);
                                return false;
                            }).then((api) => { 
                            doOnWalletChange({
                                api:api,
                                wallet:wallet.wallet,
                                stakeAddrRaw:wallet.stakeAddrRaw,
                                returnAddrRaw:wallet.returnAddrRaw,
                                connectContent: connectWallet
                            })
                            setWalletAPI(api);
                            setStakeAddr(wallet.stakeAddrRaw);
                            setWallet(wallet.wallet);
                            })
                        } else { 
                            doOnWalletChange({
                                'api': null, 
                                'wallet': null, 
                                'stakeAddrRaw':null,
                                'returnAddrRaw':null,
                                'connectWallet': connectWallet
                            });
                        }
                    });
                } catch (e) { 
                    console.log(e);
                }
            } else { 
                onWalletChange({
                    'api': null, 
                    'wallet': null, 
                    'stakeAddrRaw':null,
                    'returnAddrRaw':null,
                    'connectWallet': connectWallet
                });
            }
        }
        let dark = localStorage.getItem('cip54-darkmode');
            if (dark && dark=='light'||dark=='dark') { 
                setDarkMode(dark);
                onThemeChange(dark);
            }
    },[]);

    const className = (hide) ? classes.hidden : classes.root;
    
    const toggleVisibility = useCallback((hide, cursor) => {
      setHide(hide);
    }, []);
    
    const onMouseMove = useCallback(() => {
        clearTimeout(timer);
    
        if (hide) {
          toggleVisibility(!hide, 'default');
        }
    
        timer = setTimeout(() => {
          if (!hover && !launchpadDialogIsOpen && !anchorEl) {
            toggleVisibility(true, 'none');
            setAnchorEl(null);
          }
        }, 5000);
      }, [hide, hover, setHide, anchorEl]);
    
   
    // Events:
    useEffect(() => {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('click', onMouseMove);
        window.addEventListener('touchstart', onMouseMove);
        window.addEventListener('touchmove', onMouseMove);
        //window.addEventListener('keyup', onMouseMove);
        window.addEventListener('scroll', onMouseMove);

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          window.removeEventListener('click', onMouseMove);
          window.removeEventListener('touchstart', onMouseMove);
          window.removeEventListener('touchmove', onMouseMove);
          //window.removeEventListener('keyup', onMouseMove);
          window.removeEventListener('scroll', onMouseMove);
        };
    }, [onMouseMove]);
    const handleWalletClickOpen = () => {
      setCallbackFn({fn: () => { return; }, fail: () => { return; } });
      setWalletOpen(true);
    };
    const handleSaveAsClick = () => { 
        setSaveAsOpen(true);
    }
    const handleImportBlockchainClick = () => { 
        setImportBlockchainOpen(true);
    }
    const handleImportZipClick = () => { 
        setImportZipOpen(true);
    }
    const handleNewClose = (value) => { 
        setNewOpen(false)
    }
    const handleSaveAsClose = (value) => { 
        setSaveAsOpen(false);
    }
    const handleImportBlockchainClose = (value) => { 
        setImportBlockchainOpen(false);
    }
    const handleImportZipClose = (value) => { 
        setImportZipOpen(false);
    }
    const handleWalletClose = (value) => {
        setWalletOpen(false);
        callbackFn.fn(value);
        let walletIsEnabled = false;
        
        if (typeof value == "undefined" || !value) {
            callbackFn.fail();
            return; 
        };
        try {
            window.cardano[value].isEnabled().then((enabled) => {
                window.cardano[value].enable().catch((error) => { 
                        console.error(error);
                        let terror = error;
                        if (typeof terror === 'object' && terror.info) { 
                            terror=terror.info;
                        }
                        alert('Wallet connect error: '+terror);
                        callbackFn.fail();            
                        return false;
                    }).then((api) => { 
                    if (!api) return;
                    api.getRewardAddresses().then((addresses) => {
                        api.getChangeAddress().then((change) => {
                            doOnWalletChange({
                                'api': api, 
                                'wallet': value, 
                                'stakeAddrRaw':addresses[0],
                                'returnAddrRaw':change,
                                'stakeKey':change.slice(58, 114),
                                'connectWallet':connectWallet
                            });
                        });
                    });
                    setWalletAPI(api);
                });
                setWallet(value);
            });
        } catch (err) {
            callbackFn.fail();
            console.log(err)
        }
    };

    const handleClose = (value) => {
        //setSearchFocused(false);
        //setAnchorEl(null);
        doClose();
        console.log('closed');
        clearTimeout(menuCloseTimer);
        
    }
    let menuCloseTimer = null;
    const doClose = () => { 
        console.log(searchFocused)
        setSearchFocused(false);
        setAnchorEl(null);
    };
    const handleLeave = () => { 
        clearTimeout(menuCloseTimer);

        
        
        console.log('leave');
    }
    const mouseEnter = () => {
        if (!searchFocused) { 
        console.log('mouse enter');
        
        clearTimeout(menuCloseTimer);
        }
        
    }

    const keepMenuFocus = () => {
        console.log('keeping menu focus'); 
        //clearTimeout(menuCloseTimer);
    }

    const handleClick = (a,e) => { 
        if (!searchFocused) { 
            clearTimeout(menuCloseTimer);
            clearTimeout(timer);
            setAnchorEl(a.currentTarget);
            setSearchFocused(false);
        }
    }

    const toggleDarkMode = (e) => { 
        const newMode = darkMode==='light'?'dark':'light';
        localStorage.setItem('cip54-darkmode',newMode)
        setDarkMode(newMode);
        onThemeChange(newMode);
    }

    const handleLogout = () => { 
        doOnWalletChange(null);
        setWalletAPI(null);
        setWallet(null);
        setAnchorEl(null);
    }
    const launchpadDialogOpen = () => { 
        setLaunchpadDialogIsOpen(true);
    } 
    const launchpadDialogClose = () => { 
        setLaunchpadDialogIsOpen(false);
    }
    const openNewDialog = () => { 

    }
    const exportZip = () => { 
        eventBus.dispatch("saveZip", { message: "saving zip" });
    }
    const exportHtml = () => { 
        eventBus.dispatch("saveHtml", {message: 'saving html'});
    }
    return (
        <>
            <Drawer id="drawer"  classes={{
                paper: anchorEl?classes.drawerPaperOpen:classes.drawerPaper,
              }}
                    
             variant="persistent" anchor='right' open={!hide} className={className}>
                
                
                        <div style={{marginLeft:'auto', marginRight: 'auto'}} onMouseMove={keepMenuFocus}  onMouseEnter={handleClick} >
                            <Link href="/" passHref><a>
                                <IconButton style={{cursor: 'pointer'}} className={buttonclass} size={buttonsize} aria-controls="simple-menu" aria-haspopup="true" onClick={()=>console.log('got here')} >
                                
                                    <img src="/favicon-default.png" width="32" height="32" title="Menu" alt="Menu" />
                                </IconButton>
                                </a>
                            </Link>
                            <div ref={anchorRef} style={{position:'absolute', top:'50'}}></div>
                            <Popper
                            modifiers={{offset:{offset:'200'}}}
                                id="simple-menu"
                                classes={{
                                    paper: classes.menuPaper
                                }}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                getContentAnchorEl={null} 
                                placement='right-start'
                                onMouseLeave={()=>{ 
                                    if (searchFocused) return;
                                    menuCloseTimer=setTimeout(()=>{if (!searchFocused) handleClose();},2000)
                                }}
                                style={{position:'relative',top:'50', zIndex:'1000000000'}}
                                onMouseEnter={mouseEnter}
                            
                                
                            >
                             <Paper id="menupaper" className="menupaper" style={{borderTopRightRadius:'0px !important'}}>
                                <MenuList>
                            <NestedMenuItem searchFocused={searchFocused} paperClassName="menupaper-searchbox" direction="left" label="🔎 Search..." parentMenuOpen={Boolean(anchorEl)}>
                                <MenuItem><SearchBox width={300} autoComplete='off' autoFocus={false} onFocus={()=>setSearchFocused(true)} onBlur={()=>setSearchFocused(false)} /></MenuItem>
                               
                              
                            </NestedMenuItem>             
                                         
                            <NestedMenuItem searchFocused={searchFocused} paperClassName="menupaper-collect" direction="left" parentMenuOpen={Boolean(anchorEl)} label="👥 Collect">
                                {walletApi &&
                                    <Link href={"/wallet/"+stakeAddr} ><MenuItem>💸 My Wallet</MenuItem></Link>
                                }   
                            
                                <MenuItem>⚡ Live Feed</MenuItem>

                            </NestedMenuItem>
                            <Link href="/policy"><MenuItem>📂 Create</MenuItem></Link>
                         
                            
                                <MenuItem onClick={toggleDarkMode}>{darkMode==='dark' ? '🌃 Dark Mode':'🔦 Light Mode'}
                                <div style={{position: 'relative', top:'0px', width:'75px'}}>
                                <ToggleButtonGroup
                                    value='light'
                                    size="small"
                                    exclusive
                                    onChange={toggleDarkMode}
                                    aria-label="text alignment"
                                    style={{paddingLeft:'10px', position: 'absolute', top:'-1.1em'}}
                                    >
                                    <ToggleButton value="dark" aria-label="left aligned">
                                        🌞
                                    </ToggleButton>
                                    <ToggleButton value="light" aria-label="centered">
                                        🌙
                                    </ToggleButton>
                                    </ToggleButtonGroup>
                                </div>
                                </MenuItem>
                                <NestedMenuItem searchFocused={searchFocused} paperClassName="menupaper-help" direction="left" parentMenuOpen={Boolean(anchorEl)} label="🩺 Help">
                                
                                    <MenuItem onClick={()=>setAboutOpen(true)}>📇 About Info</MenuItem>

                                </NestedMenuItem>
                                
                                {walletApi &&
                                    <MenuItem onClick={handleLogout}>🏃 Logout</MenuItem>
                                }
                                </MenuList>
                                </Paper>
                            </Popper>
                        </div>
                        {!walletApi &&
                        <div style={{marginLeft:'auto', marginRight: 'auto', zIndex:100}}>
                            <Button title="Connect Wallet" size={buttonsize} className={buttonclass} style={{margin: 0, paddingBottom: 20, border:'none'}} variant='outlined' color="secondary" onClick={handleWalletClickOpen}>
                            {connectContent}
                            </Button>

                        </div>
                        
                }
                    
                <WalletSelector selectedValue={wallet} open={walletOpen} onClose={handleWalletClose} />
                
                

            </Drawer>
            <AboutDialog  open={aboutOpen} onClose={onAboutClose} />
            </>
    )
}
Header.propTypes = {
    onWalletChange: PropTypes.func.isRequired,
    onThemeChange: PropTypes.func.isRequired,
};
export default Header