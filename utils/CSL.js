const networkId = process.env.NETWORK?.toLowerCase() == "testnet" ? 0 : 1
import * as CSLb from "@emurgo/cardano-serialization-lib-browser"
import * as CSLs from "@emurgo/cardano-serialization-lib-nodejs"
let CSL = CSLs;
if (process.browser) { 
    CSL = CSLb;
}
export function getStake(baseAddress) {
    const address = CSL.BaseAddress.from_address(CSL.Address.from_bech32(baseAddress))
    if (!address) return

    return CSL.RewardAddress.new(
        networkId,
        address.stake_cred()
    ).to_address().to_bech32().toLowerCase()
}

export function getStakeFromAny(address) {
    // Todo - make this support address being a CSL address object
    const Address = validAddress(address)
    if (!Address) return
    if (CSL.BaseAddress.from_address(Address)) {
        return getStake(Address.to_bech32());
    } else if (CSL.RewardAddress.from_address(Address)) {
        return Address.to_bech32().toLowerCase();
    }
    return
}

export function getBaseAddress(payment, stake) {
    return CSL.BaseAddress.new(
        networkId,
        CSL.StakeCredential.from_keyhash(CSL.Ed25519KeyHash.from_hex(payment)),
        CSL.StakeCredential.from_keyhash(CSL.Ed25519KeyHash.from_hex(stake))
    ).to_address().to_bech32()
}

export function validAddress(address) {
    try {
        return CSL.Address.from_bech32(address)
    } catch (e) {
    }

    try {
        return CSL.Address.from_hex(address)
    } catch (e) {
    }

    return
}

export function validBech32Address(address) {
    try {
        return CSL.Address.from_bech32(address)
    } catch (e) {
    }
    return;
}

export function addressType(address) {
    const Address = validAddress(address)
    if (!Address) return

    if (CSL.BaseAddress.from_address(Address)) {
        return "Base"
    } else if (CSL.EnterpriseAddress.from_address(Address)) {
        return "Enterprise"
    } else if (CSL.RewardAddress.from_address(Address)) {
        return "Stake"
    }

    return
}
