/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'
import { getData, postData } from '../utils/Api';
import BigInfoBox from '../components/BigInfoBox';
import { getDataURL } from '../utils/DataStore';
import { checkCacheItem, incrementCacheItem, getClient } from '../utils/redis';
import { getFeaturedPolicies } from '../utils/database';
import { useState, useEffect } from 'react';
import {MediaSlide} from 'react-mediaslide';
import {tokenPortal} from '../utils/tokenPortal'
import LoadingTicker from '../components/LoadingTicker';
import PolicyQuickBrowse from '../components/PolicyQuickBrowse';
import { BufferAttribute, BufferGeometry, MathUtils, Matrix3, Mesh, Uniform, Vector3 } from "three"
import * as THREE from 'three'
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import {Start as StartSkybox, skybox as Skybox} from '../3d/skybox'
import {Start as StartOcean, surface as OceanSurface, volume as OceanVolume} from '../3d/ocean'
import * as Common3d from "../3d/common"
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass, LUTCubeLoader, GlitchPass, AfterimagePass } from 'three-stdlib'
export const getServerSideProps = async (context) => { 
    const props = {};
    props.mintingPolicies = await getFeaturedPolicies('recentMint','desc',0,false);  
    props.recentlyActivePolicies = await getFeaturedPolicies('recentlyActive','desc',0,false);  
    props.activePolicies = await getFeaturedPolicies('totalActivity','desc',0,false);  
    props.popularPolicies = await getFeaturedPolicies('totalHits', 'desc',0, false);
    for (const policy of [...props.mintingPolicies, ...props.recentlyActivePolicies, ...props.activePolicies, ...props.popularPolicies]) { 
      const policyProfile = await checkCacheItem('policyProfile:'+policy.policyID);
      let tokenData = await checkCacheItem('getTokenData:'+policyProfile);
      if (!tokenData) tokenData={};
      const thumbName = 'tokenThumb:'+policyProfile+':500:dark';
      let thumbURL;
      if ((thumbURL = getDataURL(thumbName,'jpg'))) {
          tokenData.thumb = thumbURL;
      }   
      policy.policyProfile=tokenData;
    }
    
  
    return {
      props
    }
  }
export default  function CIP54Playground(props) {
    
    const router = useRouter();
    const [mintingGallery, setMintingGallery] = useState(props.mintingPolicies);
    const [recentlyActiveGallery, setRecentlyActiveGallery] = useState(props.recentlyActivePolicies);
    const [activeGallery, setActiveGallery] = useState(props.activePolicies);
    const [popularGallery, setPopularGallery] = useState(props.popularPolicies);
    const [skybox, setSkybox] = useState(null);
    const [oSurface, setOSurface] = useState(null);
    const [oVolume, setOVolume] = useState(null);

    useEffect(() => {
Common3d.Start();
        StartSkybox();
        StartOcean();
        setSkybox(Skybox);
        setOSurface(OceanSurface);
        setOVolume(OceanVolume);
    },[])
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen} item={i} />
    }
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            d.json().then((j) => { 
                let newArray;
                if (offset>0) { 
                    newArray = [...gallery.tokens];
                    newArray.push(...j.tokens);
                } else { 
                    newArray = [...j.tokens];
                    newArray.push(...gallery.tokens);
                }
                setGallery({tokens:newArray,page:j.page, totalPages: j.totalPages});
                setMediaSlideLoading(false);   
            });
            
        });
        console.log('Called outer load more data function');
        
    }
    const slideItemHTML = (click,ts, thumbSpacing) => { 
        return (item) => { 
            // The 60 below is the number of pixels we reserve in the slide bar for the label
            return <li style={{paddingLeft:thumbSpacing,paddingBottom:thumbSpacing,paddingRight:thumbSpacing}} key={item.id} data-id={item.id} onClick={click(item)}><Link passHref href={item.linkUrl}><a><img src={item.thumb} height={ts-80} /><br />{item.title}</a></Link></li>
        }
    }
    /*
    
    */
   
    let title = "Statistics - Cardano Looking Glass - clg.wtf"
    let description = '';
    let url = "https://clg.wtf/stats";
    let image = "https://clg.wtf/favicon-default.png";
    let initialSelection = null;
    
    const selectionChange = (item) => { 
        
        router.push({
            pathname: '/policy/'+props.policy.slug+'.'+item.unit.substr(56),
            query: {  }
        }, undefined, {shallow:true})
    }
    console.log(props);
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:site_name" content="Cardano Looking Glass" />
                <meta property="og:url" content={url} />
                <meta property="og:image" content={image} />
                <meta property="twitter:url" content={url} />
                <meta property="twitter:domain" content="clg.wtf" />
                <meta name="twitter:image" content={image} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
      <Canvas style={{backgroundColor: 'transparent',position:'absolute', top:0}} linear flat dpr={1} camera={{ far: 4000,fov: 70, position: [0, 0, 30] }}>
    <ambientLight intensity={4} color="#ffaa00" />
    
    <spotLight intensity={200} position={[0, 0,100]} penumbra={1} color="red" />
    
    
    <primitive object={skybox} scale={1} position={[0,0,0]} rotation={[1*Math.PI,2*Math.PI,1*Math.PI]}>
        </primitive>
    
        <primitive object={oSurface} scale={1} position={[0,0,0]} rotation={[1*Math.PI,2*Math.PI,1*Math.PI]}>
        </primitive>
 
      
        <primitive object={oVolume} scale={1} position={[0,0,0]} rotation={[1*Math.PI,2*Math.PI,1*Math.PI]}>
        </primitive>
  </Canvas>

            <div style={{position:'absolute', overflow:'hidden'}}>
            <div>
            <h4>Currently Minting:</h4>
            <PolicyQuickBrowse style={{height:'15vh'}} policies={mintingGallery} />
            </div>
            <div >
            <h4>Recently Active:</h4>
            <PolicyQuickBrowse style={{height:'15vh'}} policies={recentlyActiveGallery} />
            </div>
            
            <div>
            <h4>Total Activity:</h4>
            <PolicyQuickBrowse style={{height:'15vh'}} policies={activeGallery} />
            </div>
            
            <div>
            <h4>Popular on Looking Glass:</h4>
            <PolicyQuickBrowse style={{height:'15vh'}} policies={popularGallery} />
            </div>
            </div> 
        </>
    );
}