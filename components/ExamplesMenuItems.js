
import { MenuItem } from "@material-ui/core";
import NestedMenuItem from "material-ui-nested-menu-item";
import Link from "next/link";
import exampleList from '../data/exampleList.json';
const ExamplesMenuItems = (props) => { 
    const {parentMenuOpen} = props;
    let items = [];
    for (const item of exampleList) { 
        let examples=[];
        for (const example of item.examples) { 
            examples.push(<a key={example.slug} target="_blank" rel="nofollow" href={'/play/'+item.slug+'/'+example.slug}><MenuItem>{example.title}</MenuItem></a>);
        }
        items.push(<NestedMenuItem key={'l'+item.slug} label={item.title} parentMenuOpen={parentMenuOpen}>
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