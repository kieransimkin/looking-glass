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
    
    if (metadata && metadata.files && metadata.files[0]) { 
        let blob = dataURItoString(metadata.files[0].src);
        blob = '<html data-id="'+random+'" ><head>'+librariesHTML+'</head><body style="padding: 0; margin: 0;"}>'+blob+'</body></html>';
    
        //console.log(blob);
        src='data:text/html,'+encodeURIComponent(blob)
            //console.log(src);
    }
    return (
        <iframe style={style} scrolling="no" sandbox="allow-scripts" src={src} />
    );
}


SmartNFTPortal.propTypes = {
    style: PropTypes.object,
    random: PropTypes.number,
    loading: PropTypes.bool.isRequired,
    smartImports: PropTypes.object.isRequired,
    metadata: PropTypes.object.isRequired
  };
export default SmartNFTPortal;