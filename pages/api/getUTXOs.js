
import { getUTXOsFromStake, getStakeFromAny, init } from "libcip54"
import pgClient from "../../utils/dbsync";

export default async function Browse(req, res) {
  init(process.env.NETWORK?.toLowerCase(), pgClient);
  let {which, page} = req.body;
  let result={};
  which = getStakeFromAny(which);
  result.utxos = await getUTXOsFromStake(which,page);
  result.fetchedAt = new Date();
  res.status(200).json(result);
}
