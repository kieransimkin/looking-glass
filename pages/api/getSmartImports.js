import { init, getSmartImports } from "libcip54"
import pgClient from "../../utils/dbsync";
export default async function Browse(req, res) {
    init(process.env.NETWORK?.toLowerCase(), pgClient);
    const {metadata, walletAddr} = req.body;
    const featureTree = metadata?.uses;
    const mockTokenUnit = 'Un-minted'

    const ret = await getSmartImports(featureTree, walletAddr, mockTokenUnit);

    res.status(200).json(ret);
}

export const config = {
    api: {
      responseLimit: false,
    },
  }