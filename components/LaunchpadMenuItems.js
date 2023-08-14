
import { MenuItem } from "@material-ui/core";
import NestedMenuItem from "./NestedMenuItem";
import launchpadList from '../data/launchpadList.json';
import MintSmartAvatarDialog from "./dialogs/MintSmartAvatarDialog";
import Link from "next/link";
import { useState , useEffect, useRef, useContext } from "react";
const LaunchpadMenuItems = (props) => { 
    const {parentMenuOpen} = props;
    const [mintOpen, setMintOpen] = useState(false);
    const mintClose=()=>{
        setMintOpen(false);
    }
    const openMintDialog=(e)=>{
        setMintOpen(true);
        e.preventDefault();
    }
    let items = [];
    for (const item of launchpadList) { 
        let pages=[];
        for (const page of item.pages) { 
            if (page.slug=='mint') { 
                pages.push(<a href="#" onClick={openMintDialog}><MenuItem>{page.title}</MenuItem></a>)
            } else { 
                pages.push(<a key={page.slug} href={'/launchpad/'+item.slug+'/'+page.slug}><MenuItem>{page.title}</MenuItem></a>);
            }
        }
        items.push(<Link href={"/launchpad/"+item.slug+"/about"}><NestedMenuItem direction="left" key={'l'+item.slug} label={item.title} parentMenuOpen={parentMenuOpen}>
            {pages}
        </NestedMenuItem></Link>);
        
    }
    return (
        <>
        <MintSmartAvatarDialog onClose={mintClose} open={mintOpen} />
        {items}
        </>
    );
}
export default LaunchpadMenuItems;