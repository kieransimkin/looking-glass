/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'
import { getData, postData } from '../utils/Api';
import BigInfoBox from '../components/BigInfoBox';
import { getDataURL } from '../utils/DataStore';
import { checkCacheItem, incrementCacheItem, getClient } from '../utils/redis';
import { getFeaturedPolicies } from '../utils/database';
import { useState, useEffect, Suspense, useRef } from 'react';

import PolicyQuickBrowse from '../components/PolicyQuickBrowse';

import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'

import Ocean from '../3d/ocean'
import { Stars } from '@react-three/drei';
import { Html } from '@react-three/drei'

import { damp, damp2, damp3, damp4, dampE, dampM, dampQ, dampS, dampC } from 'maath/easing'
import { OrbitControls, Sky } from '@react-three/drei'

/*
import {Start as StartSkybox, skybox as Skybox} from '../3d/skybox'
import {Start as StartOcean, surface as OceanSurface, volume as OceanVolume} from '../3d/ocean'
*/


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
      if ((thumbURL = getDataURL(thumbName,'jpg')) && (process.env.NODE_ENV=='production')) {
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
    
    const cubeRef = useRef();
    /*
    useFrame((state, delta) => {
        dampE(cubeRef.current.rotation, [0, Math.PI*3, 0], 0.1, delta)
    });
    */
    useEffect(() => {
   
        
        //scene.add(Skybox.skybox);
            /*
        Ocean.Start();
        setOSurface(Ocean.surface);
        //scene.add(Ocean.surface);
        /*
Common3d.Start();
Common3d.StartTime();
        StartSkybox();
        StartOcean();
        
        setSkybox(Skybox);
        setOSurface(OceanSurface);
        setOVolume(OceanVolume);
        */
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
      <Canvas style={{backgroundColor: 'transparent',position:'absolute', top:0}}  camera={{ position: [0, 5, 100], fov: 55, near: 1, far: 20000 }}>
    
    
    
    <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
        <Suspense fallback={null}>
        <Ocean />
        
      </Suspense>
      <Sky scale={200} azimuth={40} inclination={0.1}  rayleigh={3} turbidity={0.1} />
      <Stars saturation={false} count={400} speed={0.5} />
      <group ref={cubeRef} scale={[4,4,4]}>
      <Html occlude={true} transform position={[0, 0, 10]}>
      <h4>Currently Minting:</h4>
            <PolicyQuickBrowse style={{height:'10vh'}} policies={mintingGallery} />
          
        </Html>
        <Html occlude={true} transform position={[10, 0, 0]} rotation={[0, 90 * (Math.PI / 180), 0]}>
        
        <h4>Recently Active:</h4>
            <PolicyQuickBrowse style={{height:'10vh'}} policies={recentlyActiveGallery} />
          
        </Html>
        <Html occlude={true} transform position={[-10, 0, 0]} rotation={[0, 270 * (Math.PI / 180), 0]}>
        <h4>Total Activity:</h4>
            <PolicyQuickBrowse style={{height:'10vh'}} policies={activeGallery} />
          
        </Html>
        <Html occlude={true} transform position={[0, 0, -10]} rotation={[0, 180 * (Math.PI / 180), 0]}>
        <h4>Popular on Looking Glass:</h4>
            <PolicyQuickBrowse style={{height:'10vh'}} policies={popularGallery} />
          
        </Html>
        </group>
  </Canvas>
<div style={{position:'fixed'}}>
    <h3>Under Construction</h3>
</div>
          
        </>
    );
}