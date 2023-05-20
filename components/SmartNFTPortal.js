import { makeStyles } from '@material-ui/core/styles';
import { StylesContext } from '@material-ui/styles';
import { CircularProgress, Dialog } from '@material-ui/core';
import PropTypes from 'prop-types';
import ReactDOMServer from "react-dom/server";
function dataURItoString(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = decodeURIComponent(dataURI.split(',')[1]);
  
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
  
    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
  
    // create a view into the buffer
    var ia = new Uint8Array(ab);
  
    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
  
    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    
    return new TextDecoder().decode(ia);
  
  }
const useStyles = makeStyles((theme) => {
    let bgImg='url(/paper-texture-light.jpg)';

    if (theme.palette.type=='dark') { 
        bgImg=`linear-gradient(rgba(20, 19, 18, 0.995),rgba(20, 19, 18, 0.995)) , url('/paper-texture.jpg')`;
    }
    return {
    root: {
      
    },
    paper: { 
        backgroundImage: bgImg,
        backgroundRepeat: 'repeat',
        backgroundSize: 'auto',
        backgroundColor:'inherit !important',
        outline: '1px solid black',
        boxShadow: (theme.palette.type=='dark') ? `1px 1px 10px 5px inset rgba(0,0,0,0.4), 0px 0px 35px 10px rgba(0,0,0,0.3)` : '',
        
    }
  };});
const SmartNFTPortal = (props) => { 
    const {children, smartImports, metadata, style, loading, random} = props;
    const classes=useStyles();

    let src='';
    let librariesHTML ='';
    //console.log(metadata);
    if (loading) { 
        return <CircularProgress style={{marginTop: '2em', marginLeft: 'auto', marginRight: 'auto'}} />;
    }
    
    if (smartImports && smartImports.libraries && smartImports.libraries.length>0) { 
        for (var c=0; c<smartImports.libraries.length; c++) {
            librariesHTML+='<script src="'+smartImports.libraries[c]+'"></script>'
        }
    }
    librariesHTML+=getPortalAPIScripts(smartImports);
    if (metadata && metadata.files && metadata.files[0]) { 
        let blob = dataURItoString(metadata.files[0].src);
        blob = '<html data-id="'+random+'" ><head>'+librariesHTML+'</head><body style="padding: 0; margin: 0px; min-width: 100%; min-height: 100%;"}>'+blob+'</body></html>';
    
        //console.log(blob);
        src='data:text/html,'+encodeURIComponent(blob)
            //console.log(src);
    }
    return (
        <iframe style={style}  sandbox="allow-scripts" src={src} />
    );
}
const getPortalAPIScripts = (smartImports) => { 

    let ret="<script>\n";
    ret+="if (!window.cardano) window.cardano={};\n";
    ret+="if (!window.cardano.nft) window.cardano.nft={};\n";
    ret+="if (!window.cardano.nft._data) window.cardano.nft._data={};\n";

    ret+="window.cardano.nft._data.ownerAddr="+JSON.stringify(smartImports?.ownerAddr)+";\n";
    ret+="window.cardano.nft._data.fetchedAt="+JSON.stringify(smartImports?.fetchedAt)+";\n";
    if (smartImports?.utxos) { 
        ret+='window.cardano.nft._data.utxos='+JSON.stringify(smartImports?.utxos)+";\n";
    }
    if (smartImports?.tokens) { 
        ret+='window.cardano.nft._data.tokens='+JSON.stringify(smartImports.tokens)+";\n";
    }
    if (smartImports?.transactions) { 
        ret+='window.cardano.nft._data.transactions='+JSON.stringify(smartImports.transactions)+";\n";
        
    }
    ret+='</script>';
    ret+=`
        <script>
            window.cardano.nft.getTransactions = async (which, paginate=null) => { 
                if (paginate) { 
                    console.error('Smart NFT API does not support result pagination yet');
                }
                if (which=='own') { 
                    which=window.cardano.nft._data.ownerAddr;
                }
                return {transactions: window.cardano.nft._data.transactions[which], fetchedAt: window.cardano.nft._data.fetchedAt};
            }
            window.cardano.nft.getTokens = async (which, paginate=null) => { 
                if (paginate) { 
                    console.error('Smart NFT API does not support result pagination yet');
                }
                if (which=='own') { 
                    which=window.cardano.nft._data.ownerAddr;
                }
                return {tokens: window.cardano.nft._data.tokens[which], fetchedAt: window.cardano.nft._data.fetchedAt};
            }
            window.cardano.nft.getUTXOs = async (which, paginate=null) => { 
                if (paginate) { 
                    console.error('Smart NFT API does not support result pagination yet');
                }
                if (which=='own') {
                    which=window.cardano.nft._data.ownerAddr;
                }
                return {utxos: window.cardano.nft._data.utxos[which], fetchedAt: window.cardano.nft._data.fetchedAt};
            }
        </script>
    `;
    return ret;
}


SmartNFTPortal.propTypes = {
    style: PropTypes.object,
    random: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    smartImports: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired
  };
export default SmartNFTPortal;