import "../styles/globals.css";
import type { AppProps } from "next/app";
import "antd/dist/antd.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/grid";
import "swiper/css/autoplay"
import { store } from "redux-store/stores";
import { Provider } from "react-redux";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    // // scroll to top when reload
    setTimeout(() => {
      window.history.scrollRestoration = 'manual'
    },500)
  }, []);
  
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
