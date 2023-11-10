import { CircularProgress } from "@material-ui/core"
export default function LoadingTicker({}) { 
    return <>
    <div style={{width:'100%',textAlign:'center'}}>
                <h1>Loading...</h1><CircularProgress /> 
                </div>
        </>
                


}