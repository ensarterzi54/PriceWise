import "@/styles/globals.css";
import Layout from "./layout/Layout";
import AuthContextProvider from "@/contexts/AuthContex";
import ScrapeContextProvider from "@/contexts/ScrapeContext";
import { SnackbarProvider } from 'notistack';
import ThemeContextProvider from "@/contexts/ThemeContext";
import FavoritesContextProvider from "@/contexts/FavoritesContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <AuthContextProvider>
        <ScrapeContextProvider>
          <FavoritesContextProvider>
            <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SnackbarProvider>
          </FavoritesContextProvider>
        </ScrapeContextProvider>
      </AuthContextProvider>
    </ThemeContextProvider>
  )
}
