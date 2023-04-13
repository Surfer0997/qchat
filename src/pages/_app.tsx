import UseEffects from "@/components/helpers/UseEffects";
import {store} from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <UseEffects/>
      <ToastContainer/>
      <Component {...pageProps} />
    </Provider>
  );
}
