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
 * @description Provides a mechanism for catching and handling JavaScript errors that
 * occur within its subtree, allowing for custom error fallbacks and providing detailed
 * error information to be logged.
 *
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  /**
   * @description Initializes an instance variable `hasError` to false in the component's
   * state. This is typically done when creating a custom error boundary component that
   * can catch and handle runtime errors within its child components.
   *
   * @param {object} props - Used to pass properties to components.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @description Returns an object that updates the component's state to indicate
   * whether an error has occurred. It takes an error as a parameter and sets the
   * `hasError` property to `true`. This allows the component to handle errors in child
   * components.
   *
   * @param {Error} error - Passed with an error that occurred in the component's render
   * method.
   *
   * @returns {object} An immutable object containing a single property named `hasError`,
   * with its value set to `true`.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * @description Catches and logs any unhandled errors that occur within its component
   * subtree. It captures error details and component stack information, then writes
   * them to the console for debugging purposes.
   *
   * @param {Error} error - Used to log the error that occurred during rendering.
   *
   * @param {object} info - Used to provide additional error information.
   */
  componentDidCatch(error, info) {
    console.error([error, info.componentStack]);
  }

  /**
   * @description Checks for an error state and renders custom fallback UI if present.
   * If no error is detected, it passes the rendering responsibility to its child
   * components by returning their content (`this.props.children`).
   *
   * @returns {ReactNode} Either this.props.fallback if an error occurred or else this.props.children.
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
 * @description Initializes a React component with loading state management, socket
 * connection, and analytics tracking. It uses React Hooks to manage state and side
 * effects. The function returns a component tree with loading indicators, error
 * handling, and page transitions.
 *
 * @param {object} obj - Likely used to pass down props from the parent component.
 * The keys are `Component` and `pageProps`, indicating that this function is intended
 * for rendering dynamic content with props.
 *
 * @param {React.ComponentClass} obj.Component - Expected to be rendered as the main
 * content of the page.
 *
 * @param {object} obj.pageProps - Passed from the parent component.
 *
 * @returns {JSX.Element} A tree-like data structure that represents the UI components
 * to be rendered by React.
 */
function CIP54Playground({ Component, pageProps }) {
  
  const router = useRouter();
  
  const [loadingState, setLoadingState] = useState(true);
  /**
   * @description Closes a loading state by setting its value to false using the
   * `setLoadingState` method, effectively terminating any ongoing loading operation.
   */
  const handleLoadingClose = () => { 
    setLoadingState(false);
  }
  /**
   * @description Initializes a WebSocket connection to a server using the Socket.IO
   * library. It first retrieves data from the '/socket' endpoint, then establishes a
   * connection and sets up event listeners for 'connect' and 'block' events.
   */
  const socketInitializer = () => {
    /**
     * @description Initializes a WebSocket connection with the server, establishes event
     * listeners for 'connect' and 'block' events, and logs the connected status and data
     * received from the server to the console.
     */
    const asy = async () => { 
      await getData('/socket');
      socket = io(process.env.NODE_ENV=='production'?'/':'http://localhost:'+process.env.SOCKET_PORT+'/',{ transports: ["websocket","polling"]})
      socket.on('connect', () => {
        // Listens for connection events.

        const engine = socket.io.engine;
  
        console.log('connected')
      })
  
      socket.on('block',(data)=>{
        // Listens for 'block' event on WebSocket socket and logs its data to the console.

        console.log(data);
        //alert(data);
      })
    }
    asy();
  }
  

  /**
   * @description Adds an event listener to the window object for messages with specific
   * requests ('showLoading' and 'hideLoading'). It logs these messages to the console
   * and removes the event listener when not needed.
   *
   * @returns {() => void} A function that removes an event listener when called.
   */
  const loadingListener = ()=>{
    /**
     * @description Filters out event data with requests 'showLoading' or 'hideLoading',
     * and if not, logs the event to the console.
     *
     * @param {Event} eve - Used to handle events.
     */
    const messageHandler = (eve) => { 
      if (eve.data?.request!=='showLoading' && eve.data?.request!=='hideLoading') { 
        return;
      }
      console.log(eve);

    }
    window.addEventListener("message", messageHandler);
    return ()=>{
      window.removeEventListener("message",messageHandler);
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
  <CircularProgress color="inherit" />
  
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
