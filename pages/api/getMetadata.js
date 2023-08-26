
import { getMetadata, init } from "libcip54"
import pgClient from "../../utils/dbsync"

export default async function Browse(req, res) {
  init(process.env.NETWORK?.toLowerCase(), pgClient);
  const {unit}=req.body;
  
  const metadata = await getMetadata(unit);
  res.status(200).json(metadata);
}
