import { useContext, useState , useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {IconButton, useTheme, Button, TextField, RadioGroup, Radio} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import ArrowUpIcon from '@material-ui/icons/ArrowDropUp'
import ArrowDownIcon from '@material-ui/icons/ArrowDropDown'
import { Typography } from "@material-ui/core";
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Image from "next/image";
import AddFeatureDialog from "./dialogs/AddFeatureDialog";
import { Add, PlusOneOutlined, ExpandMore, ChevronRight, Delete, TurnedInRounded } from "@material-ui/icons";
import { TreeView, TreeItem } from "@material-ui/lab";
import WalletContext from "./WalletContext";
import { validAddress, getStakeFromAny } from "../utils/CSL";

const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.background.paper, 0.9);
  const second = alpha(theme.palette.background.default, 0.9);
  
  let bgi = '';
  if (theme.palette.type=='dark') { 
    bgi='';
  }
  return {
    root: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: `${theme.palette.background.paper}`,
      paddingLeft: '0.4em',
      paddingTop: '0.0em',
      paddingBottom: '0.3em',
      
    },
    text: { 
      marginLeft: '0.5em'
    },
    column: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    },
    cardContent: { 
      '& a': { 
        '&:hover': { 
          color: theme.palette.secondary.main,
          transition: `color 0s ease`
        },
        transition: `color 0.8s ease`,
        textDecoration: 'none',
        color: theme.palette.primary.main
      }
    },
  };
});
const SimulationSelector = (props) => {
  const {children, onChange, defaultAddr} = props;
  const theme = useTheme();
  const wallet = useContext(WalletContext);
  const [addr, setAddr] = useState(defaultAddr)
  const [type, setType] = useState('address');
  const classes = useStyles(props);
  
  const handleTypeChange = (e, val) => { 
    
    if (val=='address') { 
      onChange(getStakeFromAny(addr));
    } else if (val=='own' && wallet?.api) { 
      const address = validAddress(wallet.stakeAddrRaw);
      
      onChange(address.to_bech32());
    } else { 
      setType('address');
      onChange(getStakeFromAny(addr));
      return;
    }
    setType(val);
  }
  const handleAddrChange = (e, val) => { 
    setAddr(e.target.value);
    setType('address')
    onChange(getStakeFromAny(e.target.value));
  }
  let selectText = "Emulate token being in this wallet:"
  let walletChoice = "";
  

  if (wallet?.api) { 
    selectText='';
    walletChoice=(
      <div className={classes.column}>
        <Typography variant="body2">Emulate token being in:</Typography>
        
        <RadioGroup className={classes.column} aria-label="simulationtype" name="simulationtype" onChange={handleTypeChange}>
          <div className={classes.column}>
            <Radio size="small" value="own" checked={type=='own'} onChange={handleTypeChange} name="type-radio" />
            <div style={{cursor: 'pointer'}} onClick={()=> handleTypeChange(null,'own')}>
              <Typography variant="body2">My wallet</Typography>
              
            </div>
            
          
          </div>
          <div className={classes.column}>
            <Radio size='small' value="address" checked={type=='address'} onChange={handleTypeChange} name="type-radio" />
            <div style={{cursor: 'pointer'}} onClick={()=> handleTypeChange(null,'address')}>
              <Typography variant="body2">This address:</Typography>
              
            </div>
            
          
          </div>
        </RadioGroup>
      </div>
    )
  }
  return (
    <div className={classes.root}>
      {walletChoice}
      <Typography variant="body2">{selectText}</Typography>
      <TextField inputProps={{
          style: {
            height: "16px",
            
            fontSize: '0.8em'
          },
        }} className={classes.text} size="small" style={{flexGrow: 1,  flexBasis: 'max-content'}} autoFocus onChange={handleAddrChange} label="" variant='outlined' value={addr}/>
      
    </div>


  );
}
SimulationSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultAddr: PropTypes.string
  
};
export default SimulationSelector;