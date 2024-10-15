import "@/styles/globals.css";
import "../pages/login/login.css"
import "../pages/signIn/signIn.css"
import "../components/navBar/navBar.css"
import "../pages/search/search.css"
import Layout from "./layout/Layout";
import AuthContextProvider from "@/contexts/AuthContex";
import ScrapeContextProvider from "@/contexts/ScrapeContext";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => 
    <AuthContextProvider>
      <ScrapeContextProvider>
        <Layout>{page}</Layout>
      </ScrapeContextProvider>
    </AuthContextProvider>
  );
  
  return getLayout(
    <AuthContextProvider>
      <ScrapeContextProvider>
        <Component {...pageProps} />
      </ScrapeContextProvider>
    </AuthContextProvider>  
  )
}
