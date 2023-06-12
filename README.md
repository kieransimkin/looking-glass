## Smart NFT Playground

This is the source code for the [Smart NFT Playground](https://nft-playground.dev/) (a standard Next.js app) - for more information on Smart NFTs, CIP54 and this repository, please see the website, or [read the Cardano Improvement Proposal](https://cips.cardano.org/cips/cip54/).

This app uses both the [SmartNFTPortal React component](https://github.com/kieransimkin/smartnftportal) as well as [libcip54](https://github.com/kieransimkin/libcip54) to do the blockchain queries. 

You will need a [DBSync](https://github.com/input-output-hk/cardano-db-sync) chain indexer for the libcip54 queries. The Playground also uses [nftcdn.io](https://nftcdn.io) for thumbnail image generation, so you will need a key for that as well if you want to run the playground locally. Generally it's easier to just use the playground online at the URL above. 

Probably the most interesting part of the Playground, if you're looking to implement a CIP54 renderer in your own website, is the [`<Playground>`](https://github.com/kieransimkin/cip54-playground/blob/main/components/Playground.js) component, which is what builds the multi-pane environment with the `<SmartNFTPortal>` renderer within it. 

This repository also includes the best example on how to actually use libcip54 to provide the endpoints required for the `<SmartNFTPortal>`.

### Running

```bash
$ yarn run dev
or
$ npm run dev
```

An example config file can be found in [`.env.example`](https://github.com/kieransimkin/cip54-playground/blob/main/.env.example)