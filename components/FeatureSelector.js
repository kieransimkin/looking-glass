import { useState , useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import {IconButton, useTheme, Button} from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import Image from "next/image";
import AddFeatureDialog from "./dialogs/AddFeatureDialog";
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

const FeatureSelector = (props) => {
  const {children, onChange, defaultUses} = props;
  const theme = useTheme();
  const [addFeatureOpen, setAddFeatureOpen] = useState(false);
  const [features, setFeatures] = useState(null);
  const classes = useStyles(props);
  
  const getFeatureTree = (f) => { 
    let featureTree = {};
    if (!f) return featureTree;
    for (var c=0; c<f.length; c++) { 
      if (f[c]?.renderer) { 
        // There can be only one renderer
        featureTree.renderer = f[c]?.renderer
      }
      if (f[c]?.mintTx) { 
        featureTree.mintTx = f[c]?.mintTx;
      }
      if (f[c]?.files) { 
        featureTree.files = f[c]?.files;
      }
      if (f[c]?.libraries) { 
        if (!featureTree?.libraries) { 
          featureTree.libraries=[];
        }
        featureTree.libraries.push(f[c].libraries);
      }
      if (f[c]?.tokens) { 
        if (!featureTree?.tokens) { 
          featureTree.tokens=[];
        }
        featureTree.tokens.push(f[c].tokens);
      }
      if (f[c]?.utxos) { 
        if (!featureTree?.utxos) { 
          featureTree.utxos=[];
        }
        featureTree.utxos.push(f[c].utxos);
      }
      if (f[c]?.transactions) { 
        if (!featureTree.transactions) { 
          featureTree.transactions=[];
        }
        featureTree.transactions.push(f[c].transactions);
      }
    }
    return featureTree;
  }
  
  // This is a yucky way to acheive the initial page load from save:
  useEffect(() => { 
    if (defaultUses && !features) { 
      setFeatures(defaultUses);
      onChange(getFeatureTree(defaultUses));
    }
  },[])
  
  const featureTree = getFeatureTree(features);

  const closeAddFeature = () => { 
    setAddFeatureOpen(false);
  }
  const addFeatureClick = () => { 
    setAddFeatureOpen(true);
  }
  const deleteItem = (options) => { 
    return function () { 
      const newFeatures = features.filter((feature) => { 
        if (options.transactions && options.transactions == feature.transactions) {
          return false;
        }
        if (options.tokens && options.tokens == feature.tokens) { 
          return false;
        }
        if (options.utxos && options.utxos == feature.utxos) { 
          return false;
        }
        if (options.libraries && options.libraries.name == feature.libraries?.name && options.libraries.version == feature.libraries?.version) {
          return false;
        }
        if (options.renderer && options.renderer == feature.renderer) { 
          return false;
        }
        if (options.mintTx && options.mintTx == feature.mintTx) { 
          return false;
        }
        if (options.files && options.files == feature.files) { 
          return false;
        }
        return true;
      })
      setFeatures(newFeatures);
      onChange(getFeatureTree(newFeatures));
    }
  }
  const importChange = (change) => { 
    let newFeatures=[];
    if (features) { 
      newFeatures = features.filter((feature) => { 
        if (change.transactions && change.transactions == feature.transactions) {
          return false;
        }
        if (change.tokens && change.tokens == feature.tokens) { 
          return false;
        }
        if (change.utxos && change.utxos == feature.utxos) { 
          return false;
        }
        if (change.libraries && change.libraries.name == feature.libraries?.name && change.libraries.version == feature.libraries?.version) {
          return false;
        }
        if (change.renderer && feature.renderer) { 
          return false;
        }
        if (change.mintTx && feature.mintTx) { 
          return false;
        }
        if (change.files && feature.files) { 
          return false;
        }
        return true;
      })
    }
    setFeatures([...newFeatures, change])
    onChange(getFeatureTree([...newFeatures, change]));
  }
  let librariesHTML = '';
  let tokensHTML = '';
  let transactionsHTML = '';
  let rendererHTML = '';
  let utxosHTML = '';
  let mintTxHTML = '';
  let filesHTML = '';
  let nodeId=0;
  if (featureTree?.libraries) { 
    const librariesItems = featureTree.libraries.map((library) => <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label={library.name+' - '+library.version} onIconClick={deleteItem({libraries:{name: library.name, version: library.version}})} icon={<Delete />}/>);
    librariesHTML = (<TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="Libraries">
                      {librariesItems}
                    </TreeItem>);
  }
  if (featureTree?.tokens) { 
    const tokensItems = featureTree.tokens.map((token) => <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} onIconClick={deleteItem({tokens: token})} label={token}  icon={<Delete />}/>);
    tokensHTML = (<TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="Tokens">
                    {tokensItems}
                  </TreeItem>);
  }
  if (featureTree?.utxos) { 
    const utxosItems = featureTree.utxos.map((utxo) => <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} onIconClick={deleteItem({utxos: utxo})} label={utxo}  icon={<Delete />}/>);
    utxosHTML = (<TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="UTXOs">
                    {utxosItems}
                  </TreeItem>);
  }
  if (featureTree?.transactions) { 
    const transactionsItems = featureTree.transactions.map((transaction) => <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} onIconClick={deleteItem({transactions:transaction})} label={transaction} icon={<Delete />} />);
    transactionsHTML = (<TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="Transactions">
                          {transactionsItems}
                        </TreeItem>);
  }
  if (featureTree?.renderer) { 
    rendererHTML = (<TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="Renderer">
                      <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label={featureTree.renderer} icon={<Delete />} onIconClick={deleteItem({renderer: featureTree.renderer})} />
                    </TreeItem>);
  }
  if (featureTree?.mintTx) { 
    mintTxHTML = (<TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="Mint Tx">
                      <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="API Enabled" icon={<Delete />} onIconClick={deleteItem({mintTx: featureTree.mintTx})} />
    </TreeItem>);
  }
  
  if (featureTree?.files) { 
    filesHTML = (<TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="Files">
                      <TreeItem key={String(nodeId)} nodeId={String(nodeId++)} label="API Enabled" icon={<Delete />} onIconClick={deleteItem({files: featureTree.files})} />
    </TreeItem>);
  }
  const expanded = [];
  for (var c=0; c<=nodeId; c++) { 
    expanded.push(String(c));
  }
  return (
    <div className={classes.root}>
      <Button startIcon=<Add /> onClick={addFeatureClick} color="primary" variant="outlined">Add Feature</Button>
      <AddFeatureDialog onImportChange={importChange} open={addFeatureOpen} onClose={closeAddFeature} />
      
      <TreeView
      disableSelection={true}
      multiSelect={false}
      expanded={expanded}
  aria-label="file system navigator"
  defaultExpandIcon={<ChevronRight />}
  defaultCollapseIcon={<ExpandMore />}
>
{mintTxHTML}
{tokensHTML}
{utxosHTML}
{transactionsHTML}
{librariesHTML}
{filesHTML}
{rendererHTML}
  </TreeView>
    </div>
  );
}
FeatureSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultUses: PropTypes.array
  
};
export default FeatureSelector;