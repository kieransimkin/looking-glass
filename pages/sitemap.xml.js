import { getPolicyKeyList, getWalletKeyList } from "../utils/database.mjs"

export const getServerSideProps = async ({res}) => { 
    const policyKeys = await getPolicyKeyList();
    const walletKeys = await getWalletKeyList();
    
        
    const urls = [];
    const pushURL = (url) => { 
        urls.push(`
        <url>
            <loc>${url}</loc>
        </url>
        `);   
    }
    pushURL(`https://clg.wtf/`);
    policyKeys.forEach(element => {
        pushURL(`https://clg.wtf/policy/${element}`)
    });
    walletKeys.forEach(element => { 
        pushURL(`https://clg.wtf/wallet/${element}`);
    })
    pushURL(`https://clg.wtf/stats`);
    pushURL(`https://clg.wtf/live`);
    let xml_content = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        urls.join("\n"),
        '</urlset>'
      ]
    res.setHeader('Content-type','text/xml');
    res.write(xml_content.join("\n"))
    res.end();
    return {props:{}}
}
export default function Sitemap({policyKeys}) {


}