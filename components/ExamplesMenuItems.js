
import { MenuItem } from "@material-ui/core";

import NestedMenuItem from "./NestedMenuItem";
import Link from "next/link";
import exampleList from '../data/exampleList.json';
const ExamplesMenuItems = (props) => { 
    const {parentMenuOpen} = props;
    let items = [];
    for (const item of exampleList) { 
        let examples=[];
        for (const example of item.examples) { 
            examples.push(<a key={example.slug} href={'/play/'+item.slug+'/'+example.slug}><MenuItem>{example.title}</MenuItem></a>);
        }
        items.push(<NestedMenuItem direction="left" key={'l'+item.slug} label={item.title} parentMenuOpen={parentMenuOpen}>
            {examples}
        </NestedMenuItem>);
        
    }
    return (
        <>
        {items}
        </>
    );
}
export default ExamplesMenuItems;