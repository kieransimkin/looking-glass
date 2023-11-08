import humanNumber from 'human-number'
export default function TokenRoundall({quantity}) { 
    
    let colour = 'rgb(100,00,255)';
    let text = 'FT';
    let margin = '1em';
    if (quantity==1) { 
        text = 'NFT'
        colour='rgba(0,190,10)';
        margin = '0'
    }

    return <div style={{boxShadow: '1px 2px 1px 10px rgba(0,0,0,0.9)', zIndex: 200000, opacity:0.7, position: 'absolute', left: 0, top: 0, marginTop: '0.4em', marginLeft: '0.5em', marginBottom: margin,float: 'left',textAlign: 'center', borderRadius: '1.25em', width:'2.5em',height:'2.5em', background: colour, display: 'inline-block'}}>
    <div style={{textShadow:'3px 3px 2px rgb(0,0,0), 0px 0px 3px rgb(0,0,0,1)', marginBlockStart:0, marginBlockEnd: 0, top:'50%', transform: 'translateY(-50%)', position:'relative'}}>{text}
    <div style={{position: 'absolute', width:'100%', display:quantity!=1?'block':'none', fontSize:'0.7em', marginTop:'0.3em'}}>
        {humanNumber(quantity, n => Number.parseFloat(n).toFixed(1)*1)}
    </div>
    </div>
    </div>
}