import {useState} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import { promises as fs } from 'fs';
import { useEffect } from 'react';

export default  function CIP54Playground(params) {
    const [uses, setUses] = useState(null);
    const [metadata, setMetadata] = useState(null);
    const [programCode, setProgramCode] = useState('');
    const router = useRouter();
    let {filename} = router.query;  
    
    if (!filename) filename=[''];
    
    return (
    <>
        Hello
    </>
    );
}