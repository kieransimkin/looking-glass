
import { tokenImageFromUnit } from "../../utils/NFTCDN";
import axios from "axios";
export default async function Browse(req, res) {
  let result=null;
  if (req.query.size) { 
    result = tokenImageFromUnit(  req.query.unit, {size: req.query.size});
  }  else { 
    result = tokenImageFromUnit(  req.query.unit);
  }
  const axiosResult = await axios.get(result, {responseType: 'arraybuffer'});
  res.setHeader('Content-Type',axiosResult.headers["content-type"]);
  console.log(axiosResult.headers['content-type']);
  res.status(200);
  res.send(Buffer.from(axiosResult.data));
  
}
