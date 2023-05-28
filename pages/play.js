import Head from 'next/head'
import Playground from '../components/Playground';

export default function Play() {
  let playgroundTag = <Playground loadStored />;
  if (typeof localStorage != 'undefined' && localStorage.getItem('cip54-metadata')) { 
    playgroundTag = <Playground 
                      loadStored
                      uses={JSON.parse(localStorage.getItem('cip54-features'))} 
                      metadata={JSON.parse(localStorage.getItem('cip54-metadata'))} 
                      programCode={localStorage.getItem('cip54-programCode')} 
                    />
  }
  return (
    <div>
      <Head>
        <title>Smart NFT Playground</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      {playgroundTag}
    </div>
    
  )
}
