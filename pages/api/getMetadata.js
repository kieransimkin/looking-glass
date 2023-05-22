
import { getMetadata } from "../../utils/queries";
export default async function Browse(req, res) {
  const {unit}=req.body;
  
  const metadata = await getMetadata(unit);
  res.status(200).json(metadata);
}
