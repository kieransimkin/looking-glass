import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Image from 'next/image';
import { makeStyles } from "@material-ui/core/styles";
import CustomDialog from './CustomDialog';


const useStyles = makeStyles(theme => { 
    return {
      link: {
        color:`${theme.palette.text.primary} !important`,
        textDecoration: 'none'
      }
    };
});

// This mini-component just conditionally wraps each list item in a link if they don't have any wallets installed
const WithLink = ({ link, children }) => { 
    const classes = useStyles();
    if (link) { 
        return <a className={classes.link} target="_blank" href={link} rel="noopener noreferrer">{children}</a>;
    } else { 
        return children;
    }
}

const WalletSelector = (props) => {
    // Props
    const { onClose, selectedValue, open } = props;

    // State
    const [ wallets, setWallets ] = useState({wallets:[],whichWalletSelected:null});

    // Events
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
        onClose(value);

      
    };

    const pollWallets = (count = 0) => {
        const wallets = [];
        for(const key in window.cardano) {
            if (key=='ccvault') continue;
            if (window.cardano[key].enable && wallets.indexOf(key) === -1) {
                wallets.push(key);
            }
        }
        if (wallets.length === 0 && count < 3) {
            setTimeout(() => {
                pollWallets(count + 1);
            }, 1000);
            return;
        }
        setWallets({
            wallets,
            whichWalletSelected: wallets[0]
        });
    }

    // Init
    useEffect(pollWallets,[]);
    
    let walletList = wallets.wallets;
    let link = false;
    if (walletList.length<1) { 
        walletList=['flint','eternl','begin','nami','gero','typhon'];
        link=true;
    }
    return (
        <CustomDialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} style={{borderRadius: '15px'}}>
            <DialogTitle id="simple-dialog-title">Choose Wallet</DialogTitle>
            <List>
            {walletList.map((wallet) => { 
                let logo = null;
                let url = null;
                switch (wallet) { 
                    case 'nami':
                        logo='/nami.png';
                        url='https://namiwallet.io/';
                        break;
                    case 'eternl':
                        logo='/eternl.png';
                        url='https://ccvault.io/';
                        break;
                    case 'flint':
                        logo='/flint.jpg';
                        url='https://flint-wallet.com/';
                        break;
                    case 'begin':
                        logo='/begin.png';
                        url='https://begin.is/';
                        break;
                    case 'gero':
		            case 'gerowallet':
                        wallet='Gero';
                        url='https://gerowallet.io/';
                        logo='/gero.png';
                        break;
                    case 'typhon':
                        url='https://typhonwallet.io/';
                        logo='/typhon.svg';
                        break;
                    case 'lace':
                        url='https://www.lace.io/';
                        logo='/lace.svg';
                        break;
                }
                if (!link) { 
                    url=null;
                }
                return (
                <WithLink key={wallet} link={url}>
                    <ListItem button onClick={() => { if (!url) handleListItemClick(wallet);}} style={{paddingLeft:'3em', paddingRight: '3em'}}>
                        <ListItemAvatar>
                        <Avatar style={{backgroundColor:'white'}}>
                            {logo && 
                                <Image src={logo} width="40" height="40" alt={wallet} />
                            }
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText style={{textTransform:'capitalize'}} primary={wallet} />
                    </ListItem>
                </WithLink>
                );
            })}
            </List>
        </CustomDialog>
    );
}
WalletSelector.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string,
  };
export default WalletSelector
