/* eslint-disable react/display-name */
import { countPolicies, getPolicies } from "../../utils/database.mjs";
import { getClient } from "../../utils/redis.mjs";
import { checkCacheItem } from "../../utils/redis.mjs";
import { getDataURL } from "../../utils/DataStore";
import { useRouter } from "next/router";
import { useState,useCallback, useEffect } from "react";
import Link from "next/link";
import BigInfoBox from "../../components/BigInfoBox";
import OwnerList from "../../components/OwnerList";
import { MediaSlide } from "react-mediaslide";
import {tokenPortal} from '../../utils/tokenPortal';
import { getData, postData } from '../../utils/Api';
import LoadingTicker from '../../components/LoadingTicker';
import Head from 'next/head'
export const getServerSideProps = async (context) => { 
    const redisClient = await getClient();
    let sortOrder = context.query.sortOrder;
    let sort = context.query['sort'];
    let page = context.query.page;
    if (!sort || sort==='') { 
        sort='totalHits';
    }
    if (!sortOrder || sortOrder==='') { 
        sortOrder='desc';
    }
    if (!page || page==='') { 
        page=0;
    }
    const totalPolicies = await countPolicies();

    const policies = await getPolicies(sort,sortOrder,page,false);
    let props = {};
    const perPage = 10;
    const totalPages = Math.ceil(totalPolicies/perPage);
    let start=page*perPage,end=(page*perPage)+perPage;
    for (const policy of policies) { 
        let policyProfile = policy.profileUnit;
        policy.title = policy.name;
        if (!policyProfile) { 
            redisClient.publish('requestPolicyProfile',policy.policyID);
            continue;
          }
        
        let tokenData = await checkCacheItem('getTokenData:'+policyProfile);
        
        if (!tokenData) tokenData={unit:policyProfile};
        const thumbName = 'tokenThumb:'+tokenData.unit+':500:dark';
        let thumbURL;
        if ((thumbURL = getDataURL(thumbName,'jpg'))) {
            tokenData.thumb = thumbURL;
            policy.thumb = thumbURL;
        }   else { 
            tokenData.thumb = '/api/getTokenThumb?unit='+policyProfile;
            policy.thumb = '/api/getTokenThumb?unit='+policyProfile;
        }
        const tinyName = 'tokenThumb:'+tokenData.unit+':64:dark';
        let tinyURL;
        if ((tinyURL = getDataURL(tinyName,'jpg'))) {
          tokenData.tiny = tinyURL;
          policy.tiny = tinyURL;
        }else { 
            tokenData.tiny = '/api/getTokenThumb?unit='+policyProfile+'&size=64';
            policy.tiny = '/api/getTokenThumb?unit='+policyProfile+'&size=64';
        }
        policy.policyProfile=tokenData;
      }
    props['sort'] = sort;
    props['sortOrder'] = sortOrder;
    props.imgUrlPrefix='';
    if (process.env.NODE_ENV!='production') { 
        props.imgUrlPrefix='https://clg.wtf';
    }
    props.gallery={policies:policies, page:page, start:start, end:end, perPage: perPage, totalPages:totalPages};
    
    return {
        props
    }
}
export default function Index (props) { 
    
    const router = useRouter();
    //let {policy} = router.query;  
    
    const [gallery, setGallery] = useState(props?.gallery);
    
    const [mediaSlideLoading, setMediaSlideLoading]=useState(false);
    const [bigInfoOpen, setBigInfoOpen] = useState(false);
    const [currentSelection, setCurrentSelection] = useState(null);
    const imgUrlPrefix = props.imgUrlPrefix;
    const openBigInfo = (item) => { 
        console.log('Biginfo open');
        setBigInfoOpen(true);
    }
    const closeBigInfo = (item) => { 
        console.log('Biginfo closed');
        setBigInfoOpen(false);
    }   
    
    

    const renderBigInfo = useCallback( (i, onClose, goFullscreen, navbarHeight, newBigInfoOpen) => { 
        setBigInfoOpen(newBigInfoOpen);
        console.log('Called render biginfo');
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} navbarHeight={navbarHeight} bigInfoOpen={newBigInfoOpen} />
    },[bigInfoOpen, currentSelection]);

    useEffect(()=> { 
        const msgHandler = (e) => { 
            if (e.data.request=='mediaslide-open-leftbar') { 
                console.log('Got open leftbar message');
                setBigInfoOpen(true);
            } else if (e.data.request=='mediaslide-close-leftbar') { 
                console.log('Got close leftbar message');
                setBigInfoOpen(false);
            }
        } 
        if (window) {
            window.addEventListener('message',msgHandler, true);
        }
        return ()=> { 
            window.removeEventListener('message',msgHandler, true);
        }
    },[])
    
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/getPolicies?sort='+props['sort']+'&sortOrder='+props.sortOrder+'&page='+(parseInt(page)+offset)).then((d)=>{
            d.json().then((j) => { 
                
                //return; // TODO
                let newArray;
                if (offset>0) { 
                    newArray = [...gallery.policies];
                    newArray.push(...j.policies);
                } else { 
                    newArray = [...j.policies];
                    newArray.push(...gallery.policies);
                }
                setGallery({policies:newArray,page:j.page, totalPages: j.totalPages});
                setMediaSlideLoading(false);   
            });
            
        });
        console.log('Called outer load more data function');
        
    }
    const imgError = (e) => { 
        const origSrc = e.target.src;
        e.target.src='/img-loading.gif'
        const messageHandler = (mes) => { 
            if (mes.data.request=='newThumb' && mes.data.originalUrl==origSrc.replace(mes.origin,'')) { 
                e.target.src=mes.data.url;
                window.removeEventListener('message',messageHandler);
            }
        };
        window.addEventListener('message',messageHandler)
        
    }
    const slideItemHTML = (click,ts, thumbSpacing) => { 
 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={imgUrlPrefix+item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    const listItemHTML = (click,ts, thumbSpacing) => { 
        return (item,s,thumbSpacing) => { 
            return <li  style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={imgUrlPrefix+item.thumb} width={32} /><br />{item.title}</a></Link></li>
        }
    }
    

    const detailsItemHTML=(click,ts, thumbSpacing) => { 
        return (item) => { 
            return <tr style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}>
                <td width="30%"><Link passHref href={item.linkUrl}><a><img onError={imgError} src={imgUrlPrefix+item.thumb} width={64} />{item.title}</a></Link></td>
                <td width="auto"><OwnerList unit={item.unit} /></td>
                </tr>
        }
    }


    const thumbnailsItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            return <li style={{paddingLeft:thumbSpacing,paddingRight:thumbSpacing,paddingBottom:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img onError={imgError} src={imgUrlPrefix+item.thumb} width={ts} /><br />{item.title}</a></Link></li>
        }
    }
  
    
    /*
    
    */
   
    let title = 'Policy Listings - Cardano Looking Glass - clg.wtf'
    let description = '';
    let url = "https://clg.wtf/policy/";

    let initialSelection = null;
    

    
    let newGallery = null;
    if (gallery) {
        newGallery=gallery.policies.map((i)=>{
            i.linkUrl='';//getTokenLinkUrl(props.policy.slug,i.unit.substr(56));
            return i;
        })
    }

    const selectionChange = (item) => { 
        //window.postMessage({request:'showLoading'},'*');
        setCurrentSelection(item);
        /*
        router.push({
            pathname: getTokenLinkUrl(props.policy.slug, item.unit.substr(56)),
            query: {  },
            hash:' '
        }, undefined, {shallow:true})
        //*/
    }
    return (
        <>
            <Head>
                <title>Policy Index - Cardano Looking Glass</title>
                <meta name="description" content={description} />
                
          
                <link rel="icon" href="/favicon.ico" />
            </Head>
    <MediaSlide onOpenBigInfo={openBigInfo} onCloseBigInfo={closeBigInfo} initialSelection={initialSelection} slideItemHTML={slideItemHTML} listItemHTML={listItemHTML} thumbnailsItemHTML={thumbnailsItemHTML} detailsItemHTML={detailsItemHTML} selectionChange={selectionChange} renderBigInfo={renderBigInfo} renderFile={tokenPortal} onLoadMoreData={loadMoreData} loading={mediaSlideLoading} gallery={newGallery} loadingIndicator=<LoadingTicker /> pagination={{page: gallery?.page, totalPages: gallery?.totalPages }} />

    </>);
}