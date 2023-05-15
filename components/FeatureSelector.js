import { useState , useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {IconButton, useTheme, Button} from '@material-ui/core';
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
import { Add, PlusOneOutlined } from "@material-ui/icons";
const useStyles = makeStyles(theme => { 
  const first = alpha(theme.palette.background.paper, 0.9);
  const second = alpha(theme.palette.background.default, 0.9);
  let bgi = '';
  if (theme.palette.type=='dark') { 
    bgi='';
  }
  return {
    root: {


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
const FeatureSelector = (props) => {
  const {children} = props;
  const theme = useTheme();
  const [addFeatureOpen, setAddFeatureOpen] = useState(false);
  const classes = useStyles(props);
  const closeAddFeature = () => { 
    setAddFeatureOpen(false);
  }
  const addFeatureClick = () => { 
    setAddFeatureOpen(true);
  }
  
  return (
    <div className={classes.root}>
    <Button startIcon=<Add /> onClick={addFeatureClick} color="primary" variant="outlined">Add Feature</Button>
    <AddFeatureDialog open={addFeatureOpen} onClose={closeAddFeature} />
    </div>


  );
}
FeatureSelector.propTypes = {
  onChange: PropTypes.func.isRequired
  
};
export default FeatureSelector;