

import { getTokensFromStake } from "../../utils/queries";
import { getStakeFromAny } from "../../utils/CSL";
export default async function Browse(req, res) {
  let {which, page} = req.body;
  let result={};
  which = getStakeFromAny(which);
  result.tokens = await getTokensFromStake(which,page);
  result.fetchedAt = new Date();
  res.status(200).json(result);
}
