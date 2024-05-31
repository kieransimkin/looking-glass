import { TextField, IconButton } from "@material-ui/core"
import { useRouter, useSearchParams, usePathname } from "next/router";
import { useState } from "react";
export default function SearchBox({width, onFocus, onBlur,autoComplete='on', autoFocus=true}) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState();
    const searchChange = (e) => { 
            setSearchTerm(e.target.value)
    }
    const onSubmit = (e) => { 
        e.preventDefault()
        console.log(searchTerm);
        window.location = '/'+searchTerm;
        //router.push({pathname: '/'+searchTerm})
    }
    return (
            <form onSubmit={onSubmit} autoComplete={autoComplete} noValidate style={{display: 'flex',width: width?width:600}}> 
            
            <TextField inputProps={{autoComplete:autoComplete, onChange:searchChange, onFocus: ()=>{if (onFocus) onFocus()}, onBlur:()=>{if (onBlur) onBlur()}, autoFocus }} type="search" id="search" label={width?'Search':"Search by Policy ID, Wallet Address or 💲handle"} name="search" variant="outlined" fullWidth />
            <IconButton type="submit" aria-label="search" >🔎</IconButton>
            </form>
    );
}