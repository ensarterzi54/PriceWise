import "@/styles/globals.css";
import Layout from "./layout/Layout";
import AuthContextProvider from "@/contexts/AuthContex";
import ScrapeContextProvider from "@/contexts/ScrapeContext";
import { SnackbarProvider } from 'notistack';
import ThemeContextProvider from "@/contexts/ThemeContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => 
    <ThemeContextProvider>
      <AuthContextProvider>
        <ScrapeContextProvider>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Layout>
              {page}
            </Layout>
          </SnackbarProvider>
        </ScrapeContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  );
  
  return getLayout(
    <ThemeContextProvider>
      <AuthContextProvider>
        <ScrapeContextProvider>
          <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Component {...pageProps} />
          </SnackbarProvider>
        </ScrapeContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>  
  )
}
