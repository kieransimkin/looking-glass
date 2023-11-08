import { getData, postData } from './Api';
import {SmartNFTPortal} from 'smartnftportal'

export const tokenPortal = async (item, ready, width='100%', height='100%') => { 
    let smI = {tokenUnit:''};
    if (item?.metadata?.files[0]?.mediaType?.substring(0,9)!='text/html') return;
    if (item.metadata?.uses) { 
        const walletAddr = (await (await getData('/getTokenHolders?unit='+item.unit)).json())[0].stake;
        const imports = await postData('/getSmartImports',{metadata: item.metadata, unit: item.unit, walletAddr});
        const importJson = await imports.json();
        smI=importJson;
        
    }
    const doCallback = () => { 
        ready();
    }
    return <SmartNFTPortal key={Math.random()} onReady={doCallback} loading={false} metadata={item.metadata} smartImports={smI} style={{width:width,height:height, borderWidth:'0', minWidth:'10px',minHeight:'10px'}} />
}