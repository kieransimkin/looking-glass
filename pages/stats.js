/* eslint-disable react/display-name */
import { useRouter} from 'next/router';
import Link from 'next/link';
import Head from 'next/head'

import { getData, postData } from '../utils/Api';
import BigInfoBox from '../components/BigInfoBox';
import { getDataURL } from '../utils/DataStore';
import { checkCacheItem, incrementCacheItem, getClient } from '../utils/redis.mjs';
import { getPolicies } from '../utils/database.mjs';
import { useState, useEffect, Suspense, useRef, useImperativeHandle } from 'react';
import { easing } from 'maath'
import PolicyQuickBrowse from '../components/PolicyQuickBrowse';
import { Card } from '@material-ui/core';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { DoubleSide, FrontSide } from 'three';
import {forwardRef, useCallback} from 'react'
import Ocean from '../3d/ocean'
import { Stars } from '@react-three/drei';
import { Html } from '@react-three/drei'
import {alpha} from '@material-ui/core/styles/colorManipulator'
import { damp, damp2, damp3, damp4, dampE, dampM, dampQ, dampS, dampC } from 'maath/easing'
import { OrbitControls, Sky } from '@react-three/drei'
import { makeStyles } from '@material-ui/core/styles';
import useWindowDimensions from '../utils/WindowDimensions';
/*
import {Start as StartSkybox, skybox as Skybox} from '../3d/skybox'
import {Start as StartOcean, surface as OceanSurface, volume as OceanVolume} from '../3d/ocean'
*/


import { FilmPass, WaterPass, UnrealBloomPass, LUTPass, LUTCubeLoader, GlitchPass, AfterimagePass } from 'three-stdlib'
import { fontSize } from '@mui/system';
const useStyles = makeStyles(theme => { 
    const first = alpha(theme.palette.background.paper, 1);
    const second = alpha(theme.palette.background.paper, 0);
    return {
      root: {
        borderRadius: '2em !important',
        transition: 'flex-basis 0.8s ease',
        filter: 'drop-shadow(9px 5px 8px rgba(0,0,0,0.25))',
        backgroundColor: theme.palette.background.paper
      },
      cardContent: { 
        padding: '0 !important'
      },
      featureCard: { 
        minHeight:'30', padding:'1em', boxShadow:'2px 2px 15px 5px rgba(0,0,0,0.5)', border: '1px solid black'
      },
      'featureCard-container': { 
        display: 'flex', flexDirection:'row', alignItems:'center'
      },
      'featureCard-inner': { 
        width:'80vw', fontSize:'0.4em'
      },
      actionArea: { 
        height: '100%'
      }
    };
  });
export const getServerSideProps = async (context) => { 
    const props = {};
    props.mintingPolicies = await getPolicies('recentMint','desc',0,false);  
    props.recentlyActivePolicies = await getPolicies('recentlyActive','desc',0,false);  
    props.activePolicies = await getPolicies('totalActivity','desc',0,false);  
    props.popularPolicies = await getPolicies('totalHits', 'desc',0, false);
    for (const policy of [...props.mintingPolicies, ...props.recentlyActivePolicies, ...props.activePolicies, ...props.popularPolicies]) { 
      const policyProfile = await checkCacheItem('policyProfile:'+policy.policyID);
      if (!policyProfile) { 
        const redisClient = await getClient();
        redisClient.publish('requestPolicyProfile',policy.policyID);
      }
      let tokenData = await checkCacheItem('getTokenData:'+policyProfile);
      if (!tokenData) tokenData={};
      const thumbName = 'tokenThumb:'+policyProfile+':500:dark';
      let thumbURL;
      if ((thumbURL = getDataURL(thumbName,'jpg')) && (process.env.NODE_ENV=='production')) {
          tokenData.thumb = thumbURL;
      }   
      const tinyName = 'tokenThumb:'+policyProfile+':64:dark';
      let tinyURL;
      if ((tinyURL = getDataURL(tinyName,'jpg')) && (process.env.NODE_ENV=='production')) {
        tokenData.tiny = tinyURL;
      }
      policy.policyProfile=tokenData;
    }
    
  
    return {
      props
    }
  }

