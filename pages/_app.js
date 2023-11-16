import '../styles/globals.css'
import Layout from '../components/Layout'
import React from "react";
import { useRouter } from 'next/router';
import App from "next/app";
import { PageTransition } from "next-page-transitions";
import CircularProgress from '@material-ui/core/CircularProgress';
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
  useEffect(() => socketInitializer(), [])

  const socketInitializer = async () => {
    await getData('/socket');
    socket = io('/',{path: '/api/socket', transports: ["websocket","polling"]})
    socket.on('connect', () => {
      const engine = socket.io.engine;

      console.log('connected')
    })

    socket.on('block',(data)=>{
      console.log(data);
      //alert(data);
    })
    

  
  }
  //console.log("%c Ignore cardano serialization lib errors, it likes to throw them. ","background: lightgreen; color: black;")
  return (
    <>
      <GoogleAnalytics trackPageViews />
      <ErrorBoundary>
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
