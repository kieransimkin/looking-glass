/* eslint-disable react/display-name */
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head'
import { getData, postData } from '../utils/Api';
import BigInfoBox from '../components/BigInfoBox';
import { getDataURL } from '../utils/DataStore';
import { checkCacheItem, incrementCacheItem, getClient } from '../utils/redis.mjs';
import { getFeaturedPolicies } from '../utils/database.mjs';
import { useState, useEffect, Suspense, useRef, useImperativeHandle } from 'react';
import { easing } from 'maath'
import PolicyQuickBrowse from '../components/PolicyQuickBrowse';
import { Card } from '@material-ui/core';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { DoubleSide, FrontSide } from 'three';
import {forwardRef} from 'react'
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
/**
 * @description Retrieves data for featured policies, including minting, recently
 * active, active, and popular ones. It then enriches the policy data by fetching
 * additional information from a cache and updating the token data with thumbnail
 * URLs if available in production mode.
 *
 * @param {object} context - Passed by Next.js.
 *
 * @returns {object} Serialized and attached to the props attribute of the server-side
 * rendered page as an initial state for the client-side application.
 */
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

/**
 * @description 3D renders a cube with HTML elements inside each face, displaying
 * different galleries (minting, recently active, total activity, and popular) as
 * cards within the cube. It also responds to a click event by rotating the cube's camera.
 *
 * @param {object} obj - 5 in number, likely referring to references or data sources
 * for canvas, minting gallery, recently active gallery, active gallery, and popular
 * gallery respectively.
 *
 * @param {React.RefObject<HTMLCanvasElement>} obj.canvasRef - Used to reference an
 * HTML canvas element.
 *
 * @param {PolicyQuickBrowseProps[]} obj.mintingGallery - Used to display policies
 * for minting.
 *
 * @param {PolicyQuickBrowse[]} obj.recentlyActiveGallery - Used to display recently
 * active policies.
 *
 * @param {PolicyQuickBrowseProps[]} obj.activeGallery - Used to display policies
 * from an active gallery.
 *
 * @param {PolicyQuickBrowse[][]} obj.popularGallery - Used to render popular policies
 * on the cube's side.
 *
 * @returns {ReactNode} A JSX element that renders a group with multiple HTML elements
 * and Card components, containing PolicyQuickBrowse components and other text elements.
 */
const StatsCube = ({canvasRef, mintingGallery, recentlyActiveGallery, activeGallery, popularGallery}) => { 
    const cubeRef = useRef();
    const [clicked, click] = useState(false)
    const styles = useStyles();
    useThree(({camera})=> { 
        
    });
    useFrame((state, delta) => {
        //easing.dampE(canvasRef.current.camera.rotation, clicked ? [0, Math.PI / 2, 0] : [0, 0, 0], 0.25, delta);

    });
    /**
     * @description Toggles a boolean state (`clicked`) when invoked, and then logs 'got
     * click' to the console. The function's name suggests that it simulates a button
     * click, updating an internal state accordingly.
     */
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
/**
 * @description Renders a React component that integrates Three.js to display a 3D
 * scene, with various features such as OrbitControls, point lights, Ocean and Sky
 * effects, and StatsCube displaying policy information from Cardano Looking Glass API.
 *
 * @param {any} props - Used to pass data from the parent component.
 *
 * @returns {JSX.Element} A React component that represents the UI and contains various
 * elements such as HTML tags, functions, and other components.
 */
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
    /**
     * @description Renders a component, `BigInfoBox`, which displays information about
     * an item at index `i`. It accepts three parameters: `onClose`, a callback to close
     * the info box; `goFullscreen`, a function to toggle full-screen mode, and calls it
     * with `i` as an argument; and `item={i}`, passes the index as a prop.
     *
     * @param {number} i - Used as an item identifier.
     *
     * @param {Function} onClose - Responsible for closing the component.
     *
     * @param {(i: number) => boolean} goFullscreen - Intended to control full-screen mode.
     *
     * @returns {JSX.Element} A JSX element representing a BigInfoBox component with
     * properties onClose, goFullscreen, and item.
     */
    const renderBigInfo = (i, onClose, goFullscreen) => { 
        
        return <BigInfoBox onClose={onClose} goFullscreen={goFullscreen(i)} item={i} />
    }
    /**
     * @description Loads additional policy tokens from an API and updates the local state
     * by merging new tokens with existing ones, incrementing the page number, and updating
     * the total pages count. It also sets a loading flag to false once the data is loaded.
     *
     * @param {object} obj - Passed as an argument to the function. The property `page`
     * within this object represents the current page number that needs to be loaded with
     * more data.
     *
     * @param {number} obj.page - Used to track the current page being loaded.
     *
     * @param {number} offset - Used to increment or decrement the page number.
     */
    const loadMoreData = ({page},offset=1) => { 
        if (mediaSlideLoading) return;
        
        getData('/policyTokens?policy='+policy+'&page='+(parseInt(page)+offset)).then((d)=>{
            // Handles pagination and updates state.
            d.json().then((j) => { 
                // Combines gallery tokens with new JSON tokens.
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
    /**
     * @description Generates HTML for a list item representing a slide. It takes three
     * arguments: a click handler, thumbnail spacing, and thumbnail size (ts). It returns
     * a function that creates an HTML element with a thumbnail image, title, and link,
     * given an item object as input.
     *
     * @param {(item: any) => void} click - Used to handle item clicks.
     *
     * @param {number} ts - Used to specify the height of an image.
     *
     * @param {number} thumbSpacing - Used to set the padding for the image thumbnail.
     *
     * @returns {(item: object) => JSX.Element} A function that generates a list item
     * (`li`) element for each item in the input array.
     */
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
    
    /**
     * @description Changes the current route to a new path based on the selected item.
     * The path is constructed by concatenating '/policy/', 'slug' from the props object,
     * and 'unit' from the item, with a dot in between. It also sets the query parameter
     * as empty.
     *
     * @param {object} item - Used to construct a new URL path.
     */
    const selectionChange = (item) => { 
        
        router.push({
            pathname: '/policy/'+props.policy.slug+'.'+item.unit.substr(56),
            query: {  }
        }, undefined, {shallow:true})
    }
    console.log(props);

    /**
     * @description Toggles the state of a variable `clicked` when called and logs 'got
     * click' to the console. The `click` function is assumed to be defined elsewhere,
     * as it's not shown here.
     */
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