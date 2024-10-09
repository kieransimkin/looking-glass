import { lastBlock } from "../../utils/database.mjs";

export default async function Browse(req, res) {
    const lastBlockTime = await lastBlock();
    res.status(200).json({

        lastBlockTime

    });
}