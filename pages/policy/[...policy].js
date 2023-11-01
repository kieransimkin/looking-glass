import {useState} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import { getData } from '../../utils/Api';
import {MediaSlide} from 'react-mediaslide'
export default  function CIP54Playground(params) {
    
    const router = useRouter();
    let {policy} = router.query;  
    const [gallery, setGallery] = useState(null);
    if (!policy) policy='';
    
    useEffect(() => { 
        getData('/policyTokens?policy='+policy).then((d)=>{
            d.json().then((j) => { 
                setGallery(j);
            });
            
        });
        
    },[policy])
    /*
    
    */
    return (
        <>
            <MediaSlide gallery={gallery?.tokens} />
        </>
    );
}