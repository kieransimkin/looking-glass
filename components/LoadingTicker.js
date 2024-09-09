import { CircularProgress } from "@material-ui/core"
export default function LoadingTicker({}) { 
    return <>
    <div style={{width:'100%',textAlign:'center'}}>
                <h3>Loading...</h3><CircularProgress /> 
                </div>
        </>
                


}