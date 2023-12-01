export const ROOT = "/api"

export const postData = async (url = '', inData) => {
    return fetch(ROOT + url, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(inData)
    })
  
}
export const getData = async (url = '') => {
    return fetch(ROOT + url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
  }
  
export const fetcher = url => fetch(ROOT + url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
}).then(r => r.json())


export const buildWitnessed = async (witness, api, callback) => {
    postData("/wit", witness).then(res => {
        console.log("C", res);
      
        if (res.status == 200) {
            res.json().then(body => {
                console.log(body);
                api.submitTx(body).then(txid => {
                  callback(txid);
                    
                }).catch(e => { 
                  
                  if (typeof e == "object" && e.hasOwnProperty('message')) { 
                    alert(e.message);
                  } else {
                    alert('Submit failed');
                  }
                  console.error(e);
                });
            })
        } else {
            console.error("Bad request");
        }
    });
}
  
export const mkBase = async (wallet) => {
    
    const addr = wallet.returnAddrRaw;
    const utxos = await wallet.api.getUtxos()
    let getCollateral=wallet.api.getCollateral;
    if (!getCollateral) getCollateral=wallet.api.experimental.getCollateral;
    //const txCol = await getCollateral()
    return {
      signer : wallet.stakeKey,
      changeAddress : addr,
      utxos : utxos
    }
  }
  export const refreshWallet = (txid) => {
    // TODO - remember to schedule a refresh of the wallet tokens
  // Todo these shouldn't be needed
  setTimeout(() => { 
    getData("/sync-db/"+txid);
  }, 10000);
  setTimeout(() => { 
    getData("/sync-db/"+txid);
  }, 60000);
  setTimeout(() => { 
    getData("/sync-db/"+txid);
  }, 300000);
  // End ^^   
  }