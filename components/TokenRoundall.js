import humanNumber from 'human-number'
export default function TokenRoundall({quantity}) { 
    
    let colour = 'blue';
    let text = 'FT';
    let margin = '1em';
    if (quantity==1) { 
        text = 'NFT'
        colour='green';
        margin = '0'
    }

    return <div style={{marginTop: '0.4em', marginBottom: margin,float: 'left',textAlign: 'center', borderRadius: '1.25em', width:'2.5em',height:'2.5em', background: colour, display: 'inline-block'}}>
    <div style={{marginBlockStart:0, marginBlockEnd: 0, top:'50%', transform: 'translateY(-50%)', position:'relative'}}>{text}
    <div style={{position: 'absolute', width:'100%', display:quantity!=1?'block':'none', fontSize:'0.7em', marginTop:'0.3em'}}>
        {humanNumber(quantity, n => Number.parseFloat(n).toFixed(1)*1)}
    </div>
    </div>
    </div>
}