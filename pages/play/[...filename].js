import {useState} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import { useEffect } from 'react';
import Playground from '../../components/Playground';

export default  function CIP54Playground(params) {
    const [uses, setUses] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [programCode, setProgramCode] = useState('');
    const router = useRouter();
    let {filename} = router.query;  
    
    if (!filename) filename=[''];
    if (filename.includes('..')) return;// some basic sanitizing to avoid people being sneaky with ".."
    
    useEffect(() => { 
        if (filename.join('/').length>0) {
            import('../../public/demos/'+filename.join('/')+'/metadata.json').then((m) => {
                setMetadata(m.default)
            }).catch((e) => {
                console.log(e);
            })
            import('../../public/demos/'+filename.join('/')+'/uses.json').then((m) => {
                setUses(m.default)
            }).catch((e) => {
                console.log(e);
            })
            fetch('../../demos/'+filename.join('/')+'/programCode.html').then((m) => {
                if (!m.ok) { 
                    console.log('Not found');
                } else { 
                    m.blob().then((b) => { 
                        b.arrayBuffer().then((ab) => { 
                            var ia = new Uint8Array(ab);
                            var tresult = new TextDecoder().decode(ia);
                            setProgramCode(tresult);
                            
                        });
                        
                        
                    })
                }
                
            }).catch((e) => {
                console.log(e);
            })
        }
    })
    
    /*
    
    */
    return <Playground programCode={programCode} uses={uses} metadata={metadata} />
}