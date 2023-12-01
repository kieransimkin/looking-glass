import Head from 'next/head'
import WalletContext from '../components/WalletContext'
import { Typography, CircularProgress } from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import PauseIcon from '@material-ui/icons/Pause';
import Image from 'next/image';
import VideoCard from '../components/VideoCard';
import { checkCacheItem } from '../utils/redis.mjs';
import { IconButton } from '@material-ui/core';
import React, { useState , useMemo, useEffect, useRef, useLayoutEffect } from "react";
import PictureCard from '../components/PictureCard'
import Card from '@material-ui/core/Card'
import ExamplesButton from '../components/ExamplesButton';
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import * as THREE from 'three'
import { getFeaturedPolicies } from '../utils/database.mjs';
import { getDataURL } from '../utils/DataStore';
import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { Effects } from '@react-three/drei'
import { FilmPass, WaterPass, UnrealBloomPass, LUTPass, LUTCubeLoader, GlitchPass, AfterimagePass } from 'three-stdlib'

extend({ WaterPass, UnrealBloomPass, FilmPass, LUTPass, GlitchPass })

import {TextField, InputAdornment} from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import SearchBox from '../components/SearchBox';
import PolicyQuickBrowse from '../components/PolicyQuickBrowse';
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


function CardanoLogo(props) { 
  const ref = useRef();
  const [objects, setObjects] = useState([]);
  useFrame((state) => {
    if (ref.current){
      //console.log(state);
      ref.current.rotation.y = -state.mouse.x/3
      ref.current.rotation.x = (state.mouse.y/4) - Math.PI*0.09
    //ref.current.rotation.set([(-state.mouse.x * state.viewport.width) / 5, (-state.mouse.y * state.viewport.height) / 5, 0])
    }
  });
    
    useEffect(() => { 
     
      const svgMarkup = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
      <!-- Created with Inkscape (http://www.inkscape.org/) -->
      
      <svg
         width="183.0963mm"
         height="90.666283mm"
         viewBox="0 0 183.0963 90.666283"
         version="1.1"
         id="svg1"
         xml:space="preserve"
         inkscape:version="1.3 (0e150ed6c4, 2023-07-21)"
         xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
         xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
         xmlns="http://www.w3.org/2000/svg"
         xmlns:svg="http://www.w3.org/2000/svg"><sodipodi:namedview
           id="namedview1"
           pagecolor="#ffffff"
           bordercolor="#000000"
           borderopacity="0.25"
           inkscape:showpageshadow="2"
           inkscape:pageopacity="0.0"
           inkscape:pagecheckerboard="0"
           inkscape:deskcolor="#d1d1d1"
           inkscape:document-units="mm"
           showguides="true"
           inkscape:zoom="1.596736"
           inkscape:cx="325.35121"
           inkscape:cy="269.6125"
           inkscape:window-width="3840"
           inkscape:window-height="2066"
           inkscape:window-x="3829"
           inkscape:window-y="-11"
           inkscape:window-maximized="1"
           inkscape:current-layer="layer1" /><defs
           id="defs1" /><g
           inkscape:label="Layer 1"
           inkscape:groupmode="layer"
           id="layer1"
           transform="translate(-17.143036,-77.426499)"><path
             style="fill:#000000"
             d="m 29.053078,167.93361 c -1.648888,-0.5574 -3.173031,-1.35697 -4.043428,-2.12119 -1.118535,-0.98209 -2.162145,-2.70092 -2.401679,-3.95558 l -0.171399,-0.89777 0.297941,-0.359 0.297942,-0.359 h 1.646387 1.646388 l 0.480538,0.53099 c 0.264296,0.29205 0.611239,0.79315 0.770984,1.11357 0.159745,0.32041 0.806169,0.94467 1.436497,1.38724 l 1.146053,0.80466 h 4.275534 4.275533 l 1.068797,-0.69577 c 1.473195,-0.95903 2.320067,-2.18668 2.848225,-4.12888 l 0.448603,-1.64965 v -2.25295 c 0,-1.23913 -0.101941,-2.25296 -0.226535,-2.25296 -0.124595,0 -0.772296,0.41672 -1.439336,0.92605 -0.66704,0.50932 -1.286006,0.92604 -1.37548,0.92604 -0.08948,0 -0.706111,0.24756 -1.370303,0.55013 l -1.207623,0.55014 -4.66484,-0.0972 -4.664841,-0.0972 -0.79375,-0.45127 c -0.436563,-0.24819 -0.929005,-0.452 -1.094317,-0.45289 -0.378458,-0.002 -2.973727,-2.51514 -3.69037,-3.57351 -0.295606,-0.43656 -0.798496,-1.57605 -1.117535,-2.53219 l -0.58007,-1.73844 v -6.07594 -6.07593 l 0.521766,-1.48452 c 0.681031,-1.93765 1.467238,-3.26225 2.768164,-4.66378 l 1.057756,-1.13956 1.919671,-0.91096 1.919671,-0.91097 h 4.648277 4.648276 l 1.113939,0.56084 c 0.612666,0.30846 1.679486,0.9631 2.37071,1.45477 l 1.25677,0.89393 v -0.64379 c 0,-0.35409 0.118192,-0.95467 0.262648,-1.33461 l 0.262648,-0.69082 1.781131,0.0783 1.781131,0.0783 0.3439,0.66146 0.343901,0.66145 -0.106885,15.34584 -0.106885,15.34583 -0.290352,1.45926 c -0.342963,1.72367 -1.300069,3.80204 -2.295833,4.98544 -0.868086,1.03166 -2.493456,2.14713 -4.09207,2.80833 l -1.190625,0.49245 -5.027084,0.0775 c -2.764896,0.0426 -5.324739,-0.0231 -5.688541,-0.14609 z m 9.392708,-16.6077 c 1.106674,-0.5892 2.366323,-1.81873 3.135806,-3.06083 0.24914,-0.40216 0.685765,-1.47372 0.970278,-2.38125 l 0.517298,-1.65005 0.0034,-4.07387 0.0034,-4.07388 -0.554786,-1.52155 -0.554786,-1.52156 -0.966568,-1.01915 c -0.531612,-0.56053 -1.5353,-1.28704 -2.230417,-1.61446 l -1.263849,-0.59532 h -3.317167 -3.317167 l -1.372109,0.63215 c -1.474702,0.67941 -2.108428,1.27779 -3.113391,2.93973 l -0.639968,1.05833 v 6.61458 6.61459 l 0.79686,1.29668 c 0.905796,1.47395 1.689871,2.13504 3.187189,2.68727 l 1.043034,0.38468 3.307292,-0.0763 3.307292,-0.0763 z m 41.142709,5.29882 c -4.253561,-0.87226 -6.322971,-2.26103 -7.572271,-5.08168 l -0.629813,-1.42199 v -3.12646 -3.12646 l 0.244227,-0.15094 c 0.134325,-0.083 0.320238,-0.49702 0.41314,-0.92 l 0.168913,-0.76905 1.157717,-1.14614 c 1.43025,-1.41595 1.901708,-1.8076 2.175942,-1.8076 0.117437,0 0.688009,-0.26001 1.267938,-0.57779 l 1.054415,-0.57779 5.159375,-0.003 5.159375,-0.003 0.926042,0.4226 c 0.509322,0.23243 1.283229,0.54125 1.719791,0.68626 0.436563,0.14502 1.00211,0.34812 1.256771,0.45133 l 0.463021,0.18766 -0.0086,-2.4757 -0.0086,-2.47571 -0.462548,-1.33789 c -0.514019,-1.48676 -1.044851,-2.12964 -2.461824,-2.98144 l -0.957271,-0.57546 h -4.146498 -4.146498 l -1.113939,0.56725 c -1.210776,0.61656 -1.750824,1.22344 -2.194439,2.46602 -0.368583,1.03241 -1.222365,1.45588 -2.945087,1.46075 l -1.379753,0.004 -0.273892,-0.51177 c -0.419952,-0.78469 -0.33249,-1.5107 0.365941,-3.03763 l 0.639835,-1.39882 1.406142,-1.23006 c 0.773378,-0.67653 1.527249,-1.23409 1.67527,-1.23903 0.14802,-0.005 0.745378,-0.23902 1.327461,-0.52019 l 1.058333,-0.51121 5.457182,-0.009 5.457182,-0.009 1.469988,0.6501 1.469988,0.6501 1.32693,1.26813 1.326929,1.26813 0.678396,1.48512 0.678396,1.48512 -0.06895,11.61176 -0.06895,11.61175 -1.676747,0.0794 -1.676747,0.0794 -0.360694,-0.29935 -0.360694,-0.29935 -0.07923,-1.31688 -0.07923,-1.31688 -1.336802,1.13998 c -1.336626,1.13984 -2.346661,1.7148 -4.087156,2.32659 -0.963297,0.33861 -6.253981,0.59315 -7.408333,0.35643 z m 6.328327,-4.35156 c 1.996169,-0.33813 3.217695,-0.97252 4.479428,-2.32634 1.021093,-1.09563 2.156828,-3.46773 2.156828,-4.50477 0,-1.22709 -0.989175,-2.01345 -3.667829,-2.91583 l -1.607145,-0.5414 H 83.28728 79.296457 l -1.008439,0.58038 c -0.554641,0.31921 -1.262839,0.95166 -1.573773,1.40543 l -0.565334,0.82505 v 2.55411 2.55411 l 0.817919,0.93156 0.817919,0.93156 0.968018,0.25224 c 2.208478,0.57547 4.736688,0.66507 7.164055,0.2539 z m 27.141458,4.41924 c -0.14552,-0.0528 -0.97895,-0.24994 -1.85208,-0.43817 -1.96516,-0.42364 -4.08315,-1.57471 -5.16528,-2.80719 -0.45122,-0.51391 -1.11073,-1.56911 -1.46558,-2.34489 l -0.64518,-1.41051 v -1.02237 c 0,-0.5623 0.14287,-1.16525 0.3175,-1.33987 l 0.3175,-0.3175 h 1.49357 1.49358 l 0.41327,0.46302 c 0.2273,0.25466 0.54454,0.95621 0.70499,1.55899 l 0.29171,1.09597 1.02891,0.92955 1.02891,0.92956 1.45267,0.32509 1.45266,0.32509 3.53518,-0.14446 c 1.94434,-0.0794 3.95189,-0.27634 4.46122,-0.43754 0.50932,-0.16119 1.28322,-0.60831 1.71979,-0.99359 l 0.79375,-0.7005 0.095,-2.09085 0.095,-2.09085 -0.62416,-0.66882 c -0.86323,-0.92499 -2.41704,-1.67566 -3.46845,-1.67566 -0.48455,0 -1.53109,-0.16778 -2.32565,-0.37285 -0.79456,-0.20506 -2.15902,-0.45111 -3.03215,-0.54677 -2.41694,-0.26481 -5.13608,-0.93299 -6.69637,-1.64553 -0.77259,-0.35281 -1.85751,-1.10807 -2.41094,-1.67834 l -1.00624,-1.03686 -0.43333,-1.54437 c -0.54824,-1.95393 -0.54565,-3.07041 0.0123,-5.29159 l 0.44562,-1.77403 1.38151,-1.3815 1.38151,-1.38151 1.51308,-0.66916 1.51309,-0.66916 h 5.54028 5.54028 l 1.37211,0.63501 c 2.75382,1.27447 4.68962,3.63421 5.10324,6.22086 l 0.1725,1.07877 -0.33057,0.3983 -0.33056,0.39831 H 126.44624 124.95 l -0.55737,-0.3904 -0.55738,-0.3904 -0.17169,-0.86637 c -0.20837,-1.05151 -0.77078,-1.7491 -2.03753,-2.52727 l -0.95727,-0.58806 -4.33439,0.008 -4.3344,0.008 -1.0242,0.62939 c -0.56331,0.34617 -1.24713,0.96753 -1.51961,1.38081 l -0.49541,0.75141 -0.002,1.60956 -0.002,1.60956 0.8599,0.99141 0.85989,0.9914 1.85209,0.37573 c 1.01864,0.20666 2.92364,0.54905 4.23333,0.76087 1.30969,0.21182 2.8575,0.50658 3.43958,0.65501 0.58209,0.14843 1.41552,0.27327 1.85209,0.27741 1.11233,0.0106 3.66017,1.09778 4.89151,2.08731 l 1.03592,0.83248 0.6743,1.34251 0.67431,1.34252 v 2.50059 2.5006 l -0.63876,1.26054 c -1.16974,2.30837 -3.14602,3.71966 -6.3727,4.55082 l -1.32292,0.34077 -3.83645,0.0836 c -2.11006,0.046 -3.95553,0.0404 -4.10105,-0.0124 z m 28.8829,-0.43889 c -2.42984,-0.62411 -3.69641,-1.36028 -5.05248,-2.93666 -1.11833,-1.30001 -1.69738,-2.4826 -2.03013,-4.1461 l -0.22972,-1.14844 0.27038,-0.50521 0.27038,-0.5052 h 1.51932 1.51932 l 0.56453,0.39541 0.56454,0.39542 0.17252,1.02112 0.17251,1.02111 1.10776,1.06238 1.10776,1.06238 1.24164,0.29921 c 1.57241,0.37893 6.50775,0.38754 8.56549,0.0149 0.86347,-0.15634 1.9586,-0.5433 2.43361,-0.85989 l 0.86366,-0.57563 0.28995,-1.05834 0.28995,-1.05833 -0.14512,-1.41636 -0.14513,-1.41637 -0.45596,-0.50383 c -0.98791,-1.09164 -1.74423,-1.30657 -8.30788,-2.36093 -2.89401,-0.46489 -5.63606,-1.09195 -6.72252,-1.53732 -1.4862,-0.60925 -2.90884,-1.70645 -3.53702,-2.72791 -0.29941,-0.48686 -0.69683,-1.62772 -0.88316,-2.53526 l -0.33878,-1.65006 0.33709,-2.00614 0.33709,-2.00614 0.65114,-0.95951 c 0.71564,-1.05454 2.46256,-2.70257 2.88011,-2.71706 0.14552,-0.005 0.74084,-0.23923 1.32292,-0.5204 l 1.05833,-0.51121 5.63935,-0.009 5.63935,-0.009 1.40493,0.64263 c 1.67985,0.76838 3.55822,2.51749 4.31655,4.0195 0.56968,1.12836 0.84262,3.18921 0.49654,3.74918 l -0.19774,0.31994 h -1.66317 -1.66317 l -0.41727,-0.46302 c -0.22949,-0.25466 -0.50249,-0.82021 -0.60665,-1.25677 -0.23804,-0.99764 -0.5222,-1.35768 -1.80977,-2.29307 l -1.03188,-0.74964 -4.39208,0.001 -4.39207,0.001 -1.00648,0.60929 c -0.55356,0.33511 -1.23739,0.95957 -1.51961,1.38771 l -0.51313,0.77842 -0.002,1.60956 -0.002,1.60956 0.8599,0.98422 0.85989,0.98422 1.85209,0.39739 c 1.01864,0.21857 2.94347,0.55625 4.27739,0.75039 1.33391,0.19415 2.54666,0.428 2.695,0.51968 0.14833,0.0917 1.08873,0.26952 2.08977,0.39522 l 1.82008,0.22854 1.5246,0.72125 c 1.71797,0.81273 2.64796,1.63403 3.59748,3.17705 l 0.65126,1.05833 0.004,2.91042 0.004,2.91042 -0.48961,0.92604 c -1.14105,2.15812 -3.35899,3.7236 -6.38444,4.50627 l -1.32292,0.34223 -3.96875,0.0816 -3.96875,0.0816 z m -80.608936,-0.41805 c -2.429075,-0.85528 -3.456932,-1.75858 -4.282071,-3.76316 l -0.61272,-1.48853 v -18.12395 -18.12395 l 1.852083,-0.068 c 1.018646,-0.0374 2.030677,0.0475 2.248958,0.18865 l 0.396875,0.2567 0.132292,17.73194 0.132292,17.73196 0.847107,0.84693 0.847108,0.84693 1.931017,0.15017 1.931018,0.15016 v 1.85209 1.85208 l -2.513542,0.0499 c -1.382448,0.0274 -2.692135,-0.013 -2.910417,-0.0899 z m 120.285096,-26.61938 -1.82012,-0.58115 -1.38092,-1.3287 c -1.46953,-1.41397 -2.51947,-3.18005 -2.51947,-4.23796 v -0.644 l 0.51177,-0.27389 c 0.70194,-0.37567 2.6542,-0.33759 3.45463,0.0674 0.36251,0.18341 0.70182,0.56861 0.75402,0.85599 0.14092,0.7759 1.08992,1.69345 2.34266,2.26504 l 1.10997,0.50644 h 3.40665 3.40666 l 1.4365,-0.7276 1.43651,-0.72761 0.77669,-1.17152 0.77669,-1.17153 0.19973,-1.20972 c 0.27275,-1.65203 0.27286,-4.83548 1.9e-4,-5.2656 l -0.22298,-0.35172 -1.77858,1.19283 -1.77858,1.19283 -1.72474,0.1847 c -0.94861,0.10159 -3.29054,0.12648 -5.20429,0.0553 l -3.47955,-0.12938 -1.36443,-0.69955 c -1.67366,-0.85808 -3.59651,-2.76529 -4.34331,-4.30797 -0.307,-0.63418 -0.72169,-1.8372 -0.92152,-2.67337 l -0.36335,-1.5203 -0.009,-4.94452 -0.009,-4.944523 0.38929,-1.67007 c 0.46981,-2.015414 1.1527,-3.408004 2.41351,-4.921784 1.14136,-1.37036 2.4641,-2.23749 4.51005,-2.956584 l 1.53235,-0.53858 3.84563,0.009 3.84562,0.009 1.05834,0.51121 c 0.58208,0.28117 1.18062,0.515254 1.33009,0.520194 0.14947,0.005 0.65455,0.3586 1.1224,0.78591 l 0.85063,0.77693 0.39896,-0.39895 c 0.21943,-0.21943 0.39896,-0.5506 0.39896,-0.73593 0,-0.18533 0.21773,-0.53401 0.48385,-0.774854 l 0.48386,-0.43788 h 1.31531 1.31531 l 0.3175,0.3175 0.3175,0.317504 v 15.897407 15.89738 l -0.54624,1.55416 c -1.10071,3.13173 -2.99349,5.16623 -5.84979,6.2878 l -1.40918,0.55333 -4.49791,0.0843 -4.49792,0.0843 z m 9.83924,-15.8927 c 0.26906,-0.2435 0.62069,-0.44272 0.78139,-0.44272 0.40045,0 1.99132,-1.99111 2.74818,-3.43958 l 0.62213,-1.19063 v -5.55625 -5.556253 l -0.35256,-0.61872 c -0.69835,-1.225544 -2.28407,-2.742034 -3.52446,-3.370584 l -1.26476,-0.64091 h -3.15016 -3.15016 l -1.15812,0.51279 c -1.48678,0.65832 -2.72814,1.88108 -3.47587,3.423814 l -0.59266,1.22278 v 5.820833 5.82084 l 0.66146,1.29862 c 0.75429,1.48087 2.19462,2.75625 3.48448,3.08543 0.48463,0.12368 2.45632,0.19076 4.38153,0.14907 l 3.50038,-0.0758 z m -153.143086,4.53027 c -1.952746,-0.68817 -3.949727,-2.24199 -5.090768,-3.96104 l -0.937773,-1.41281 -0.491458,-1.85009 -0.491459,-1.85009 v -5.29167 -5.291663 l 0.484425,-1.85911 0.484425,-1.859114 0.992881,-1.44819 c 1.251147,-1.82488 2.963625,-3.13257 5.10148,-3.895634 l 1.668039,-0.59536 4.639379,5e-5 4.639378,5e-5 1.532349,0.53858 c 2.674084,0.939874 4.165682,2.096904 5.573244,4.323164 l 0.85732,1.35597 0.441836,1.852094 0.441836,1.85208 -6.92e-4,5.071863 -6.92e-4,5.07186 -0.406956,1.67501 c -0.223826,0.92126 -0.581014,1.99105 -0.79375,2.3773 -0.212737,0.38625 -0.386794,0.89227 -0.386794,1.12448 0,0.23221 -0.1227,0.4222 -0.272666,0.4222 -0.149967,0 -0.650946,0.43083 -1.113287,0.95741 -1.090059,1.24151 -2.421024,2.06833 -4.405709,2.73693 l -1.599978,0.53899 -4.704701,-0.0352 -4.7047,-0.0352 z m 11.165593,-3.90688 c 1.728907,-0.76478 2.523875,-1.48365 3.329114,-3.01044 l 0.718835,-1.36296 v -6.08542 -6.085413 l -0.585093,-1.09391 c -0.799999,-1.495704 -1.989638,-2.627824 -3.431585,-3.265664 l -1.209964,-0.53523 h -3.552757 -3.552758 l -1.242255,0.55708 c -1.685506,0.75584 -2.630031,1.68996 -3.40413,3.366624 l -0.651057,1.41016 0.08355,6.130473 0.08355,6.13047 0.695947,1.05833 c 0.902244,1.37205 1.83535,2.22271 3.070934,2.7996 l 0.995619,0.46486 3.736679,0.0214 3.736679,0.0214 z m 21.658987,3.91167 c -2.527066,-0.89223 -4.42987,-2.57504 -5.778121,-5.11007 l -0.562871,-1.05833 -0.409502,-2.49402 -0.409502,-2.49402 -5.39e-4,-3.32682 -5.38e-4,-3.32681 0.431976,-2.381253 c 0.635034,-3.500614 1.749809,-5.460584 4.028464,-7.082784 0.676048,-0.48129 1.924383,-1.13838 2.774076,-1.460214 l 1.544898,-0.58514 h 4.681981 4.68198 l 1.53235,0.53858 c 0.842792,0.29622 1.969759,0.815234 2.504371,1.153364 1.298277,0.82114 2.670698,2.22812 3.124178,3.20286 0.203104,0.43656 0.469865,0.97234 0.592803,1.19062 0.122938,0.21828 0.418819,1.00817 0.657512,1.755304 l 0.433988,1.35843 v 5.749813 5.74981 l -0.431341,1.35843 c -0.647847,2.04028 -1.447395,3.51787 -2.478518,4.58039 -1.242038,1.27986 -2.54447,2.07291 -4.469303,2.72134 l -1.599979,0.53899 -4.7047,-0.0352 -4.704701,-0.0352 z m 11.394061,-4.0232 c 1.579541,-0.70304 2.287103,-1.36996 3.11391,-2.93504 l 0.557033,-1.05441 v -6.29657 -6.296573 l -0.652689,-1.288024 c -0.733535,-1.44756 -1.54056,-2.17359 -3.262968,-2.93549 l -1.178693,-0.5214 H 77.55597 74.003212 l -1.242254,0.55708 c -1.697814,0.76136 -2.636027,1.69749 -3.385973,3.378454 l -0.634407,1.42199 0.01478,5.721763 0.01478,5.72177 0.457073,1.12544 c 0.588415,1.44884 1.907665,2.83886 3.304147,3.48139 l 1.104006,0.50795 3.73739,0.0223 3.73739,0.0223 z m -60.499361,3.83077 c -0.586948,-0.0965 -1.595753,-0.53048 -2.241788,-0.96437 -1.149358,-0.77191 -1.385083,-1.09627 -2.231982,-3.07121 l -0.415968,-0.97002 0.06804,-17.550817 0.06804,-17.550814 1.576476,-0.081 c 0.867061,-0.0445 1.849327,-0.0125 2.182812,0.0712 l 0.606337,0.15218 0.01932,16.068404 c 0.01062,8.837617 0.109093,16.699347 0.218821,17.470497 l 0.199505,1.40209 0.521057,0.52106 0.521058,0.52106 1.795019,0.16762 1.795018,0.16762 0.37552,0.37552 0.37552,0.37552 v 1.2511 1.2511 l -0.3175,0.3175 -0.3175,0.3175 -1.865313,-0.0331 c -1.025922,-0.0182 -2.345543,-0.11209 -2.932491,-0.20862 z m 76.350447,-0.27004 -0.273896,-0.51177 V 97.834037 78.783859 l 0.258036,-0.67868 0.25803,-0.67868 h 1.673429 1.67342 l 0.3175,0.3175 0.3175,0.31749 0.0209,12.184074 c 0.0115,6.701234 0.0809,12.035237 0.15434,11.853337 0.0734,-0.1819 0.27727,-0.33073 0.45306,-0.33073 0.17578,0 3.15787,-2.768203 6.62686,-6.151567 3.46899,-3.38336 6.59246,-6.305764 6.94104,-6.494234 l 0.63379,-0.34267 1.77655,0.0781 1.77654,0.0781 0.0955,0.500354 0.0955,0.50035 -5.69149,5.71736 -5.69148,5.717367 0.2147,0.52916 c 0.11808,0.29104 0.49439,0.81973 0.83625,1.17486 0.34185,0.35512 1.39546,1.6156 2.34135,2.80106 2.64939,3.32043 6.17495,7.65078 6.34877,7.79804 0.0859,0.0728 0.72197,0.8344 1.41352,1.69252 l 1.25736,1.56024 -0.0808,0.42414 -0.0808,0.42414 -1.84382,0.0796 c -1.0141,0.0438 -2.08443,0.0176 -2.37851,-0.0583 -0.29409,-0.0758 -1.42767,-1.23646 -2.51908,-2.57917 -1.0914,-1.34271 -2.16297,-2.62737 -2.38125,-2.85481 -0.21828,-0.22744 -1.16992,-1.36482 -2.11475,-2.52752 -1.65259,-2.03367 -2.27108,-2.77245 -3.70622,-4.42706 l -0.66159,-0.76276 -1.60972,1.53791 c -0.88534,0.84585 -1.74848,1.79797 -1.91809,2.11582 l -0.30838,0.57792 v 4.19781 4.19781 l -0.3175,0.3175 -0.3175,0.3175 h -1.65756 -1.657569 z m 30.480999,0.20459 -0.32781,-0.32782 v -13.8227 -13.822717 l 0.58804,-0.411874 0.58803,-0.41188 h 1.36394 1.36394 l 0.29932,0.36065 0.29932,0.360664 -0.0685,14.125287 -0.0685,14.12528 -1.85499,0.0765 -1.855,0.0765 z m 13.85728,-0.0976 -0.42676,-0.42676 V 103.46906 89.861913 l 0.52917,-0.529174 0.52917,-0.52916 h 1.26404 1.26405 l 0.58803,0.41188 0.58804,0.411874 v 1.16001 c 0,1.19799 0.33536,1.72661 0.71134,1.12129 0.40014,-0.64422 2.58967,-2.24707 3.83821,-2.809774 l 1.24225,-0.55987 h 3.70889 3.70889 l 1.31875,0.51981 c 0.72531,0.28589 1.5836,0.732374 1.9073,0.992194 0.92075,0.73901 2.34713,2.29882 2.34852,2.56821 7e-4,0.13406 0.16053,0.43172 0.35519,0.66146 0.19466,0.22974 0.55507,1.19162 0.80092,2.1375 l 0.44701,1.719794 -0.0733,10.318753 -0.0733,10.31875 h -2.11667 -2.11667 l -0.13229,-10.84791 -0.13229,-10.847923 -0.71297,-1.096054 c -0.39214,-0.60282 -1.10651,-1.37673 -1.5875,-1.71979 l -0.87453,-0.62374 -2.99814,-0.0895 -2.99814,-0.0894 -1.36749,0.5795 -1.36748,0.5795 -1.23882,1.2833 c -0.68136,0.70581 -1.51479,1.854504 -1.85209,2.552654 l -0.61326,1.26935 -0.13229,9.525003 -0.13229,9.525 -1.88834,0.0771 -1.88834,0.0771 z M 129.98624,84.874599 c -0.88746,-0.28566 -1.61157,-0.91914 -2.07189,-1.81257 -0.23995,-0.46572 -0.43627,-1.08399 -0.43627,-1.37394 0,-0.73459 0.95877,-2.28342 1.72381,-2.7847 1.34489,-0.8812 3.5985,-0.2756 4.47102,1.20147 0.23086,0.39082 0.41975,1.18908 0.41975,1.77393 v 1.06335 l -0.67847,0.80631 -0.67846,0.80631 -0.97518,0.27085 c -1.06722,0.29641 -1.01051,0.29485 -1.77431,0.049 z"
             id="path3" /></g></svg>
      `;
      const loader = new SVGLoader();
      const svgData = loader.parse(svgMarkup);
      const svgMaterial = new THREE.MeshBasicMaterial({ color: "#442000", depthTest: 0, blending: THREE.AdditiveBlending, transparent: 1  });
     
      
      
      const shapes = [];
      svgData.paths.forEach((path, i) => {
        
        const sh = path.toShapes(true);
        sh.forEach((s) => { 
          shapes.push(s);
        })
      });
      
      const obj = [];
      shapes.forEach((shape, i) => {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: 10,
          bevelEnabled: false
        });
        
        const mesh = new THREE.Mesh(geometry,svgMaterial);
        obj.push(<primitive object={mesh} scale={4} position={[350,-200,0]} rotation={[1*Math.PI,2*Math.PI,1*Math.PI]}>
        </primitive>)
        
      });
      setObjects(obj);
    },[]);


    return (
      <group ref={ref} position={[-50,-300,-850]}>
        {objects}
      </group>
    )
}

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
        particle.mx += (state.mouse.x * 800 - particle.mx) * 0.01
        particle.my += (state.mouse.y * 300 - 1 - particle.my) * 0.01
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
export const getServerSideProps = async (context) => { 
  const props = {};
  props.featuredPolicies = await getFeaturedPolicies('random','asc',0,true);  
  
  for (const policy of props.featuredPolicies) { 
    const policyProfile = await checkCacheItem('policyProfile:'+policy.policyID);
    let tokenData = await checkCacheItem('getTokenData:'+policyProfile);
    if (!tokenData) tokenData={};
    const thumbName = 'tokenThumb:'+tokenData.unit+':500:dark';
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
export default function Home(props) {
    const featuredPolicies = props.featuredPolicies;
    console.log(featuredPolicies)
    const [cardanoObjects, setCardanoObjects] = useState([]);
    const ringRef1=useRef();
    const ringRef2=useRef();
    const ringRef3=useRef();
    const ringRef4=useRef();
    useEffect(() =>{ 
      const loader = new SVGLoader();
      const cardanoSvg = `<?xml version="1.0" encoding="UTF-8"?>
      <svg enable-background="new 0 0 375 346.5" version="1.1" viewBox="0 0 375 346.5" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
      <style type="text/css">
        .st0{fill:#0033AD;}
      </style>&#10;<g 
   id="r1"><path
     class="st0"
     d="m 102.8,172 c -0.8,13.9 9.9,25.8 23.8,26.6 0.5,0 1,0 1.5,0 14,0 25.3,-11.3 25.2,-25.3 0,-14 -11.3,-25.3 -25.3,-25.2 -13.4,0 -24.5,10.5 -25.2,23.9 z"
     id="path1" /><path
     class="st0"
     d="m 248.4,147.9 c -13.9,-0.8 -25.9,9.9 -26.6,23.8 -0.8,13.9 9.9,25.9 23.8,26.6 0.5,0 1,0 1.4,0 13.9,0 25.2,-11.3 25.2,-25.3 0.1,-13.3 -10.4,-24.4 -23.8,-25.1 z"
     id="path11" /><path
     class="st0"
     d="m 135.1,133.1 c 4.3,8.5 13,13.9 22.6,13.9 13.9,0 25.2,-11.3 25.2,-25.3 0,-3.9 -0.9,-7.8 -2.7,-11.4 -6.3,-12.5 -21.5,-17.5 -33.9,-11.2 -12.5,6.4 -17.5,21.6 -11.2,34 z"
     id="path12" /><path
     class="st0"
     d="m 196,107.8 c -7.6,11.7 -4.4,27.3 7.3,34.9 11.7,7.6 27.3,4.4 34.9,-7.3 7.6,-11.7 4.4,-27.3 -7.3,-34.9 -4.1,-2.7 -8.9,-4.1 -13.8,-4.1 -8.5,0 -16.4,4.3 -21.1,11.4 z"
     id="path18" /><path
     class="st0"
     d="m 239.9,213.4 c -6.3,-12.5 -21.5,-17.5 -33.9,-11.2 -12.5,6.3 -17.5,21.5 -11.2,33.9 6.3,12.5 21.5,17.5 33.9,11.2 0,0 0,0 0,0 12.4,-6.2 17.5,-21.2 11.3,-33.7 0,-0.1 0,-0.1 -0.1,-0.2 z"
     id="path19" /><path
     class="st0"
     d="m 179,238.7 c 7.6,-11.7 4.4,-27.3 -7.3,-35 -11.7,-7.6 -27.3,-4.4 -35,7.3 -7.7,11.7 -4.4,27.3 7.3,35 4.1,2.7 8.9,4.1 13.8,4.1 8.6,0.1 16.5,-4.2 21.2,-11.4 z"
     id="path26" /></g><g
   id="r2"><path
     class="st0"
     d="m 8.6,165.5 c -4.5,-0.3 -8.4,3.2 -8.6,7.7 -0.2,4.5 3.2,8.4 7.7,8.6 4.5,0.3 8.3,-3.2 8.6,-7.7 0.3,-4.5 -3.2,-8.3 -7.7,-8.6 z"
     id="path2" /><path
     class="st0"
     d="m 101.2,25.4 c 4,-2 5.6,-7 3.6,-11 -2,-4 -7,-5.6 -11,-3.6 -4,2 -5.6,6.9 -3.6,10.9 2,4.1 6.9,5.8 11,3.7 -0.1,0 0,0 0,0 z"
     id="path3" /><path
     class="st0"
     d="m 40.6,100.8 c 4.8,3.1 11.2,1.8 14.4,-3 3.1,-4.8 1.8,-11.2 -3,-14.4 -4.8,-3.1 -11.2,-1.8 -14.4,3 0,0 0,0 0,0 -3.2,4.8 -1.8,11.3 3,14.4 z"
     id="path5" /><path
     class="st0"
     d="m 42,245.7 c -5.1,2.6 -7.2,8.8 -4.6,14 2.6,5.1 8.8,7.2 14,4.6 5.1,-2.6 7.2,-8.8 4.6,-14 0,0 0,0 0,0 -2.6,-5.1 -8.9,-7.2 -14,-4.6 z"
     id="path7" /><path
     class="st0"
     d="m 272.3,24.6 c 3.8,2.5 8.8,1.4 11.3,-2.4 2.5,-3.8 1.4,-8.8 -2.4,-11.3 -3.8,-2.5 -8.8,-1.4 -11.3,2.3 -2.4,3.8 -1.3,8.9 2.4,11.4 z"
     id="path10" /><path
     class="st0"
     d="m 333,100.8 c 5.1,-2.6 7.1,-8.9 4.5,-14 -2.6,-5.1 -8.9,-7.1 -14,-4.5 -5.1,2.6 -7.1,8.8 -4.6,13.9 2.7,5.1 8.9,7.2 14.1,4.6 z"
     id="path13" /><path
     class="st0"
     d="m 186.5,20.8 c 5.7,0.3 10.6,-4.1 11,-9.8 0.4,-5.7 -4.1,-10.6 -9.8,-11 -5.7,-0.3 -10.6,4 -11,9.7 -0.3,5.8 4.1,10.7 9.8,11.1 z"
     id="path15" /><path
     class="st0"
     d="m 367.3,164.7 c -4.5,-0.3 -8.4,3.2 -8.6,7.7 -0.2,4.5 3.2,8.4 7.7,8.6 4.5,0.3 8.3,-3.2 8.6,-7.7 0.2,-4.5 -3.2,-8.3 -7.7,-8.6 z"
     id="path22" /><path
     class="st0"
     d="m 334.4,245.7 c -4.8,-3.1 -11.2,-1.8 -14.4,3 -3.1,4.8 -1.8,11.2 3,14.4 4.8,3.1 11.2,1.8 14.4,-3 3.2,-4.8 1.8,-11.3 -3,-14.4 z"
     id="path23" /><path
     class="st0"
     d="m 102.6,321.9 c -3.8,-2.5 -8.8,-1.4 -11.3,2.3 -2.5,3.8 -1.4,8.8 2.3,11.3 3.8,2.5 8.8,1.4 11.3,-2.3 0,0 0,0 0,0 2.6,-3.7 1.5,-8.8 -2.3,-11.3 z"
     id="path24" /><path
     class="st0"
     d="m 273.8,321.1 c -4,2 -5.6,7 -3.6,11 2,4 7,5.6 11,3.6 4,-2 5.6,-6.9 3.6,-10.9 -2,-4.1 -6.9,-5.8 -11,-3.7 0.1,0 0,0 0,0 z"
     id="path25" /><path
     class="st0"
     d="m 187.4,325.7 c -5.7,-0.3 -10.6,4.1 -11,9.8 -0.4,5.7 4.1,10.6 9.8,11 5.7,0.3 10.6,-4 11,-9.7 0.3,-5.8 -4.1,-10.7 -9.8,-11.1 z"
     id="path28" /></g><g
   id="r4"><path
     class="st0"
     d="m 91,134.9 c 6.9,4.5 16.1,2.6 20.5,-4.3 4.5,-6.9 2.6,-16.1 -4.3,-20.5 -6.9,-4.5 -16.1,-2.6 -20.5,4.3 -4.5,6.8 -2.6,16 4.3,20.5 z"
     id="path8" /><path
     class="st0"
     d="m 269,108.8 c -7.3,3.7 -10.3,12.6 -6.6,19.9 3.7,7.3 12.6,10.3 19.9,6.6 7.3,-3.7 10.3,-12.6 6.6,-19.9 -3.7,-7.3 -12.6,-10.2 -19.9,-6.6 z"
     id="path14" /><path
     class="st0"
     d="m 186.4,86.1 c 8.2,0.5 15.2,-5.8 15.6,-14 0.5,-8.2 -5.8,-15.2 -14,-15.6 -8.2,-0.5 -15.2,5.8 -15.6,14 -0.4,8.2 5.8,15.2 14,15.6 z"
     id="path16" /><path
     class="st0"
     d="m 106,237.7 c 7.3,-3.7 10.3,-12.6 6.6,-19.9 -3.7,-7.3 -12.6,-10.3 -19.9,-6.6 -7.3,3.7 -10.3,12.6 -6.6,19.9 3.7,7.3 12.6,10.3 19.9,6.6 z"
     id="path17" /><path
     class="st0"
     d="m 284,211.6 c -6.9,-4.5 -16.1,-2.6 -20.5,4.3 -4.5,6.9 -2.6,16.1 4.3,20.5 6.9,4.5 16.1,2.6 20.5,-4.3 4.5,-6.8 2.6,-16 -4.3,-20.5 z"
     id="path20" /><path
     class="st0"
     d="m 187.5,260.4 c -8.2,-0.5 -15.2,5.8 -15.6,14 -0.5,8.2 5.8,15.2 14,15.6 8.2,0.4 15.2,-5.8 15.6,-14 0.5,-8.1 -5.8,-15.2 -14,-15.6 z"
     id="path29" /></g><g
   id="r3"><path
     class="st0"
     d="m 126.8,70.1 c 6.2,-3.1 8.7,-10.7 5.6,-16.9 -3.1,-6.2 -10.7,-8.7 -16.9,-5.6 -6.2,3.1 -8.7,10.7 -5.6,16.9 3.1,6.2 10.7,8.7 16.9,5.6 z"
     id="path4" /><path
     class="st0"
     d="m 55.9,161 c -7,-0.4 -12.9,4.9 -13.3,11.9 -0.4,7 4.9,12.9 11.9,13.3 7,0.4 12.9,-4.9 13.3,-11.9 0,0 0,0 0,0 0.4,-6.9 -4.9,-12.9 -11.9,-13.3 z"
     id="path6" /><path
     class="st0"
     d="m 246.5,69.1 c 5.8,3.8 13.7,2.2 17.5,-3.6 3.8,-5.8 2.2,-13.7 -3.6,-17.5 -5.8,-3.8 -13.7,-2.2 -17.5,3.6 0,0 0,0 0,0 -3.9,5.9 -2.3,13.7 3.6,17.5 z"
     id="path9" /><path
     class="st0"
     d="m 332.4,173.7 c 0.4,-7 -4.9,-12.9 -11.9,-13.3 -7,-0.4 -12.9,4.9 -13.3,11.9 -0.4,7 4.9,12.9 11.9,13.3 0,0 0,0 0,0 6.9,0.4 12.9,-5 13.3,-11.9 z"
     id="path21" /><path
     class="st0"
     d="m 128.5,277.4 c -5.8,-3.8 -13.7,-2.2 -17.5,3.6 -3.8,5.8 -2.2,13.7 3.6,17.5 5.8,3.8 13.7,2.2 17.5,-3.6 0,0 0,0 0,0 3.9,-5.8 2.3,-13.7 -3.6,-17.5 z"
     id="path27" /><path
     class="st0"
     d="m 248.2,276.4 c -6.2,3.2 -8.7,10.8 -5.5,17 3.2,6.2 10.8,8.7 17,5.5 6.2,-3.1 8.7,-10.7 5.6,-16.9 -3.2,-6.2 -10.8,-8.8 -17.1,-5.6 z"
     id="path30" /></g>&#10;</svg>`

      const cardanoSvgData = loader.parse(cardanoSvg);
      
      if (!cardanoSvgData || !cardanoSvgData.xml || !cardanoSvgData.xml.children) { 
        console.log('returning');

        return 

      }
      const xmlHeading = `<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg
      version="1.1"
      viewBox="0 0 375 346.5"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:svg="http://www.w3.org/2000/svg">`
      
      
      
      if (!cardanoSvgData || !cardanoSvgData.xml || !cardanoSvgData.xml.children) return;
      const rings = [];
      rings.push(loader.parse(xmlHeading+cardanoSvgData.xml?.children['r1'].outerHTML+`</svg>`));
      rings.push(loader.parse(xmlHeading+cardanoSvgData.xml?.children['r2'].outerHTML+`</svg>`))
      rings.push(loader.parse(xmlHeading+cardanoSvgData.xml?.children['r3'].outerHTML+`</svg>`))
      rings.push(loader.parse(xmlHeading+cardanoSvgData.xml?.children['r4'].outerHTML+`</svg>`))
      
      const svgMaterial = new THREE.MeshBasicMaterial({ color: "#995900", depthTest: 0 });
      
      const cobj = [];
      rings.forEach((ritem, ringNo) => { 
        const cShapes = [];
        const cObjects=[];
        ritem.paths.forEach((path, i) => {
        
          const sh = path.toShapes(true);
          console.log(sh);
          sh.forEach((s) => { 
            cShapes.push(s);
          })
        });
        let reference = ringRef1;
        if (ringNo==1) reference=ringRef2
        else if (ringNo==2) reference=ringRef3
        else if (ringNo==3) reference=ringRef4

        cShapes.forEach((shape, i) => {
          const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 20,
            bevelEnabled: false
          });

          const mesh = new THREE.Mesh(geometry,svgMaterial);
          console.log(mesh);
          cObjects.push(<primitive object={mesh} scale={0.9} position={[-166,-150,-18]} >
          </primitive>)
        });
        
        cobj.push(
        <group position={[650, -400, -900]} rotation={[1*Math.PI,2*Math.PI,1*Math.PI]} ref={reference}>
          {cObjects}
        </group>)
      })
      console.log(cobj);
      setCardanoObjects(
        <group>
          {cobj}
        </group>
      )
    },[])

    const Framer = () => { 
      useFrame((state) => {
      if (ringRef1.current) { 
        
        ringRef1.current.rotation.z+=0.01
        ringRef2.current.rotation.z+=0.01
        ringRef3.current.rotation.z+=0.01
        ringRef4.current.rotation.z-=0.001
        
        var box = new THREE.Box3().setFromObject(ringRef4.current);
        const size = new THREE.Vector3();
        box.getSize(size);
        
      
        }
      });
      return (<></>)
    }
      // ...


    const points = [];
    for (var i = 0; i < 3000; i++)
        points.push(new THREE.Vector3(Math.random(), Math.random(), Math.random()));
    const bufferGeom = new THREE.BufferGeometry();
    bufferGeom.setFromPoints(points);
    const texture= new THREE.CanvasTexture()
    
    const material = new THREE.PointsMaterial({ size: 20, map: texture, blending: THREE.AdditiveBlending, depthTest: 0, transparent: 1 });
    const field = new THREE.Points(bufferGeom, material);
              //A = new T.Points(pg, mats[i]);


      
    const description = "A blockchain explorer for Cardano focused on rich media and Smart NFTs."
    const title = "Cardano Looking Glass - clg.wtf"
    return (
    <>
      <Head>
        <title>{title}</title>
        
        <meta name="description" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://clg.wtf/"} />
        <meta property="og:site_name" content="Cardano Looking Glass" />
        <meta property="og:title" content={title}  />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={"https://clg.wtf/favicon-default.png"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="clg.wtf" />
        <meta property="twitter:url" content={"https://clg.wtf/"} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={"https://clg.wtf/favicon-default.png"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{height:'100%', position:'relative'}}>
      <Canvas style={{position:'absolute'}} linear flat legacy dpr={1} camera={{ far: 2000,fov: 1000, position: [0, 0, 30] }}>
    <ambientLight intensity={4} color="#ffaa00" />
    
    <spotLight intensity={200} position={[0, 0,100]} penumbra={1} color="red" />
    
    <Framer />
    
    {cardanoObjects}

    <Swarm count={9000} color="#550201" />
    <Swarm count={20000} color="#291301" />
    <Swarm count={5000} color="#040302" />
    <Swarm count={10000} color="#040200" />
    <Postpro />
    <CardanoLogo />
 
      
  </Canvas>
      
    
    <Card style={{ cursor: 'pointer', top: '50%', transform:'translateY(-50%)', position:'relative', width:'fit-content', marginLeft:'auto', marginRight:'auto', padding:'1em', boxShadow:'2px 2px 15px 5px rgba(0,0,0,0.5)', border: '1px solid black'}}>
    <Typography variant="h4">
        <>
        <div style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
        
            <SearchBox /> 
            </div>
        </>
        </Typography>
    </Card>
    <div style={ {top: '50%', transform:'translateY(-50%)', position:'relative', width:'fit-content', marginLeft:'auto', marginRight:'auto', padding:'0em'}}>
    <Card style={{position:'absolute', minHeight:'30', width:'fit-content', transform:'translateX(-50%)', marginLeft:'auto', marginRight:'auto', padding:'1em', boxShadow:'2px 2px 15px 5px rgba(0,0,0,0.5)', border: '1px solid black'}}>
    
        <>
        <div style={{display: 'flex', flexDirection:'row', alignItems:'center'}}>
        <div style={{width:'80vw', height:'35vh'}}>
           <PolicyQuickBrowse style={{height:'35vh'}} policies={featuredPolicies} />
           </div>
            </div>
        </>
    
    </Card>
    </div>
    </div>
    </>)

    
        
}
function Postpro() {
    const water = useRef()
    const data = useLoader(LUTCubeLoader, '/cubicle.CUBE')
    useFrame((state) => (water.current.time = state.clock.elapsedTime * 4))
    return (
      <Effects disableGamma>
      
      <waterPass ref={water} factor={0.5} />
      <unrealBloomPass args={[undefined, 1.26, 1, 0]} />
      <filmPass args={[0.2, 0.9, 1300, false]} />
      <glitchPass />
      
      <lUTPass lut={data.texture} intensity={0.1} />
    </Effects>

    )
  }
  