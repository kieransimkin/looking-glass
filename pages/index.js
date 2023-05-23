import Head from 'next/head'
import WalletContext from '../components/WalletContext'
import { CircularProgress, Typography } from '@material-ui/core';
import { makeStyles, StylesContext } from "@material-ui/core/styles";
import { alpha } from '@material-ui/core/styles/colorManipulator';
import PauseIcon from '@material-ui/icons/Pause';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import { useState , useEffect, useRef } from "react";
import PictureCard from '../components/PictureCard'
import Card from '@material-ui/core/Card'

const useStyles = makeStyles(theme => { 
    const first = alpha(theme.palette.primary.main, 0.8);
    const second = alpha(theme.palette.secondary.main, 0.4);
    const darkfirst = alpha(theme.palette.primary.main, 0.2);
    const darksecond = alpha(theme.palette.secondary.main, 0.2);
    let bg=`linear-gradient(125deg, ${first} 0%, ${second} 100%),linear-gradient(0deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.9) 100%),url('/flowers.jpg') !important`;
    if (theme.palette.type=='dark') { 
        bg = `linear-gradient(120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url('/flowers.jpg') !important`;
    }
    let bg2=`linear-gradient(-95deg, ${first} 0%, ${second} 100%),linear-gradient(120deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.3) 100%),url('/circuit2.png') !important`;
    if (theme.palette.type=='dark') { 
        bg2 = `linear-gradient(-120deg, ${darkfirst} 0%, ${darksecond} 100%), linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.9) 100%), url('/circuit2.png') !important`;
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
        fontSize: '150px',
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
        fontSize: '110px',
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

export default function Home() {
    const classes=useStyles();
    const [autoPlay, setAutoplay] = useState(false);
    const [loadingContent, setLoadingContent] = useState((<><CircularProgress size="1em" style={{position: 'relative', top:'0.15em', marginRight: '0.3em', marginLeft:'0.2em'}} /> Loading slideshow&hellip;</>));
    const [currentSlide, setCurrentSlide] = useState(0);
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
    <div>
      <Head>
        <title>Smart NFT Playground</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="fullscreen"> <Carousel 
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
        autoFocus={true} 
        showThumbs={false} 
        showStatus={false} 
        useKeyboardArrows 
        autoPlay={autoPlay} 
        stopOnHover={false} 
        infiniteLoop={true} 
        interval={7000} 
        className="presentation-mode"
        >
        <div key="content-1" className="my-slide content" onClick={toggleOnOff}>
            <div className={classes.bgImageCont}>
                <Image onLoad={onLoad} className={classes.bgImage} alt="Cave Paintings" src="/cubebackground.jpg" layout='fill'  />
            </div>
            <div className={classes.content + ' slide-content'}>
                <div style={{display:'flex',flexDirection:'column', minHeight:'60vh', justifyContent: 'space-between'}}>
                    <div>
                        <Typography variant="h1" classes={{root: classes.bigHead}}> What is art?</Typography>
                    </div> 
                    <div style={{textAlign: 'right'}}>
                        <Typography variant="h2" classes={{root: classes.littleHead}}>A question, perhaps as old as art itself</Typography>
                    </div>
                </div>
            </div>
            
        </div>
        <div key="content-2" className="my-slide content" onClick={toggleOnOff}>
            <div className={classes.bgImageCont}>
                <Image className={classes.bgImage} alt="Grafitti" src="/grafitti.jpg" width={4244} height={2653}  />
            </div>
            <div className={classes.content + ' slide-content'}>
                <Typography variant="h1" classes={{root: classes.bigHead}}>A most basic message</Typography><br />&nbsp;<br />
                <div style={{textAlign: 'right'}}>
                    <Typography variant="h2" classes={{root: classes.littleHead}}>&ldquo;This is me&rdquo;</Typography>
                    <Typography variant="h2" classes={{root: classes.littleHead}}>&ldquo;I was here&rdquo;</Typography>
                    <Typography variant="h2" classes={{root: classes.littleHead}}>&ldquo;This meant something&rdquo;</Typography>
                    <Typography variant="h2" classes={{root: classes.littleHead}}>&ldquo;Remember me&rdquo;</Typography>
                </div>
            </div>
        </div>
       
    </Carousel>
    <div className="bottom-button" style={{position:'fixed', bottom:'3em', width:'100%', textAlign:'center', transition: `opacity 0.8s ease`, opacity: autoPlay ? 0 : 1 }}> 
    <Card style={{cursor: 'pointer', width:'fit-content', marginLeft:'auto', marginRight:'auto', padding:'1em', boxShadow:'2px 2px 15px 5px rgba(0,0,0,0.5)', border: '1px solid black'}} onClick={toggleOnOff}>
    <Typography variant="h4">
        {loadingContent}
        </Typography>
    </Card>
    </div>
      </main>
    </div>
  )
}
