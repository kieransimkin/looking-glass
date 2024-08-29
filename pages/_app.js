import '../styles/globals.css'
import Layout from '../components/Layout'
import React from "react";
import { useRouter } from 'next/router';
import App from "next/app";
import { PageTransition } from "next-page-transitions";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Backdrop } from '@material-ui/core';
import { GoogleAnalytics } from "nextjs-google-analytics";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
let socket;
import { getData } from '../utils/Api';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error([error, info.componentStack]);
  }

  render() {
    //if (this.state.hasError) {
      // You can render any custom fallback UI
     // return this.props.fallback;
   // }
    return this.props.children;
  }
}

const TIMEOUT = 400;
function CIP54Playground({ Component, pageProps }) {
  
  const router = useRouter();
  
  const [loadingState, setLoadingState] = useState(false);
  const handleLoadingClose = () => { 
    setLoadingState(false);
  }
  const socketInitializer = () => {
    const asy = async () => { 
      await getData('/socket');
      socket = io(process.env.NODE_ENV=='production'?'/':'http://localhost:'+process.env.SOCKET_PORT+'/',{ transports: ["websocket","polling"]})
      socket.on('connect', () => {
        const engine = socket.io.engine;
  
        console.log('connected')
      })
      // probably be best if we only subscribed to the ones we neded
      socket.on('block',(data)=>{
        console.log(data);
        //alert(data);
      })
      socket.on('newThumb',(data) => { 
        window.postMessage({request:'newThumb',...data},'*');
      })
      socket.on('newAdaHandle',(data) => { 
        console.log(data);
        window.postMessage({request:'newAdaHandle',...data},'*');
      })
      socket.on('newOwnerList',(data) => { 
        window.postMessage({request:'newTokenHolders',...data},'*');
      });
    }
    asy();
  }
  

  const loadingListener = ()=>{
  

    const finish = (url) => { 
      setLoadingState(false);
    }
    const start = (url) => { 
      console.log(url);
      if (url.slice(-1)!='#') { 
        setLoadingState(true);
      } else {
        console.log('Not showing loading');
      }
    }
    router.events.on('routeChangeComplete', finish);
    router.events.on('routeChangeStart', start);

    return ()=>{
      router.events.off('routeChangeComplete', finish);
      router.events.off('routeChangeStart',start);
    }
  }
  useEffect(socketInitializer, []);
  useEffect(loadingListener, []);
  //console.log("%c Ignore cardano serialization lib errors, it likes to throw them. ","background: lightgreen; color: black;")
  return (
    <>
    
      <GoogleAnalytics trackPageViews />
      <ErrorBoundary>
      <Backdrop open={loadingState} onClick={handleLoadingClose}>
  <CircularProgress color="primary" size="25%" />
  
</Backdrop>
        <Layout>
          

          <PageTransition
            timeout={TIMEOUT}
            classNames="page-transition"
            loadingComponent={<CircularProgress />}
            loadingDelay={500}
            loadingTimeout={{
              enter: TIMEOUT,
              exit: 0
            }}
            style={{height:'100vh'}}
            loadingClassNames="loading-indicator"
          >
            <Component key={router.route} {...pageProps} />
          </PageTransition>
        </Layout>
      </ErrorBoundary>

        <style>{`
          .page-transition-enter {
            opacity: 0;
            height: 100vh;
            
          }
          .page-transition-enter-active {
            opacity: 1;
            height: 100vh;
            transition: opacity ${TIMEOUT}ms, transform ${TIMEOUT}ms;
          }
          .page-transition-enter-done { 
            height: 100vh;
          }
          .page-transition-exit {
            opacity: 1;
            height: 100vh;
          }
          .page-transition-exit-active {
            opacity: 0;
            transition: opacity ${TIMEOUT}ms;
            height: 100vh;
          }
          .loading-indicator-appear,
          .loading-indicator-enter {
            opacity: 0;
          }
          .loading-indicator-appear-active,
          .loading-indicator-enter-active {
            opacity: 1;
            transition: opacity ${TIMEOUT}ms;
          }
        `}</style>
      </>
    );
}
export default CIP54Playground;
