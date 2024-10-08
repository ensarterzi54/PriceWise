import "@/styles/globals.css";
import "../pages/login/login.css"
import "../pages/signIn/signIn.css"
import Layout from "./layout/Layout";
import AuthContextProvider from "@/contexts/AuthContex";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => 
    <AuthContextProvider>
      <Layout>{page}</Layout>
    </AuthContextProvider>
  );
  
  return getLayout(
    <AuthContextProvider>
      <Component {...pageProps} />
    </AuthContextProvider>  
  )
}
