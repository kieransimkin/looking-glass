import {useState} from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import path from 'path';
import fs from 'fs';
import { useEffect } from 'react';

export default  function Spritesheets(req,res) {
    return true;
}
/*
    const filename = req.url.substring(18);    
    const filePath = path.join(process.cwd(), 'submodules/LPC-spritesheet-collection/input/'+filename);
    
    var stat = fs.statSync(filePath);

    var contents = fs.createReadStream(filePath);
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': stat.size
    });
    contents.pipe(res);
}*/