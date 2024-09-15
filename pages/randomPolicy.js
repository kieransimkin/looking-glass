import { getRandomPolicy } from "../utils/database.mjs"

export const getServerSideProps = async (context) => { 
    const randomPolicy = await getRandomPolicy();
    return {
        redirect: {
            destination: '/policy/'+randomPolicy.slug,
            statusCode: 307
        }
    }
}
export default function Index ({item}) { 
    

    return <div style={{position:'absolute', left:'50%', transform:'translateX(-50%)'}}>
    <h1>Random Policy</h1>
    
    <p>Nothing To see here.</p>
    👜</div>
    
}