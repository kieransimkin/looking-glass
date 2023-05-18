
export default async function Browse(req, res) {
    const {featureTree, walletAddr} = req.body;
    const ret = {libraries:[], css: []};
    if (featureTree?.libraries?.length>0) { 
        for (var c=0; c<featureTree.libraries.length; c++ ) { 
            const result = await fetch('https://api.cdnjs.com/libraries/'+featureTree.libraries[c].name+'/'+featureTree.libraries[c].version+'?fields=name,version,files');
            const json = await result.json();
            const files = json.files;
            const name = featureTree.libraries[c].name;
            for (var d=0; d<files.length; d++) { 
                if (    !files[d].includes(".min.") ||  // skip file if it doesn't include .min
                        (name=='three.js' && files[d].includes('.module.')) || 
                        (name=='phaser' && files[d].includes('-ie9')) || 
                        (name=='phaser' && files[d].includes('.esm.')) || 
                        (name=='phaser' && files[d].includes('arcade-physics'))

                        ) { // for three.js don't load the module version
                    continue;
                }
                const url = 'https://cdnjs.cloudflare.com/ajax/libs/'+featureTree.libraries[c].name+'/'+featureTree.libraries[c].version+'/'+files[d];
                const fresult = await fetch(url)
                let blob = await fresult.blob();
                const ab = await blob.arrayBuffer();
                var ia = new Uint8Array(ab);
                var tresult = new TextDecoder().decode(ia);
                const mType = blob.type.split(';')[0];
                const librarySrc='data:'+mType+','+encodeURIComponent(tresult);
                if (mType.toLowerCase()=='application/javascript') { 
                    ret.libraries.push(librarySrc);
                } else if (mType.toLowerCase()=='text/css') { 
                    ret.css.push(librarySrc);
                }
                
            }
            
        }

    }
    console.log(ret);

    res.status(200).json(ret);
    
}