const StatsCube = ({canvasRef, mintingGallery, recentlyActiveGallery, activeGallery, popularGallery}) => { 
    const cubeRef = useRef();
    const [clicked, click] = useState(false)
    const styles = useStyles();
    useThree(({camera})=> { 
        
    });
    useFrame((state, delta) => {
        //easing.dampE(canvasRef.current.camera.rotation, clicked ? [0, Math.PI / 2, 0] : [0, 0, 0], 0.25, delta);

    });
    const doClick=()=>{ 
        click(!clicked);
        console.log('got click');
    }
    const { height, width } = useWindowDimensions();
    const spread = 25;
    return (
    <group ref={cubeRef} scale={[4,4,4]} position={[0,20,0]}>
        <Html castShadow transform position={[0, 0, spread]} // Make HTML cast a shadow
  receiveShadow // Make HTML receive shadows
  material={<meshPhysicalMaterial side={FrontSide} opacity={1} />}>
            <h4 onClick={doClick}>Currently Minting:</h4>
            <Card className={styles.featureCard}>
                <div className={styles['featureCard-container']}>
                    <div className={styles['featureCard-inner']}>
                        <PolicyQuickBrowse style={{height:'25vh'}} policies={mintingGallery} />
                    </div>
                </div>
            </Card>
        </Html>
        <Html castShadow transform position={[spread, 0, 0]} rotation={[0, 90 * (Math.PI / 180), 0]}>
            <h4>Recently Active:</h4>
            <Card className={styles.featureCard}>
                <div className={styles['featureCard-container']}>
                    <div className={styles['featureCard-inner']}>
                        <PolicyQuickBrowse style={{height:'25vh'}} policies={recentlyActiveGallery} />
                    </div>
                </div>
            </Card>
      </Html>
      <Html castShadow transform position={[-spread, 0, 0]} rotation={[0, 270 * (Math.PI / 180), 0]}>
        <h4>Total Activity:</h4>
        <Card className={styles.featureCard}>
            <div className={styles['featureCard-container']}>
                <div className={styles['featureCard-inner']}>
                    <PolicyQuickBrowse style={{height:'25vh'}} policies={activeGallery} />
                </div>
            </div>
        </Card>
      </Html>
      <Html castShadow transform position={[0, 0, -spread]} rotation={[0, 180 * (Math.PI / 180), 0]}>
      <h4>Popular on Looking Glass:</h4>
      <Card className={styles.featureCard}>
            <div className={styles['featureCard-container']}>
                <div className={styles['featureCard-inner']}>
                    <PolicyQuickBrowse style={{height:'25vh'}} policies={popularGallery} />
                </div>
            </div>
        </Card>
      </Html>
    </group>
    );


}
const ThreeForwardRef = forwardRef((props, ref) => {
    const { scene, camera } = useThree();
    useImperativeHandle(ref, () => ({
       scene,
       camera,
    }), [scene, camera]);
 });
 
 export const MyCanvas = forwardRef(({ children }, ref) => {
    return (
       <Canvas shadows shadowMap style={{backgroundColor: 'transparent',position:'absolute', top:0}}  camera={{ position: [0, 50, 100], fov: 55, near: 1, far: 20000 }}>
          <ThreeForwardRef ref={ref} />
          { children }
       </Canvas>
    );
 })
export default  function CIP54Playground(props) {
    
    const router = useRouter();
    const [mintingGallery, setMintingGallery] = useState(props.mintingPolicies);
    const [recentlyActiveGallery, setRecentlyActiveGallery] = useState(props.recentlyActivePolicies);
    const [activeGallery, setActiveGallery] = useState(props.activePolicies);
    const [popularGallery, setPopularGallery] = useState(props.popularPolicies);
    const [skybox, setSkybox] = useState(null);
    const [oSurface, setOSurface] = useState(null);
    const [oVolume, setOVolume] = useState(null);
    const canvasRef = useRef();

    const [bigInfoOpen, setBigInfoOpen] = useState(false);
 
    const openBigInfo = (item) => { 
        setBigInfoOpen(true);
    }
    const closeBigInfo = (item) => { 
        setBigInfoOpen(false);
    }   
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
    
    const renderBigInfo = useCallback( (i, onClose, goFullscreen, navbarHeight) => { 
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} navbarHeight={navbarHeight} bigInfoOpen={bigInfoOpen} />
    },[bigInfoOpen]);

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

    const doClick=()=>{ 
        click(!clicked);
        console.log('got click');
    }
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
      <MyCanvas ref={canvasRef}>
    <OrbitControls autoRotate={true} enableDamping={true} dampingFactor={0.05} screenSpacePanning={false} minDistance={100} maxDistance={500} maxPolarAngle={Math.PI/2} />
    
    
    <pointLight castShadow position={[100, 100, 100]}   shadow-mapSize-height={512}
  shadow-mapSize-width={512} />
      <pointLight castShadow position={[-100, -100, -100]}  shadow-mapSize-height={512}
  shadow-mapSize-width={512} />
        <Suspense fallback={null}>
        <Ocean />
        
      </Suspense>
      <Sky scale={200} azimuth={40} inclination={0.1}  rayleigh={3} turbidity={0.1} />
      <Stars saturation={false} count={400} speed={0.5} />
        <StatsCube canvasRef={canvasRef} mintingGallery={mintingGallery} recentlyActiveGallery={recentlyActiveGallery} activeGallery={activeGallery} popularGallery={popularGallery} />
  </MyCanvas>
<div onClick={doClick} style={{position:'fixed'}}>
    <h3>Under Construction</h3>
</div>
          
        </>
    );
}