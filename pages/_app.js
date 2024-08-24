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
 * @description Catches and handles errors that occur within its child components,
 * allowing for a custom fallback UI to be rendered instead of crashing the entire application.
 *
 * @extends {React.Component}
 */
class ErrorBoundary extends React.Component {
  /**
   * @description Initializes an object with a state property `hasError` set to `false`.
   * This indicates that no error has occurred. It then calls the superclass (React
   * Component) constructor using `super(props)` and sets its own state to `{ hasError:
   * false }`.
   *
   * @param {object} props - Used to pass properties from the parent component.
   */
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @description Returns a new state object with the `hasError` property set to `true`
   * when an error occurs during rendering. This indicates that there was an error and
   * allows the component to handle it accordingly.
   *
   * @param {Error} error - Used to detect and handle errors.
   *
   * @returns {object} Assigned to the state property 'hasError' with a boolean value
   * set to true.
   */
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  /**
   * @description Catches and logs any unhandled errors that occur during the rendering
   * process of its child components.
   *
   * @param {Error} error - Used to capture error objects.
   *
   * @param {ReactErrorInfo} info - Used to contain information about the caught error.
   */
  componentDidCatch(error, info) {
    console.error([error, info.componentStack]);
  }

  /**
   * @description Overrides React's default rendering behavior and returns either the
   * error fallback or the wrapped children components depending on whether an error
   * has occurred.
   *
   * @returns {ReactNode} Determined by either `this.props.children` or a custom fallback
   * UI if `this.state.hasError` is truthy.
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
 * @description Initializes a React component, sets up socket communication, and
 * handles loading state transitions with animation effects. It also includes error
 * handling and Google Analytics tracking for page views.
 *
 * @param {object} obj - Composed of two properties: "Component" and "pageProps". The
 * "Component" property represents the React component, while the "pageProps" property
 * is an object containing props for that component.
 *
 * @param {React.ComponentType<any>} obj.Component - Required for rendering the component.
 *
 * @param {object} obj.pageProps - Passed to the wrapped component.
 *
 * @returns {JSX.Element} A React component.
 */
function CIP54Playground({ Component, pageProps }) {
  
  const router = useRouter();
  
  const [loadingState, setLoadingState] = useState(false);
  /**
   * @description Sets the `setLoadingState` variable to `false`, indicating that a
   * loading state has been closed. This implies that some previously initiated loading
   * operation has completed, and the application is now ready for further user interaction.
   */
  const handleLoadingClose = () => { 
    setLoadingState(false);
  }
  /**
   * @description Initializes a WebSocket connection with a server and listens for
   * connections, blocks, and other events. It calls an asynchronous function to retrieve
   * data from a URL before establishing the connection.
   */
  const socketInitializer = () => {
    /**
     * @description Establishes a WebSocket connection to a server using Socket.IO,
     * allowing for real-time communication. It first fetches data from `/socket`, then
     * connects to the specified URL or localhost port, and listens for 'connect' and
     * 'block' events.
     */
    const asy = async () => { 
      await getData('/socket');
      socket = io(process.env.NODE_ENV=='production'?'/':'http://localhost:'+process.env.SOCKET_PORT+'/',{ transports: ["websocket","polling"]})
      socket.on('connect', () => {
        // Listens for successful connection events on a WebSocket socket and logs a message
        // to the console when connected.

        const engine = socket.io.engine;
  
        console.log('connected')
      })
  
      socket.on('block',(data)=>{
        // Listens for events.

        console.log(data);
        //alert(data);
      })
    }
    asy();
  }
  

  /**
   * @description Adds an event listener for `window` messages. It logs any received
   * messages with requests 'showLoading' or 'hideLoading'. Upon removal, it removes
   * the event listener.
   *
   * @returns {() => void} A function that removes an event listener from the "message"
   * event on the window object when called.
   */
  const loadingListener = ()=>{
    /**
     * @description Handles events by checking if the event's data has a request property
     * that is either 'showLoading' or 'hideLoading'. If not, it does nothing; otherwise,
     * it logs the event to the console.
     *
     * @param {Event} eve - Received by the event listener.
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
