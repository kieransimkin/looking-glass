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

/**
 * @description Encapsulates error handling logic for React components, allowing a
 * custom fallback UI to be rendered when an error occurs within its subtree, while
 * also providing debugging information about the error and its context.
 *
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  /**
   * @description Initializes an instance of the class with an initial state that tracks
   * whether an error has occurred. It sets the default state to `hasError: false`.
   * This ensures that the component begins in a clean state, ready to handle potential
   * errors during its lifespan.
   *
   * @param {object} props - Used to pass data from parent component.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @description Returns an object with a single property, `hasError`, set to `true`.
   * This indicates that an error has occurred within the React component tree managed
   * by this boundary.
   *
   * @param {Error} error - Required to handle an error occurred during rendering.
   *
   * @returns {object} An associative array with a single key-value pair where the key
   * is "hasError" and the value is a boolean set to true.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * @description Catches and logs errors that occur within its child components. When
   * an error occurs, it is passed along with a component stack to the console for
   * debugging purposes.
   *
   * @param {Error} error - Used to catch error objects.
   *
   * @param {InfoLike} info - Used to provide context about the error.
   */
  componentDidCatch(error, info) {
    console.error([error, info.componentStack]);
  }

  /**
   * @description Checks if an error has occurred during rendering and, if so, returns
   * a fallback component provided by the parent component via `this.props.fallback`.
   * If no error has occurred, it simply renders the child components passed as `this.props.children`.
   *
   * @returns {ReactNode} Either `this.props.fallback` if `hasError` is true (not shown)
   * or `this.props.children`.
   */
  render() {
    //if (this.state.hasError) {
      // You can render any custom fallback UI
     // return this.props.fallback;
   // }
    return this.props.children;
  }
}

const TIMEOUT = 400;
/**
 * @description Wraps a React component with loading and error handling mechanisms,
 * using the Next.js `useRouter` hook to listen for route changes and update the
 * loading state accordingly. It also initializes a socket connection and listens for
 * events.
 *
 * @param {object} obj - Composed of two properties: `Component`, which represents
 * the React component to be rendered, and `pageProps`, which contains the props for
 * that component.
 *
 * @param {React.Component} obj.Component - Intended to be used as a wrapped component.
 *
 * @param {object} obj.pageProps - Passed from the parent component.
 *
 * @returns {JSX.Element} A React component that represents a functional component
 * and renders a set of elements including a layout, a circular progress bar, an error
 * boundary, and a page transition component.
 */
function CIP54Playground({ Component, pageProps }) {
  
  const router = useRouter();
  
  const [loadingState, setLoadingState] = useState(false);
  /**
   * @description Closes a loading state by setting the `loadingState` to `false`.
   */
  const handleLoadingClose = () => { 
    setLoadingState(false);
  }
  /**
   * @description Initializes a WebSocket connection using Socket.IO, establishing
   * communication between the client and server. It fetches data from the `/socket`
   * endpoint, sets up event listeners for 'connect', 'block', and 'newThumb' events,
   * and dispatches messages to the browser using postMessage API.
   */
  const socketInitializer = () => {
    /**
     * @description Establishes a connection to a WebSocket server and listens for three
     * events: 'connect', 'block', and 'newThumb'. Upon connection, it logs a success
     * message to the console. It also handles incoming data from these events by logging
     * it or broadcasting it as a postMessage event.
     */
    const asy = async () => { 
      await getData('/socket');
      socket = io(process.env.NODE_ENV=='production'?'/':'http://localhost:'+process.env.SOCKET_PORT+'/',{ transports: ["websocket","polling"]})
      socket.on('connect', () => {
        // Triggers when a client connects to a server over WebSocket protocol.

        const engine = socket.io.engine;
  
        console.log('connected')
      })
  
      socket.on('block',(data)=>{
        // Listens for event 'block'.

        console.log(data);
        //alert(data);
      })
      socket.on('newThumb',(data) => { 
        // Posts a message.

        window.postMessage({request:'newThumb',...data},'*');
        
      })
    }
    asy();
  }
  

  /**
   * @description Monitors route changes and sets a loading state accordingly. When a
   * new route starts, it logs the URL and sets the loading state to true if not
   * navigating to an anchor (#) link; when the route is complete, it sets the loading
   * state to false.
   *
   * @returns {() => void} An anonymous arrow function that unsubscribes from router
   * events when invoked.
   */
  const loadingListener = ()=>{
  

    /**
     * @description Sets the loading state to false when called with a URL as an argument,
     * indicating that the loading process has completed for the given URL.
     *
     * @param {string} url - Used to complete an operation.
     */
    const finish = (url) => { 
      setLoadingState(false);
    }
    /**
     * @description Logs its URL parameter and sets a loading state based on whether the
     * URL ends with '#'. If it does not, the loading state is set to true; otherwise,
     * it remains unchanged.
     *
     * @param {string} url - Necessary for the function to operate.
     */
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
