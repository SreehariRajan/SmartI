import NavBar from '../components/navbar'
import Notification from '../components/notification'
import { ContextProvider } from '../context/Context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div className={"container"}>
      <ContextProvider>
        <NavBar />
        <Component {...pageProps} />
        <Notification />
      </ContextProvider>
    </div>)
}

export default MyApp
