
import { tokenImageFromUnit } from "../../utils/NFTCDN";

export default function Browse(req, res) {
  let result=null;
  if (req.query.size) { 
    result = tokenImageFromUnit(  req.query.unit, {size: req.query.size});
  }  else { 
    result = tokenImageFromUnit(  req.query.unit);
  }
  res.status(200).json({url:result});
}
