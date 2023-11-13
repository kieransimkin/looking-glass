import { TextField, IconButton } from "@material-ui/core"
import { useRouter } from "next/router";
import { useState } from "react";
export default function SearchBox({width}) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState();
    const searchChange = (e) => { 
            setSearchTerm(e.target.value)
    }
    const onSubmit = (e) => { 
        e.preventDefault()
        router.push({pathname: '/'+searchTerm})
    }
    return (
            <form onSubmit={onSubmit} autoComplete="on" noValidate style={{display: 'flex',width: width?width:600}}> 
            
            <TextField inputProps={{onChange:searchChange, autoFocus:true }} type="search" id="search" label={width?'Search':"Search by Policy ID, Wallet Address or 💲handle"} name="search" variant="outlined" fullWidth />
            <IconButton type="submit" aria-label="search" >🔎</IconButton>
            </form>
    );
}