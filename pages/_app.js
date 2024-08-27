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
 * @description Catches and handles runtime errors that occur within its child
 * components, allowing the application to recover from errors and prevent them from
 * propagating further up the component tree.
 *
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  /**
   * @description Initializes its state with an object having one property: `hasError`,
   * set to `false`. This allows the component to track whether it has encountered any
   * errors during rendering.
   *
   * @param {object} props - Used to receive properties passed from parent components.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @description Returns an object with the property `hasError` set to `true`, indicating
   * that a child component has thrown an error. This allows the ErrorBoundary to handle
   * and render error messages when a child component encounters an error.
   *
   * @param {Error} error - Used to report an error that occurred during rendering.
   *
   * @returns {object} Initialized with a property named `hasError` set to `true`.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * @description Captures any error that occurs during rendering and logs it to the
   * console with a corresponding component stack for debugging purposes.
   *
   * @param {Error} error - Used to log or handle an error that has occurred during rendering.
   *
   * @param {errorInfo} info - Used to display component stack trace for error.
   */
  componentDidCatch(error, info) {
    console.error([error, info.componentStack]);
  }

  /**
   * @description Returns its children if they are present and renderable. If an error
   * has occurred (indicated by `this.state.hasError`), it falls back to rendering a
   * custom fallback UI specified by `this.props.fallback`.
   *
   * @returns {ReactNode} Either the fallback content provided by the props if an error
   * occurred, or the children component/content passed as a prop.
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
 * @description Initializes a socket connection and handles route changes, displaying
 * a loading indicator during page transitions. It also sets up Google Analytics
 * tracking and uses an error boundary for error handling.
 *
 * @param {object} obj - Destructured into two properties: `Component` and `pageProps`.
 * The `Component` property represents a React component, while the `pageProps`
 * property represents an object containing page-specific props.
 *
 * @param {React.ComponentType<React.ReactNode>} obj.Component - Required for rendering
 * React components.
 *
 * @param {object} obj.pageProps - Used to pass props to the component being rendered.
 *
 * @returns {ReactNode} A JSX element composed of several components including
 * `Backdrop`, `CircularProgress`, `Layout`, `PageTransition`, and `Component`.
 */
function CIP54Playground({ Component, pageProps }) {
  
  const router = useRouter();
  
  const [loadingState, setLoadingState] = useState(false);
  /**
   * @description Closes a loading state by setting the `setLoadingState` variable to
   * `false`, indicating that the loading process is complete and no longer active.
   */
  const handleLoadingClose = () => { 
    setLoadingState(false);
  }
  /**
   * @description Initializes a WebSocket connection using the Socket.IO library. It
   * retrieves data from an API endpoint, establishes a WebSocket connection with a
   * server, and handles two types of events: 'connect' and 'block'.
   */
  const socketInitializer = () => {
    /**
     * @description Establishes a connection to a WebSocket server using Socket.IO. It
     * retrieves data from an initial API call and then initializes a WebSocket connection
     * with specified transports. When connected, it logs a message and listens for 'block'
     * events to log or alert the received data.
     */
    const asy = async () => { 
      await getData('/socket');
      socket = io(process.env.NODE_ENV=='production'?'/':'http://localhost:'+process.env.SOCKET_PORT+'/',{ transports: ["websocket","polling"]})
      socket.on('connect', () => {
        // Responds to a 'connect' event.

        const engine = socket.io.engine;
  
        console.log('connected')
      })
  
      socket.on('block',(data)=>{
        // Listens for 'block' event on a WebSocket socket and logs its data.

        console.log(data);
        //alert(data);
      })
    }
    asy();
  }
  

  /**
   * @description Listens to route change events on a router instance and toggles a
   * loading state based on the event type. When a route changes, it sets the loading
   * state to true for 'routeChangeStart' and false for 'routeChangeComplete'. It also
   * logs some messages in the console.
   *
   * @returns {() => void} An immediately invoked function expression (IIFE) that
   * unregisters the event listeners for 'routeChangeComplete' and 'routeChangeStart'
   * events from the router.
   */
  const loadingListener = ()=>{
  

    /**
     * @description Disables a loading state when called with a URL as an argument,
     * indicating that the operation has completed successfully and no longer requires
     * the loading indicator to be displayed.
     *
     * @param {string} url - Not used within the function.
     */
    const finish = (url) => { 
      setLoadingState(false);
    }
    /**
     * @description Logs a URL and checks if it ends with '#'. If not, it sets a loading
     * state to true; otherwise, it logs 'Not showing loading' without setting the loading
     * state.
     *
     * @param {string} url - Used as input.
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
