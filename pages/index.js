import Head from 'next/head'
import WalletContext from '../components/WalletContext'
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import PauseIcon from '@material-ui/icons/Pause';
import Image from 'next/image';
import VideoCard from '../components/VideoCard';
import { IconButton } from '@material-ui/core';
import React, { useState , useMemo, useEffect, useRef } from "react";
import PictureCard from '../components/PictureCard'
import Card from '@material-ui/core/Card'
import ExamplesButton from '../components/ExamplesButton';
import * as THREE from 'three'

import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass, LUTCubeLoader } from 'three-stdlib'

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass })
import {TextField, InputAdornment} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import SearchBox from '../components/SearchBox';
function Box(props) {
  const mesh = useRef(null)
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  useFrame((state, delta) => (mesh.current.rotation.x += delta))
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
const useStyles = makeStyles(theme => { 
    const first = alpha(theme.palette.primary.main, 0.8);
    const second = alpha(theme.palette.secondary.main, 0.4);
    const darkfirst = alpha(theme.palette.primary.main, 0.2);
    const darksecond = alpha(theme.palette.secondary.main, 0.2);
    let bg=`linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.9) 100%),url('/flowers.jpg') !important`;
    if (theme.palette.type=='dark') { 
        bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url('/flowers.jpg') !important`;
    }
    let bg2=`linear-gradient(-95deg, ${first} 0%, ${second} 100%),linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.85) 100%),url('/circuit2.png') !important`;
    if (theme.palette.type=='dark') { 
        bg2 = `linear-gradient(-120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.2) 100%), url('/circuit2.png') !important`;
    }
    return {
    bigHead: { 
        textShadow: `
                    1px 1px 15px rgba(0,0,0,1), 
                    1px 1px 25px rgba(0,0,0,1),
                    0px 0px 3px rgba(0,0,0,1), 
                    1px 1px 3px rgba(0,0,0,1),
                    -1px -1px 3px rgba(0,0,0,1),
                    0px -1px 3px rgba(0,0,0,1),
                    0px 1px 3px rgba(0,0,0,1),
                    1px 0px 3px rgba(0,0,0,1),
                    -1px 0px 3px rgba(0,0,0,1)
                    `,
        letterSpacing:'0.05em',
        fontSize: '100px',
        fontWeight: '900 !important',
    },
    subtleBigHead: { 
        wordBreak: 'break-word',
        textShadow: `
                    1px 1px 15px rgba(0,0,0,1), 
                    0px 0px 3px rgba(0,0,0,1), 
                    1px 1px 3px rgba(0,0,0,1),
                    -1px -1px 3px rgba(0,0,0,1),
                    0px -1px 3px rgba(0,0,0,1),
                    0px 1px 3px rgba(0,0,0,1),
                    1px 0px 3px rgba(0,0,0,1),
                    -1px 0px 3px rgba(0,0,0,1)
                    `,
        letterSpacing:'0.05em',
        fontSize: '80px',
        fontWeight: '900 !important',
    },
    littleHead: { 
        textShadow: `
        1px 1px 15px rgba(0,0,0,1), 
        1px 1px 10px rgba(0,0,0,1), 
        0px 0px 3px rgba(0,0,0,1), 
        1px 1px 3px rgba(0,0,0,1),
        -1px -1px 3px rgba(0,0,0,1),
        0px -1px 3px rgba(0,0,0,1),
        0px 1px 3px rgba(0,0,0,1),
        1px 0px 3px rgba(0,0,0,1),
        -1px 0px 3px rgba(0,0,0,1)
        `,
        letterSpacing:'0.05em',
        fontWeight: '600 !important',
        '& em': { 
            color: 'white !important'
        }
    },
    subtleLittleHead: { 
        wordBreak: 'break-word',
        textShadow: `
                    1px 1px 15px rgba(0,0,0,1), 
                    0px 0px 3px rgba(0,0,0,1), 
                    1px 1px 3px rgba(0,0,0,1),
                    -1px -1px 3px rgba(0,0,0,1),
                    0px -1px 3px rgba(0,0,0,1),
                    0px 1px 3px rgba(0,0,0,1),
                    1px 0px 3px rgba(0,0,0,1),
                    -1px 0px 3px rgba(0,0,0,1)
                    `,
        letterSpacing:'0.05em',
        fontWeight: '600 !important',
        '& em': { 
            color: 'white !important'
        }
    },
    bg: { 
      minHeight: '100vh',
      backgroundImage: bg,
      backgroundSize: `cover, cover, 990px`,
      backgroundRepeat: `no-repeat, no-repeat, repeat`,
      top: 0,
      left: 0,
      right: 0,
      minWidth:'100vw'
    },
    
    bg2: { 
        minHeight: '100vh',
        backgroundImage: bg2,
        backgroundSize: `cover, cover, 950px`,
        backgroundRepeat: `no-repeat, no-repeat, repeat`,
        top: 0,
        left: 0,
        right: 0,
        minWidth:'100vw'
    },
    bgImageCont: { 
        width: '100vw',
        height: '100vh',
        top:'0px',
        left:'0px',
        position: '',
        '& div': { 
            position: 'unset !important'
        }
    },
    bgImage: { 
        objectFit: 'cover', 
        width: '100vw', 
        height: '100vh'
    },
    content: { 
        position:'absolute',
        width:'100vw',
        top: '50%',
        textAlign: 'left',
        paddingLeft: '5em',
        paddingRight: '5em',
        transform: `translateY(-50%)`
    },
    wideContent: { 
        position:'absolute',
        width:'100vw',
        top: '50%',
        textAlign: 'left',
        paddingLeft: '2em',
        paddingRight: '2em',
        transform: `translateY(-50%)`
    },
    root: {
    }
  }});

  // https://codesandbox.io/s/qpfgyp
  function Swarm({ color, count, dummy = new THREE.Object3D() }) {
    const mesh = useRef()
    const light = useRef()
    const particles = useMemo(() => {
      const temp = []
      for (let i = 0; i < count; i++) {
        const t = Math.random() * 100
        const factor = 20 + Math.random() * 100
        const speed = 0.001 + Math.random() / 50
        const xFactor = -50 + Math.random() * 500
        const yFactor = -50 + Math.random() * 100
        const zFactor = -50 + Math.random() * 100
        temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 })
      }
      return temp
    }, [count])
    useFrame((state) => {
      light.current.position.set((-state.mouse.x * state.viewport.width) / 5, (-state.mouse.y * state.viewport.height) / 5, 0)
      particles.forEach((particle, i) => {
        let { t, factor, speed, xFactor, yFactor, zFactor } = particle
        t = particle.t += speed / 2
        const a = Math.cos(t) + Math.sin(t * 1) / 10
        const b = Math.sin(t) + Math.cos(t * 2) / 10
        const s = Math.cos(t)
        particle.mx += (state.mouse.x * 200 - particle.mx) * 0.01
        particle.my += (state.mouse.y * 200 - 1 - particle.my) * 0.01
        dummy.position.set(
          (particle.mx / 10) * a + xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
          (particle.my / 10) * b + yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
          (particle.my / 10) * b + zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
        )
        dummy.scale.setScalar(s/5)
        dummy.rotation.set(s * 5, s * 5, s * 5)
        dummy.updateMatrix()
        mesh.current.setMatrixAt(i, dummy.matrix)
      })
      mesh.current.instanceMatrix.needsUpdate = true
    })
    return (
      <>
        <pointLight ref={light} position={[0,0,0]} distance={100} intensity={2} decay={10} color="#ffff00">
          
        </pointLight>
        <instancedMesh ref={mesh} args={[null, null, count]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color={color} roughness={0.6} />
          
        </instancedMesh>
      </>
    )
  }

export default function Home() {
    const classes=useStyles();
    const [autoPlay, setAutoplay] = useState(false);
    const [loadingContent, setLoadingContent] = useState((<><CircularProgress size="1em" style={{position: 'relative', top:'0.15em', marginRight: '0.3em', marginLeft:'0.2em'}} /> Loading slideshow&hellip;</>));
    const [currentSlide, setCurrentSlide] = useState(0);
    const points = [];
    for (var i = 0; i < 3000; i++)
        points.push(new THREE.Vector3(Math.random(), Math.random(), Math.random()));
    const bufferGeom = new THREE.BufferGeometry();
    bufferGeom.setFromPoints(points);
    const texture= new THREE.CanvasTexture()
    
    const material = new THREE.PointsMaterial({ size: 20, map: texture, blending: THREE.AdditiveBlending, depthTest: 0, transparent: 1 });
    const field = new THREE.Points(bufferGeom, material);
              //A = new T.Points(pg, mats[i]);
    
    const onLoad = (e) => { 
        setAutoplay(true);
        setLoadingContent((<><PauseIcon /> Paused&hellip;</>));
    }
    const toggleOnOff = () => { 
        if (!autoPlay) { 
            setCurrentSlide(currentSlide+1);
        }
        setAutoplay(!autoPlay);
    }
    const updateCurrentSlide = (index) => { 
        if (currentSlide !== index) { 
            setCurrentSlide(index);
        }
    }
    return (
    <>
      <Head>
        <title>clg.wtf</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{height:'100%', position:'relative'}}>
      <Canvas style={{position:'absolute'}} linear flat legacy dpr={1} camera={{ fov: 1000, position: [0, 0, 30] }}>
    <ambientLight intensity={0.01} />
    
    <spotLight intensity={200} position={[0, 0,100]} penumbra={1} color="red" />
    <mesh>
      <planeGeometry args={[1000, 1000]} />
      <meshStandardMaterial color="#ff0000" roughness={0.5} depthTest={false} />
    </mesh>
    <Swarm count={20000} color="#100200" />
    <Swarm count={20000} color="#100210" />
    <Swarm count={20000} color="#020215" />
    <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
      
    <Postpro />
  </Canvas>
      
    
    <Card style={{cursor: 'pointer', top: '50%', transform:'translateY(-50%)', position:'relative', width:'fit-content', marginLeft:'auto', marginRight:'auto', padding:'1em', boxShadow:'2px 2px 15px 5px rgba(0,0,0,0.5)', border: '1px solid black'}}>
    <Typography variant="h4">
        <>
        <div style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
        
            <SearchBox /> 
            </div>
        </>
        </Typography>
    </Card>
    </div>
    </>)

    
        
}
function Postpro() {
    const water = useRef()
    const data = useLoader(LUTCubeLoader, '/cubicle.CUBE')
    useFrame((state) => (water.current.time = state.clock.elapsedTime * 4))
    return (
      <Effects disableGamma>
        <waterPass ref={water} factor={1} />
        <unrealBloomPass args={[undefined, 1.25, 1, 0]} />
        <filmPass args={[0.2, 0.5, 1500, false]} />
        
      </Effects>
    )
  }
  