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
import Image from 'next/image';


const useStyles = makeStyles(theme => { 
    const first = alpha(theme.palette.background.default, 0.85);
    const second = alpha(theme.palette.background.paper, 0.85);
    let bgi = 'url(/paper-texture-light.jpg) !important';
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
    },
    menuPaperLight: { 
        background: bgi,
        translate: '-2.0em',
        borderTopRightRadius: '0px !important'
    }
  }});

let timer = null;

/**
 * @description Renders a header component for a web application, featuring navigation
 * menus, wallet management, and theme control. It also handles events such as mouse
 * movements, clicks, and scroll to toggle menu visibility.
 *
 * @param {object} props - Used to pass state from parent components.
 *
 * @returns {JSX.Element} A React component that represents a UI element with various
 * interactive features such as buttons, menus, and dialogs.
 */
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
    const drawRef = React.useRef();
    const anchorRef = React.useRef();
    let anchorEl = tanchorEl;
    if (searchFocused && anchorRef?.current) {
        //anchorEl=anchorRef.current;
    }
    
    /**
     * @description Sets a boolean state variable named `aboutOpen` to false, indicating
     * that the about section is no longer open or visible to the user. This typically
     * occurs when an "about" dialog box or panel is closed by the user.
     */
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
    var isTouch = (() => { 
        if (typeof window !== 'undefined' && 'ontouchstart' in window) { 
            return true;
        }
        if (typeof navigator !== 'undefined' && navigator?.msMaxTouchPoints > 0) { 
            return true;
        }
        return false;
    })();
    /**
     * @description Stores wallet data to local storage and then calls the `onWalletChange`
     * function, passing it the stored wallet data. The stored data is a JSON string that
     * contains wallet properties provided as an argument to the function.
     *
     * @param {object} props - Expected to contain wallet data.
     *
     * @returns {boolean} Determined by the execution of the `onWalletChange` function
     * called within it.
     */
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
        // Initializes wallet state from local storage.
        if (!walletCtx) {  
            let wallet = null
            try { 
                wallet=JSON.parse(localStorage.getItem('cip54-wallet'));
            } catch (e) {} 
            if (wallet && wallet?.wallet) { 
                try { 
                    window.cardano[wallet.wallet].isEnabled().then((enabled)=> { 
                        // Enables a wallet API if it's enabled on the server, and updates wallet state accordingly.
                        if (enabled){
                            window.cardano[wallet.wallet].enable().catch((error) => { 
                                // Handles errors.
                                let terror = error;
                                if (typeof terror === 'object' && terror.info) { 
                                    terror=terror.info;
                                }
                                console.error(error);
                                alert('Wallet restore error: '+terror);
                                return false;
                            }).then((api) => { 
                            // Handles wallet connection.
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
    
    const onMouseMove = useCallback((e) => {
        //console.log(e); e.target 
        
        let inHeader=false, elem=e.target.parentElement;
        while(elem = elem.parentElement) { // go up till <html>
            
            if (elem?.id=='header' || elem?.getAttribute('role')=='tooltip') {
                inHeader=true;
                break;
            }

        }
        if (inHeader) { 
            clearTimeout(timer)
            return;
        
        
        } else { 

            clearTimeout(timer);
        
            if (hide) {
                // if it's hidden, set the hidden status to false
            
              toggleVisibility(false, 'default');
            }
        
            timer = setTimeout(() => {
                toggleVisibility(true, 'none');
                setAnchorEl(null);
            }, 1000);
        }
      }, [hide, hover, setHide, anchorEl, drawRef.current]);
    
      const onSwipe = useCallback(() => {
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

    /**
     * @description Sets a callback object with two functions, `fn` and `fail`, both
     * returning nothing. It also sets the state `walletOpen` to true, likely toggling
     * the visibility of a wallet component. The function appears to handle a button click
     * event to open a wallet.
     */
    const handleWalletClickOpen = () => {
      setCallbackFn({fn: () => { return; }, fail: () => { return; } });
      setWalletOpen(true);
    };
    /**
     * @description Sets a state variable `saveAsOpen` to `true`, indicating that the
     * "Save As" feature is now open and available for user interaction. This is likely
     * part of a UI component's event handling mechanism.
     */
    const handleSaveAsClick = () => { 
        setSaveAsOpen(true);
    }
    /**
     * @description Sets a boolean flag `importBlockchainOpen` to true when called, likely
     * used for managing the visibility or state of an import blockchain feature.
     */
    const handleImportBlockchainClick = () => { 
        setImportBlockchainOpen(true);
    }
    /**
     * @description Sets a state variable `importZipOpen` to true when invoked, likely
     * triggering a side effect such as opening an import zip dialog or showing related
     * UI elements on the screen.
     */
    const handleImportZipClick = () => { 
        setImportZipOpen(true);
    }
    /**
     * @description Closes a new panel when called, effectively setting its visibility
     * to false.
     *
     * @param {boolean} value - Unused.
     */
    const handleNewClose = (value) => { 
        setNewOpen(false)
    }
    /**
     * @description Takes a value as an argument but does not use it. It sets the state
     * variable `saveAsOpen` to `false`, closing the save-as dialog box and preventing
     * further modifications.
     *
     * @param {boolean} value - Not used in this context.
     */
    const handleSaveAsClose = (value) => { 
        setSaveAsOpen(false);
    }
    /**
     * @description Sets a state variable `importBlockchainOpen` to `false`, effectively
     * closing or hiding an import blockchain modal or interface.
     *
     * @param {boolean} value - Always `true`. It is not used anywhere in this snippet.
     */
    const handleImportBlockchainClose = (value) => { 
        setImportBlockchainOpen(false);
    }
    /**
     * @description Updates the state by setting `importZipOpen` to false, effectively
     * closing a zip import dialog or interface.
     *
     * @param {undefined} value - Not used within the function.
     */
    const handleImportZipClose = (value) => { 
        setImportZipOpen(false);
    }
    /**
     * @description Enables a wallet by calling `window.cardano[value].enable()` and
     * handles errors, updating the wallet state and triggering callbacks accordingly.
     * It also retrieves reward addresses and change address from the enabled API.
     *
     * @param {string | undefined} value - Wallet identifier.
     *
     * @returns {boolean} False when an error occurs, and undefined otherwise.
     */
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
                // Enables a Cardano wallet and retrieves reward addresses.
                window.cardano[value].enable().catch((error) => { 
                        // Handles an error.
                        console.error(error);
                        let terror = error;
                        if (typeof terror === 'object' && terror.info) { 
                            terror=terror.info;
                        }
                        alert('Wallet connect error: '+terror);
                        callbackFn.fail();            
                        return false;
                    }).then((api) => { 
                    // Retrieves wallet data.
                    if (!api) return;
                    api.getRewardAddresses().then((addresses) => {
                        // Handles wallet change event.
                        api.getChangeAddress().then((change) => {
                            // Handles wallet change events.
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

    /**
     * @description Closes a menu by calling `doClose`, logs 'closed' to the console, and
     * clears any pending timeout set by `menuCloseTimer`.
     *
     * @param {undefined} value - Not being used within the function.
     */
    const handleClose = (value) => {
        //setSearchFocused(false);
        //setAnchorEl(null);
        doClose();
        console.log('closed');
        clearTimeout(menuCloseTimer);
        
    }
    let menuCloseTimer = null;
    /**
     * @description Updates a state variable (`searchFocused`) to false and resets another
     * state variable (`anchorEl`) to null, indicating that the search focus is lost and
     * the anchor element is no longer set. This change triggers a re-render of the component.
     */
    const doClose = () => { 
        console.log(searchFocused)
        setSearchFocused(false);
        setAnchorEl(null);
    };
    /**
     * @description Clears a timer set by `menuCloseTimer`. This is typically used to
     * prevent an event from being triggered when the user navigates away from an element,
     * often in conjunction with hover or focus events.
     */
    const handleLeave = () => { 
        clearTimeout(menuCloseTimer);

        
        
        console.log('leave');
    }
    /**
     * @description Logs a message to the console, then clears any ongoing timer that
     * would close the menu. This occurs only when the search field does not currently
     * have focus.
     */
    const mouseEnter = () => {
        if (!searchFocused) { 
        console.log('mouse enter');
        
        clearTimeout(menuCloseTimer);
        }
        
    }

    /**
     * @description Prevents a menu from losing focus, as indicated by a log message
     * 'keeping menu focus'. It appears to cancel or reset a timer set for closing the
     * menu when it is triggered. The actual timer is not shown in this snippet.
     */
    const keepMenuFocus = () => {
        console.log('keeping menu focus'); 
        //clearTimeout(menuCloseTimer);
    }

    /**
     * @description Clears two timers when a click event is triggered, sets an anchor
     * element, and resets search focus to false, allowing a menu to be opened or updated
     * upon clicking a specific element.
     *
     * @param {HTMLElement} a - An event target, specifically a DOM element.
     *
     * @param {Event} e - Not used within the function.
     */
    const handleClick = (a,e) => { 
        if (!searchFocused) { 
            clearTimeout(menuCloseTimer);
            clearTimeout(timer);
            setAnchorEl(a.currentTarget);
            setSearchFocused(false);
        }
    }

    /**
     * @description Determines a new mode, 'dark' or 'light', based on the current state
     * of `darkMode`. It then stores the change in local storage and triggers updates to
     * `setDarkMode` and `onThemeChange` accordingly.
     *
     * @param {Event} e - Used to capture event data but not referenced within the function.
     */
    const toggleDarkMode = (e) => { 
        const newMode = darkMode==='light'?'dark':'light';
        localStorage.setItem('cip54-darkmode',newMode)
        setDarkMode(newMode);
        onThemeChange(newMode);
    }

    /**
     * @description Resets various application state variables to null when a logout event
     * occurs, including wallet API connection and local wallet instance, while also
     * notifying listeners of a wallet change through the `doOnWalletChange` method.
     */
    const handleLogout = () => { 
        doOnWalletChange(null);
        setWalletAPI(null);
        setWallet(null);
        setAnchorEl(null);
    }
    /**
     * @description Opens a dialog by setting the state variable `launchpadDialogIsOpen`
     * to `true`. This indicates that the launchpad dialog is now visible and can be
     * interacted with by the user or other parts of the application.
     */
    const launchpadDialogOpen = () => { 
        setLaunchpadDialogIsOpen(true);
    } 
    /**
     * @description Closes a dialog box by setting the `launchpadDialogIsOpen` state to
     * false, effectively hiding it from view and disabling any associated interactive
     * elements or functionality related to the dialog.
     */
    const launchpadDialogClose = () => { 
        setLaunchpadDialogIsOpen(false);
    }
    /**
     * @description Defines an empty function that can be used to create a new dialog
     * window when called, typically by adding event listeners or other necessary logic
     * within its implementation.
     */
    const openNewDialog = () => { 

    }
    /**
     * @description Dispatches an event named "saveZip" to an event bus, passing a payload
     * object with a message indicating that a zip file is being saved.
     */
    const exportZip = () => { 
        eventBus.dispatch("saveZip", { message: "saving zip" });
    }
    /**
     * @description Dispatches a custom event named "saveHtml" to an event bus, passing
     * a message indicating that HTML is being saved. This allows other parts of the
     * application to listen for and respond to this event as needed.
     */
    const exportHtml = () => { 
        eventBus.dispatch("saveHtml", {message: 'saving html'});
    }

    /**
     * @description Toggles between opening and closing a menu by checking the existence
     * of an anchor element (`anchorEl`). If present, it calls the `handleClose` function
     * to close the menu; otherwise, it calls `handleClick` to open it.
     *
     * @param {Event} e - Used for event handling.
     */
    const showHideMenu = (e) => {
        if (Boolean(anchorEl)) { 
            handleClose();
        } else {
            handleClick(e);
        }
    }
    /**
     * @description Handles an item click event by calling another function `handleClose`.
     * This implies a relationship between an item and its closure or dismissal, suggesting
     * a context where items can be clicked to close them.
     */
    const handleItemClick = () => { 
        handleClose();
    }
            // Events:
            useEffect(() => {
                // Adds and removes event listeners for mouse, click, touchmove, and scroll events
                // on the window object.
                window.addEventListener('mousemove', onMouseMove, true);
                window.addEventListener('click', onMouseMove, true);
                window.addEventListener('touchmove', onMouseMove, true);
                window.addEventListener('scroll', onMouseMove, true);
                //const ZingTouch = require('zingtouch');
                //var myRegion = new ZingTouch.Region(document.body);
                //myRegion.bind(document.body,'swipe', onSwipe)
                return () => {
                  window.removeEventListener('mousemove', onMouseMove, true);
                  window.removeEventListener('click', onMouseMove, true);
                  
                  window.removeEventListener('touchmove', onMouseMove, true);
                  
                  window.removeEventListener('scroll', onMouseMove,true);
                  
                };
            }, [onMouseMove]);

    return (
        <header ref={drawRef}  id="header">
            <Drawer id="drawer" classes={{
                paper: anchorEl?classes.drawerPaperOpen:classes.drawerPaper,
              }}
                    
             variant="persistent" anchor='right' open={!hide} className={className}>
                
                
                        <div style={{marginLeft:'auto', marginRight: 'auto'}} onMouseEnter={handleClick} >
                            <Link href={isTouch ? "#" : "/"} passHref><a>
                                <IconButton style={{cursor: 'pointer'}} className={buttonclass} size={buttonsize} aria-controls="simple-menu" aria-haspopup="true" onClick={isTouch ? showHideMenu : null} >
                                
                                    <img src="/favicon-default.png" width="32" height="32" title="Menu" alt="Menu" />
                                </IconButton>
                                </a>
                            </Link>
                            <div ref={anchorRef} style={{position:'absolute', top:'50'}}></div>
                            <Popper
                            modifiers={{offset:{offset:'200'}}}
                                id="simple-menu"
                                classes={{
                                    paper: darkMode==='dark'?classes.menuPaper:classes.menuPaperLight
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
                             <Paper id="menupaper" className={darkMode==='dark'?'menupaper':'menupaper-light'} style={{borderTopRightRadius:'0px !important'}}>
                                <MenuList>
                                <Link href="/" passHref><MenuItem onClick={handleItemClick}>🏡 Home</MenuItem></Link>
                            <NestedMenuItem searchFocused={searchFocused} paperClassName="menupaper-searchbox" direction="left" label="🔎 Search..." parentMenuOpen={Boolean(anchorEl)}>
                                <MenuItem><SearchBox width={300} autoComplete='off' autoFocus={false} onFocus={()=>setSearchFocused(true)} onBlur={()=>{
            clearTimeout(menuCloseTimer);
            clearTimeout(timer);
            setAnchorEl(null);
            setSearchFocused(false);
                                setSearchFocused(false);
                                }} /></MenuItem>
                               
                              
                            </NestedMenuItem>             
                                         
                            <NestedMenuItem searchFocused={searchFocused} paperClassName="menupaper-collect" direction="left" parentMenuOpen={Boolean(anchorEl)} label="👥 Collect">
                                {walletApi &&
                                    <Link href={"/wallet/"+stakeAddr} ><MenuItem onClick={handleItemClick}>💸 My Wallet</MenuItem></Link>
                                }   
                                <Link href="/stats" passHref><a><MenuItem onClick={handleItemClick}>📈 Stats</MenuItem></a></Link>
                                <MenuItem onClick={handleItemClick}>⚡ Live Feed</MenuItem>

                            </NestedMenuItem>
                            <NestedMenuItem searchFocused={searchFocused} paperClassName="menupaper-collect" direction="left" parentMenuOpen={Boolean(anchorEl)} label="📂 Create">
                            <a target="_blank" href="https://nft-playground.dev/"><MenuItem onClick={handleItemClick}><img width="32" src="/nft-playground-small.png" style={{paddingRight:'5px'}} />NFT Playground</MenuItem></a>
                            </NestedMenuItem>
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
                                
                                    <MenuItem onClick={()=>{ setAboutOpen(true); handleItemClick()}}>📇 About Info</MenuItem>

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
            </header>
    )
}
Header.propTypes = {
    onWalletChange: PropTypes.func.isRequired,
    onThemeChange: PropTypes.func.isRequired,
};
export default Header