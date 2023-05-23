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
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { useWindowDimensions } from '../utils/Hooks'
import CastForEducationIcon from '@material-ui/icons/CastForEducation';
import PropTypes from 'prop-types';
import WalletContext from '../components/WalletContext';
import { Drawer } from '@material-ui/core';
import { HelpOutline, HelpTwoTone, Home, KingBed, SportsKabaddi } from '@material-ui/icons';
import NestedMenuItem from 'material-ui-nested-menu-item';
import ExamplesMenuItems from './ExamplesMenuItems';

const useStyles = makeStyles(theme => { 
    const first = alpha(theme.palette.background.default, 0.85);
    const second = alpha(theme.palette.background.paper, 0.85);
    let bgi = 'url(/paper-texture-light.jpg)';
    if (theme.palette.type=='dark') { 
      bgi='';
    }
    return {
    
    root: {
        
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
    const [wallet, setWallet] = React.useState(null);
    const [darkMode, setDarkMode] = React.useState('light');
    const [walletApi, setWalletAPI] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [callbackFn, setCallbackFn] = React.useState({'fn': () => { return; }, 'fail': () => {return; }});
    const [hide, setHide] = useState(false);
    const [hover, setHover] = useState(false);
    
    // Context: 
    const classes = useStyles(props);
    const router = useRouter();
    const walletCtx = useContext(WalletContext);
    
    let connectContent = <PowerIcon fontSize='small' sx={{padding: 0, margin: 0}} />;

    const buttonsize='medium';
    const buttonclass='nomwbtn';
        
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
            onWalletChange({
                'api': null, 
                'wallet': null, 
                'stakeAddrRaw':null,
                'returnAddrRaw':null,
                'connectWallet': connectWallet
            });
        }
    });

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
          if (!hover) {
            toggleVisibility(true, 'none');
            setAnchorEl(null);
          }
        }, 5000);
      }, [hide, hover, setHide]);
    
   
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
                        alert('Wallet connect error: '+error);
                        callbackFn.fail();            
                        return false;
                    }).then((api) => { 
                    if (!api) return;
                    api.getRewardAddresses().then((addresses) => {
                        api.getChangeAddress().then((change) => {
                            onWalletChange({
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
        setAnchorEl(null);
        
    }

    const handleClick = (value) => { 
        setAnchorEl(value.currentTarget);
    }

    const toggleDarkMode = (e) => { 
        const newMode = darkMode==='light'?'dark':'light';
        setDarkMode(newMode);
        onThemeChange(newMode);
    }

    const handleLogout = () => { 
        onWalletChange(null);
        setWalletAPI(null);
        setWallet(null);
        setAnchorEl(null);
    }

    return (
        
            <Drawer  id="drawer"  classes={{
                paper: classes.drawerPaper,
              }}
                    
             variant="persistent" anchor='right' open={!hide} className={className}>
                {!walletApi &&
                        <div style={{marginLeft:'auto', marginRight: 'auto'}}>
                            <Button size={buttonsize} className={buttonclass} sx={{margin: 0, padding: 0}} variant='outlined' color="secondary" onClick={handleWalletClickOpen}>
                            {connectContent}
                            </Button>
                        </div>
                        
                }
                {walletApi &&
                        <div style={{marginLeft:'auto', marginRight: 'auto'}}>
                            <IconButton className={buttonclass} size={buttonsize} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                                <MenuIcon fontSize={buttonsize} color="secondary" />
                            </IconButton>
                            <Menu
                                id="simple-menu"
                                
                                classes={{
                                    paper: classes.menuPaper
                                }}
                                anchorEl={document.getElementById('drawer')}
                                keepMounted
                                open={Boolean(anchorEl)}
                                getContentAnchorEl={null} 
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                            <Link href="/"><MenuItem onClick={handleClose}>Home</MenuItem></Link>
                            <Link href="/help"><MenuItem>Help</MenuItem></Link>
                            <NestedMenuItem label="Examples" parentMenuOpen={Boolean(anchorEl)}>
                                <a rel="nofollow" target="_blank" href="/examples"><MenuItem>Contents</MenuItem></a>
                                <ExamplesMenuItems parentMenuOpen={Boolean(anchorEl)} />
                            </NestedMenuItem>
                            <Link href="/account"><MenuItem onClick={handleClose}>My Account</MenuItem></Link>
                                
                                <MenuItem onClick={toggleDarkMode}>{darkMode==='dark' ? 'Dark Mode':'Light Mode'}
                                <div style={{position: 'relative', top:'0px', width:'70px'}}>
                                <ToggleButtonGroup
                                    value={darkMode}
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
                                
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    }
                    {!walletApi &&
                        
                        <>
                        <Link href="/">
                            <Button size='large' startIcon=<Home /> color={(router.route=='/') ? 'primary' : 'secondary'} style={{marginLeft:'0.3em'}}>
                                Home
                            </Button>
                        </Link>
                        <Link href="/play">
                            <Button size='large' startIcon=<SportsKabaddi /> color={(router.route=='/play') ? 'primary' : 'secondary'} style={{marginLeft:'0.3em'}}>
                                Play
                            </Button>
                        </Link>
                        <Link href="/examples">
                            <Button size='large' startIcon=<CastForEducationIcon /> color={router.route=='/examples' ? 'primary' : 'secondary'}  style={{marginLeft:'0.3em'}}>
                                Examples
                            </Button>
                        </Link>
                        <Link href="/help">
                            <Button size='large' startIcon=<HelpOutline /> color={router.route=='/help' ? 'primary' : 'secondary'}  style={{marginLeft:'0.3em'}}>
                                Help
                            </Button>
                        </Link>
                        </>
                    }
                <WalletSelector selectedValue={wallet} open={walletOpen} onClose={handleWalletClose} />
            </Drawer>
    )
}
Header.propTypes = {
    onWalletChange: PropTypes.func.isRequired,
    onThemeChange: PropTypes.func.isRequired,
};
export default Header