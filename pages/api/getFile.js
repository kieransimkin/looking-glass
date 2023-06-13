import axios from "axios";
import { getMetadata, init } from "libcip54"
import pgClient from "../../utils/dbsync";

export default async function Browse(req, res) {
  init(process.env.NETWORK?.toLowerCase(), pgClient);
  let {metadata, unit, id} = req.body;
  let file = null;
  if (unit=='own') { 
    try { 
      file=metadata.files.filter((f)=>f.id==id)[0];
    } catch (e) {  }
    if (!isNaN(id) && !file) { 
      try { 
        file=metadata.files[id];
      } catch (e) { }
    }
  } else { 
    const tokenMetadata = await getMetadata(unit);
    try { 
      file=tokenMetadata?.files.filter((f)=>f.id==id)[0];
    } catch (e) { }
    if (!isNaN(id) && !file) { 
      try { 
      file=tokenMetadata?.files[id];
      } catch (e) { }
    }
  }
  if (!file) { 
    return res.status(404).json({error: 'File Not Found'});
  }
  let result={mediaType: file.mediaType};
  if (file.src.substring(0,7)=='ipfs://') {
    result.buffer = (await axios.get(process.env.IPFS_GATEWAY+file.src.substring(7))).data;
    
  } else if (file.src.substring(0,10)=='arweave://') { 
    result.buffer = (await axios.get(process.env.ARWEAVE_GATEWAY+file.src.substring(10))).data;
  
  } else if (file.src.substring(0,5)=='data:') { 
    let el = file.src.split(',',2);
    let lbuffer = null;
    if (el[0].includes('base64')) { 
      lbuffer=Buffer.from(el[1], 'base64').toString();
    } else { 
      lbuffer=decodeURIComponent(el[1]);
    }
    // Something not quite right with this bit
    result.buffer=lbuffer;
    
  } else if (file.src.substring(0,8)=='https://') { 
    result.buffer = (await axios.get(file.src.substring(8))).data;
  } else if (file.src.substring(0,7)=='http://') { 
    result.buffer = (await axios.get(file.src.substring(7))).data;
  }
  res.setHeader('Content-type',result.mediaType);
  res.status(200);
  res.send(Buffer.from(result.buffer));
  
}
