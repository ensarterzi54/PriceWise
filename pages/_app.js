import "@/styles/globals.css";
import Layout from "./layout/Layout";
import AuthContextProvider from "@/contexts/AuthContex";
import ScrapeContextProvider from "@/contexts/ScrapeContext";
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => 
    <AuthContextProvider>
      <ScrapeContextProvider>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Layout>{page}</Layout>
        </SnackbarProvider>
      </ScrapeContextProvider>
    </AuthContextProvider>
  );
  
  return getLayout(
    <AuthContextProvider>
      <ScrapeContextProvider>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
          <Component {...pageProps} />
        </SnackbarProvider>
      </ScrapeContextProvider>
    </AuthContextProvider>  
  )
}
