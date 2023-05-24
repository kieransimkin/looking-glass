import Head from 'next/head'
import Playground from '../components/Playground';

export default function Play() {
  return (
    <div>
      <Head>
        <title>Smart NFT Playground</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <Playground loadStored />
    </div>
    
  )
}
