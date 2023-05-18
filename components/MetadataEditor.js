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
import AddFieldDialog from "./dialogs/AddFieldDialog";
import { Add, PlusOneOutlined, ExpandMore, ChevronRight, Delete, TurnedInRounded } from "@material-ui/icons";
import { TreeView, TreeItem } from "@material-ui/lab";
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
const MetadataEditor = (props) => {
  const {children, onChange, defaultMetadata} = props;
  const theme = useTheme();
  const [addFieldOpen, setAddFieldOpen] = useState(false);
  const [features, setFeatures] = useState([]);
  const classes = useStyles(props);
  const importChange = () => { 

  }

  const closeAddField = () => { 
    setAddFieldOpen(false);
  }
  const addFieldClick = () => { 
    setAddFieldOpen(true);
  }
 
 
  return (
    <div className={classes.root}>
      <Button size="small" startIcon=<Add /> onClick={addFieldClick} color="primary" variant="outlined">Add Field</Button>
      <AddFieldDialog onImportChange={importChange} open={addFieldOpen} onClose={closeAddField} />
      
  
    </div>


  );
}
MetadataEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultMetadata: PropTypes.object
  
};
export default MetadataEditor;