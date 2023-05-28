import { useState , useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {IconButton, useTheme, Button} from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
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
  const [metadata, setMetadata] = useState(null);
  const classes = useStyles(props);
  const deleteMetadata = (key) => { 
    return function() { 
      const newMetadata = {...metadata};  
      delete newMetadata[key];
      setMetadata(newMetadata);
      if (!defaultMetadata && props.loadStored) { 
        localStorage.setItem('cip54-metadata', JSON.stringify(newMetadata));
      }
      onChange(newMetadata);
    }
  }
  const importChange = (newItem) => {
    const newMetadata = {...metadata};
    if (newItem?.string) { 
      newMetadata[newItem.fieldName]=newItem.string;
    } else if (newItem?.json) { 
      newMetadata[newItem.fieldName]=JSON.parse(newItem.json);
    }
    setMetadata(newMetadata);
    if (!defaultMetadata && props.loadStored) { 
      localStorage.setItem('cip54-metadata',JSON.stringify(newMetadata))
    }
    onChange(newMetadata);
  }
   // This is a yucky way to acheive the initial page load from save:
  useEffect(() => { 
    if (defaultMetadata && !metadata) { 
      setMetadata(defaultMetadata);
      onChange(defaultMetadata);
     }
  })
   
  const closeAddField = () => { 
    setAddFieldOpen(false);
  }
  const addFieldClick = () => { 
    setAddFieldOpen(true);
  }
  const metadataListHTML = [];
  let nodeId=0;
  if (metadata) { 
  for (const [key,value] of Object.entries(metadata)) { 
    // Todo make this recurse into json objects and build a tree view from them
    metadataListHTML.push(
    <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label={key+': '+((typeof value == "object") ? JSON.stringify(value, null, "\t") : value)} onIconClick={deleteMetadata(key)} icon={<Delete />} />
    );
  }
  }
  return (
    <div className={classes.root}>
      <Button size="small" startIcon=<Add /> onClick={addFieldClick} color="primary" variant="outlined">Add Field</Button>
      <AddFieldDialog onImportChange={importChange} open={addFieldOpen} onClose={closeAddField} />
      <TreeView
      disableSelection={true}
      multiSelect={false}
  aria-label="file system navigator"
  defaultExpandIcon={<ChevronRight />}
  defaultCollapseIcon={<ExpandMore />}
>
      {metadataListHTML}
      </TreeView>
    </div>
  );
}
MetadataEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultMetadata: PropTypes.object,
  loadStored: PropTypes.bool
  
};
export default MetadataEditor;