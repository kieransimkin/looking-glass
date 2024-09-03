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
 * @description Renders a responsive navigation menu with various options, including
 * wallet management, theme switching, and help resources. It uses React hooks for
 * state management and event handling, as well as context API and local storage to
 * store user data.
 *
 * @param {object} props - Used to receive data from parent components.
 *
 * @returns {JSX.Element} A React component rendered as HTML.
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
     * @description Closes an about section by updating a state variable, setAboutOpen,
     * to false when called. This typically occurs in response to a user action, such as
     * clicking on a close button. The updated state triggers a re-render of the component
     * with the about section closed.
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
     * @description Stores a given wallet object in local storage, converting it to JSON
     * format first, and then calls another function `onWalletChange` with the same wallet
     * object as an argument.
     *
     * @param {object} props - Intended to be used as data.
     *
     * @returns {boolean} A result of calling the `onWalletChange(props)` function,
     * indicating whether the wallet change operation was successful or not.
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
        // Restores wallet information and theme settings.
        if (!walletCtx) {  
            let wallet = null
            try { 
                wallet=JSON.parse(localStorage.getItem('cip54-wallet'));
            } catch (e) {} 
            if (wallet && wallet?.wallet) { 
                try { 
                    window.cardano[wallet.wallet].isEnabled().then((enabled)=> { 
                        // Enables a wallet.
                        if (enabled){
                            window.cardano[wallet.wallet].enable().catch((error) => { 
                                // Handles an error case.
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
        
        let inHeader=false, elem=e.target?.parentElement;
        while(elem = elem?.parentElement) { // go up till <html>
            
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
     * @description Updates the state by setting the `walletOpen` property to `true` and
     * the `callbackFn` property with two empty functions: one for success and another
     * for failure. This prepares the application for a wallet opening operation.
     */
    const handleWalletClickOpen = () => {
      setCallbackFn({fn: () => { return; }, fail: () => { return; } });
      setWalletOpen(true);
    };
    /**
     * @description Toggles a state variable `saveAsOpen` to true when invoked, likely
     * triggering an action to open or display the save as dialog box for user interaction.
     */
    const handleSaveAsClick = () => { 
        setSaveAsOpen(true);
    }
    /**
     * @description Sets the `importBlockchainOpen` state to `true`, likely controlling
     * the visibility or enablement of a component associated with importing blockchain
     * data. This suggests a toggle-like behavior, enabling users to import blockchain
     * information upon clicking the corresponding button.
     */
    const handleImportBlockchainClick = () => { 
        setImportBlockchainOpen(true);
    }
    /**
     * @description Sets a state variable named `importZipOpen` to true when invoked,
     * likely indicating that a ZIP file import operation should be initiated or displayed.
     * This is typically used in user interface event handling for button clicks or similar
     * interactions.
     */
    const handleImportZipClick = () => { 
        setImportZipOpen(true);
    }
    /**
     * @description Closes a new item or panel by setting a state variable `newOpen` to
     * false. This function is likely used in an event-driven UI, such as when a button
     * is clicked to close a newly opened component. It updates the component's visibility
     * accordingly.
     *
     * @param {boolean} value - Not used within the function, considered unnecessary.
     */
    const handleNewClose = (value) => { 
        setNewOpen(false)
    }
    /**
     * @description Closes the "save as" dialog when called, effectively toggling the
     * `saveAsOpen` state to `false`. It is a callback function likely used within a user
     * interface component to manage the visibility of the save-as dialog box.
     *
     * @param {boolean} value - Unused.
     */
    const handleSaveAsClose = (value) => { 
        setSaveAsOpen(false);
    }
    /**
     * @description Sets the state of `importBlockchainOpen` to `false`, indicating that
     * the import blockchain modal is being closed or dismissed when called with a value.
     *
     * @param {boolean} value - Not used within the function.
     */
    const handleImportBlockchainClose = (value) => { 
        setImportBlockchainOpen(false);
    }
    /**
     * @description Sets the state of a component to close the import zip dialog when
     * invoked with no parameters.
     *
     * @param {boolean} value - Ignored.
     */
    const handleImportZipClose = (value) => { 
        setImportZipOpen(false);
    }
    /**
     * @description Enables or disables a wallet, enabling it only if the value is defined
     * and not null or undefined. It then sets up reward addresses, change address, and
     * stake key using Cardano's API, triggering subsequent actions when these are
     * successfully retrieved.
     *
     * @param {string | undefined} value - Wallet identifier.
     *
     * @returns {boolean} False if an error occurs and true otherwise. Additionally it
     * can call callbackFn.fail() which implies a failure in some operation.
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
                // Enables a cardano wallet.
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
                    // Executes after wallet connection.
                    if (!api) return;
                    api.getRewardAddresses().then((addresses) => {
                        // Handles wallet change events.
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
     * @description Logs a message to the console, clears a timer, and calls the `doClose`
     * function. It does not currently set any focused state or anchor element due to
     * commented-out lines. The purpose is likely to close an interface or menu when called.
     *
     * @param {unknown} value - Not used anywhere in the code.
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
     * @description Logs the current focus state, resets the search focused state to
     * false, and clears the anchor element reference.
     */
    const doClose = () => { 
        console.log(searchFocused)
        setSearchFocused(false);
        setAnchorEl(null);
    };
    /**
     * @description Clears a previously set timer and logs 'leave' to the console,
     * indicating that the mouse has left an element or hovered state is being released.
     */
    const handleLeave = () => { 
        clearTimeout(menuCloseTimer);

        
        
        console.log('leave');
    }
    /**
     * @description Clears a timer when the mouse enters a certain area, indicating that
     * the search input has not received focus and preventing an automatically closing menu.
     */
    const mouseEnter = () => {
        if (!searchFocused) { 
        console.log('mouse enter');
        
        clearTimeout(menuCloseTimer);
        }
        
    }

    /**
     * @description Logs a message to the console, indicating that it maintains focus on
     * a menu item. The commented-out line suggests it was initially intended to clear a
     * timer related to closing the menu, but its current implementation lacks this functionality.
     */
    const keepMenuFocus = () => {
        console.log('keeping menu focus'); 
        //clearTimeout(menuCloseTimer);
    }

    /**
     * @description Resets search focus and clears timers on menu close and search timer,
     * then sets anchor element for dropdown menu to the clicked item's current target element.
     *
     * @param {React.MouseEvent<HTMLAnchorElement>} a - Not used directly.
     *
     * @param {Event} e - Typically used for event handling.
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
     * @description Toggles between light and dark mode by updating the local storage and
     * state variables, triggering a theme change event to notify other components of the
     * new theme.
     *
     * @param {Event} e - Ignored within this function.
     */
    const toggleDarkMode = (e) => { 
        const newMode = darkMode==='light'?'dark':'light';
        localStorage.setItem('cip54-darkmode',newMode)
        setDarkMode(newMode);
        onThemeChange(newMode);
    }

    /**
     * @description Resets several state variables: it calls `doOnWalletChange` with a
     * null argument, sets `walletAPI`, `wallet`, and `anchorEl` to null, effectively
     * logging out the user.
     */
    const handleLogout = () => { 
        doOnWalletChange(null);
        setWalletAPI(null);
        setWallet(null);
        setAnchorEl(null);
    }
    /**
     * @description Sets a state variable `launchpadDialogIsOpen` to `true`, indicating
     * that the launchpad dialog is open and visible. This change typically triggers a
     * re-rendering of the component tree, making the dialog accessible to the user.
     */
    const launchpadDialogOpen = () => { 
        setLaunchpadDialogIsOpen(true);
    } 
    /**
     * @description Closes a dialog box associated with the "launchpad" by setting its
     * state to `false`. This likely renders the dialog non-visible or disables it,
     * depending on the application's UI logic and implementation details.
     */
    const launchpadDialogClose = () => { 
        setLaunchpadDialogIsOpen(false);
    }
    /**
     * @description Initializes a new dialog box by defining its structure and behavior
     * but does not specify any actions to be taken when invoked.
     */
    const openNewDialog = () => { 

    }
    /**
     * @description Dispatches an event to an event bus with a type of `"saveZip"` and a
     * payload containing a string message indicating that the action is saving a zip
     * file. This likely triggers subsequent actions or updates within the application.
     */
    const exportZip = () => { 
        eventBus.dispatch("saveZip", { message: "saving zip" });
    }
    /**
     * @description Dispatches an event to an event bus with a message indicating that
     * HTML is being saved, by calling the `dispatch` method and passing in a string
     * identifier `"saveHtml"` along with an object containing the message `'saving html'`.
     */
    const exportHtml = () => { 
        eventBus.dispatch("saveHtml", {message: 'saving html'});
    }

    /**
     * @description Determines whether to close or open a menu based on the presence of
     * an existing anchor element (`anchorEl`). If present, it calls the `handleClose`
     * function; otherwise, it calls the `handleClick` function, passing in the event
     * object `e`.
     *
     * @param {Event} e - Not used in the function.
     */
    const showHideMenu = (e) => {
        if (Boolean(anchorEl)) { 
            handleClose();
        } else {
            handleClick(e);
        }
    }
    /**
     * @description Closes a previously opened menu or list when an item is clicked. It
     * calls another function, `handleClose`, which is assumed to be defined elsewhere
     * in the codebase. The exact behavior depends on the implementation of `handleClose`.
     */
    const handleItemClick = () => { 
        handleClose();
    }
            // Events:
            useEffect(() => {
                // Adds and removes event listeners.
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